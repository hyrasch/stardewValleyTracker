"""Extract acquisition data for the mod items referenced by the active CCCB bundle pack.

Usage: python -I extract_mod_data.py <Mods folder> <output.json>
Reads Content Patcher / FTM JSON files (tolerant of comments, trailing commas,
leading-dot numbers and unquoted numeric keys).
"""
import sys, os, re, json

MODS = sys.argv[1]
OUT = sys.argv[2]


def strip_json(text):
    out = []
    i = 0
    n = len(text)
    in_str = False
    while i < n:
        c = text[i]
        if in_str:
            out.append(c)
            if c == '\\' and i + 1 < n:
                out.append(text[i + 1])
                i += 2
                continue
            if c == '"':
                in_str = False
            i += 1
            continue
        if c == '"':
            in_str = True
            out.append(c)
            i += 1
            continue
        if c == '/' and i + 1 < n and text[i + 1] == '/':
            while i < n and text[i] != '\n':
                i += 1
            continue
        if c == '/' and i + 1 < n and text[i + 1] == '*':
            i += 2
            while i + 1 < n and not (text[i] == '*' and text[i + 1] == '/'):
                i += 1
            i += 2
            continue
        out.append(c)
        i += 1
    s = ''.join(out)
    # The replacements below only touch text outside strings because strings were
    # copied verbatim above; re-scan to apply them safely.
    res = []
    in_str = False
    i = 0
    n = len(s)
    while i < n:
        c = s[i]
        if in_str:
            res.append(c)
            if c == '\\' and i + 1 < n:
                res.append(s[i + 1])
                i += 2
                continue
            if c == '"':
                in_str = False
            i += 1
            continue
        if c == '"':
            in_str = True
            res.append(c)
            i += 1
            continue
        # leading-dot number: ".03" -> "0.03"
        if c == '.' and i + 1 < n and s[i + 1].isdigit() and (i == 0 or not (s[i - 1].isdigit() or s[i - 1].isalpha())):
            res.append('0.')
            i += 1
            continue
        # unquoted numeric key: "0:" -> "\"0\":"
        if c.isdigit() and (i == 0 or s[i - 1] in ' \t\n{,'):
            j = i
            while j < n and s[j].isdigit():
                j += 1
            k = j
            while k < n and s[k] in ' \t':
                k += 1
            if k < n and s[k] == ':':
                res.append('"' + s[i:j] + '"')
                i = j
                continue
        res.append(c)
        i += 1
    s = ''.join(res)
    s = re.sub(r',(\s*[}\]])', r'\1', s)
    return s


def load(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        return json.loads(strip_json(f.read()), strict=False)


def walk_json_files(root):
    for dp, dn, fn in os.walk(root, followlinks=True):
        for f in fn:
            if f.lower().endswith('.json'):
                yield os.path.join(dp, f)


# ---------- bundle pack ----------
pack = load(os.path.join(MODS, '[CCCB] Custom Cornucopia RSV SVE Bundles', 'content.json'))
bundles = pack['Custom_Cornucopia_RSV_SVE']
item_ids = set()
for key, raw in bundles.items():
    parts = raw.split('/')
    items = parts[2].split()
    for i in range(0, len(items), 3):
        item_ids.add(items[i])
mod_ids = sorted(i for i in item_ids if not i.lstrip('-').isdigit())
print('mod/string ids:', len(mod_ids), file=sys.stderr)

# ---------- scan all CP files from the relevant mods ----------
ROOTS = [os.path.join(MODS, d) for d in [
    'Stardew Valley Expanded', 'Ridgeside Village',
    '[CP] Cornucopia More Crops', '[CP] Cornucopia More Flowers', '[CP] Cornucopia Artisan Machines',
]]
i18n = {}
for r in ROOTS:
    for p in walk_json_files(r):
        if os.path.basename(p) == 'default.json' and os.path.basename(os.path.dirname(p)) == 'i18n':
            try:
                i18n.update(load(p))
            except Exception as e:
                print('i18n fail', p, e, file=sys.stderr)


def i18n_resolve(s):
    if not isinstance(s, str):
        return s
    m = re.match(r'\{\{i18n:([^}|]+)', s)
    if m:
        return i18n.get(m.group(1).strip(), s)
    return s


def norm(idv):
    if not isinstance(idv, str):
        return idv
    return re.sub(r'^\((O|BC|F|R|H|W|B|T|C)\)', '', idv)


objects, fish, crops, fruittrees, recipes, machines, shops, monsters = {}, {}, {}, {}, {}, {}, {}, {}
loc_fish, loc_forage, ftm = [], [], []
changes_seen = 0
failed = []


def add_location_entries(entries, rel, when):
    for k, v in entries.items():
        if isinstance(v, dict):
            for f in v.get('Fish', []) or []:
                if isinstance(f, dict):
                    loc_fish.append(dict(f, _loc=k, _file=rel, _when=when))
            for f in v.get('Forage', []) or []:
                if isinstance(f, dict):
                    loc_forage.append(dict(f, _loc=k, _file=rel, _when=when))


for r in ROOTS:
    for p in walk_json_files(r):
        rel = os.path.relpath(p, MODS)
        try:
            data = load(p)
        except Exception as e:
            failed.append((rel, str(e)[:80]))
            continue
        if not isinstance(data, dict):
            continue
        chs = data.get('Changes')
        if isinstance(chs, list):
            for ch in chs:
                if not isinstance(ch, dict):
                    continue
                tgt = ch.get('Target', '')
                ent = ch.get('Entries')
                fields = ch.get('Fields')
                tf = ch.get('TargetField')
                when = ch.get('When')
                if not isinstance(ent, dict) and not isinstance(fields, dict):
                    continue
                changes_seen += 1
                if tgt == 'Data/Objects' and ent:
                    for k, v in ent.items():
                        if isinstance(v, dict):
                            objects[k] = dict(v, _file=rel)
                elif tgt == 'Data/Fish' and ent:
                    for k, v in ent.items():
                        fish.setdefault(k, []).append({'raw': v, '_file': rel, '_when': when})
                elif tgt == 'Data/Crops' and ent:
                    for k, v in ent.items():
                        if isinstance(v, dict):
                            crops[k] = dict(v, _file=rel)
                elif tgt == 'Data/FruitTrees' and ent:
                    for k, v in ent.items():
                        if isinstance(v, dict):
                            fruittrees[k] = dict(v, _file=rel)
                elif tgt == 'Data/CookingRecipes' and ent:
                    for k, v in ent.items():
                        recipes[k] = {'raw': v, '_file': rel, '_when': when}
                elif tgt == 'Data/Monsters' and ent:
                    for k, v in ent.items():
                        monsters[k] = {'raw': v, '_file': rel}
                elif tgt == 'Data/Machines':
                    if tf and ent:
                        machines.setdefault(tf[0], []).append({'OutputRules': list(ent.values()), '_file': rel})
                    elif ent:
                        for k, v in ent.items():
                            if isinstance(v, dict):
                                machines.setdefault(k, []).append(dict(v, _file=rel))
                elif tgt == 'Data/Shops':
                    if tf and ent:
                        for k, v in ent.items():
                            if isinstance(v, dict):
                                shops.setdefault(tf[0], []).append(dict(v, _file=rel, _when=when))
                    elif ent:
                        for k, v in ent.items():
                            if isinstance(v, dict):
                                for it in v.get('Items', []) or []:
                                    if isinstance(it, dict):
                                        shops.setdefault(k, []).append(dict(it, _file=rel, _when=when))
                elif tgt == 'Data/Locations':
                    if tf and ent:
                        loc = tf[0]
                        field = tf[1] if len(tf) > 1 else None
                        for k, v in ent.items():
                            if isinstance(v, dict):
                                if field == 'Fish':
                                    loc_fish.append(dict(v, _loc=loc, _file=rel, _when=when))
                                elif field == 'Forage':
                                    loc_forage.append(dict(v, _loc=loc, _file=rel, _when=when))
                    else:
                        if ent:
                            add_location_entries(ent, rel, when)
                        if fields:
                            add_location_entries(fields, rel, when)
        # FTM packs
        fs = data.get('Forage_Spawn_Settings') or data.get('ForageSpawnSettings')
        if isinstance(fs, dict):
            for area in fs.get('Areas', []) or []:
                if not isinstance(area, dict):
                    continue
                for seas in ['Spring', 'Summer', 'Fall', 'Winter']:
                    lst = area.get(seas + 'ItemIndex') or []
                    names = []
                    for it in lst:
                        if isinstance(it, str):
                            names.append(it)
                        elif isinstance(it, dict):
                            names.append(str(it.get('name') or it.get('Name') or it.get('ID') or it.get('id')))
                    if names:
                        ftm.append({'map': area.get('MapName'), 'area': area.get('UniqueAreaID'), 'season': seas,
                                    'items': names, 'conditions': area.get('ExtraConditions'), 'file': rel})
for f in failed:
    print('parse fail', f[0], f[1], file=sys.stderr)
print('changes', changes_seen, 'objects', len(objects), 'fish', len(fish), 'crops', len(crops), 'fruittrees', len(fruittrees),
      'recipes', len(recipes), 'machines', len(machines), 'shops', len(shops), 'monsters', len(monsters),
      'loc_fish', len(loc_fish), 'loc_forage', len(loc_forage), 'ftm', len(ftm), file=sys.stderr)

result = {}
for idv in mod_ids:
    o = objects.get(idv, {})
    disp = i18n_resolve(o.get('DisplayName'))
    name = o.get('Name')
    if not name or name == idv:
        name = disp if isinstance(disp, str) and not disp.startswith('{{') else (name or idv)
    rec = {
        'id': idv, 'name': name, 'displayName': disp,
        'description': i18n_resolve(o.get('Description')), 'type': o.get('Type'), 'category': o.get('Category'),
        'contextTags': o.get('ContextTags'), 'objFile': o.get('_file'),
    }
    if idv in fish:
        rec['fish'] = fish[idv]
    rec['locationFish'] = [f for f in loc_fish if norm(f.get('ItemId', '')) == idv or norm(f.get('Id', '')) == idv]
    rec['locationForage'] = [f for f in loc_forage if norm(f.get('ItemId', '')) == idv or norm(f.get('Id', '')) == idv]
    rec['crops'] = {k: v for k, v in crops.items() if norm(str(v.get('HarvestItemId', ''))) == idv}
    rec['fruitTrees'] = {k: v for k, v in fruittrees.items()
                         if any(norm(str(fr.get('ItemId', ''))) == idv for fr in (v.get('Fruit') or []) if isinstance(fr, dict))}
    rec['recipes'] = {k: v for k, v in recipes.items() if isinstance(v.get('raw'), str) and (idv in v['raw'] or k == name)}
    mach = []
    for mk, rules in machines.items():
        for rule in rules:
            for orule in rule.get('OutputRules', []) or []:
                if not isinstance(orule, dict):
                    continue
                outs = orule.get('OutputItem', []) or []
                if any(isinstance(oi, dict) and norm(str(oi.get('ItemId', ''))) == idv for oi in outs):
                    mach.append({'machine': mk, 'ruleId': orule.get('Id'), 'triggers': orule.get('Triggers'),
                                 'minutes': orule.get('MinutesUntilReady'), 'file': rule['_file']})
    rec['machines'] = mach
    rec['shops'] = [{'shop': sk, 'item': it} for sk, its in shops.items() for it in its if norm(str(it.get('ItemId', ''))) == idv]
    rec['ftm'] = [f for f in ftm if idv in f['items'] or name in f['items']]
    rec['monsterDrops'] = [k for k, v in monsters.items() if isinstance(v.get('raw'), str) and idv in v['raw']]
    result[idv] = rec

seed_ids = {k for r in result.values() for k in list(r['crops'].keys()) + list(r['fruitTrees'].keys())}
seed_shops = {s: [{'shop': sk, 'item': it} for sk, its in shops.items() for it in its if norm(str(it.get('ItemId', ''))) == s] for s in seed_ids}
seed_names = {}
for s in seed_ids:
    o = objects.get(s, {})
    nm = o.get('Name')
    if not nm or nm == s:
        nm = i18n_resolve(o.get('DisplayName')) or s
    seed_names[s] = nm
with open(OUT, 'w', encoding='utf-8') as f:
    json.dump({'items': result, 'seedShops': seed_shops, 'seedNames': seed_names}, f, indent=1, ensure_ascii=False)
print('wrote', OUT, file=sys.stderr)
