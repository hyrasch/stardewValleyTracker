/* ============================================================================
   Bundle + item data for the "Custom Cornucopia RSV SVE" bundle pack
   (Custom Community Center Bundles 1.1.1, variant Custom_Cornucopia_RSV_SVE).

   Bundle structure is taken from the pack's content.json. Item acquisition
   data comes from the SVE / Ridgeside Village / Cornucopia data files
   (see scripts/extract_mod_data.py) plus vanilla 1.6 knowledge.
   Sources flagged `unsure: true` could not be verified in the data files.

   Source fields:
     type     fish | crop | tree | bush | forage | artisan | cook | craft |
              animal | mine | monster | buy | money | other
     seasons  ['spring','summer','fall','winter'] or null for any season
     weather  'rain' | 'sun' | null
     time     human readable window, e.g. '6am–7pm'
     night    true when the window is mostly after 6pm
     where    list of places
     text     the requirement, short and direct
     note     optional longer context, shown on demand
   ========================================================================== */

const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const ALL = null;

const MODS = {
  vanilla: { label: 'Vanilla', short: 'SDV' },
  sve: { label: 'Stardew Valley Expanded', short: 'SVE' },
  rsv: { label: 'Ridgeside Village', short: 'RSV' },
  cornucopia: { label: 'Cornucopia', short: 'CORN' },
};

const TYPE_LABELS = {
  fish: 'Fishing', crop: 'Planting', tree: 'Fruit tree', bush: 'Bush', forage: 'Foraging',
  artisan: 'Machine', cook: 'Cooking', craft: 'Crafting', animal: 'Animals', mine: 'Mining',
  monster: 'Combat', buy: 'Buying', money: 'Gold', other: 'Gathering',
};
const TYPE_ICONS = {
  fish: '🎣', crop: '🌱', tree: '🌳', bush: '🌿', forage: '🧺', artisan: '⚙️', cook: '🍳', craft: '🔨',
  animal: '🐄', mine: '⛏️', monster: '⚔️', buy: '🛒', money: '💰', other: '📦',
};

/* ------------------------------------------------------------------------- */
/* Items                                                                      */
/* ------------------------------------------------------------------------- */

const ITEMS = {
  /* ---------------- Pantry: crops ---------------- */
  Carrot: { name: 'Carrot', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['spring'], where: ['Farm'], text: 'Seeds: Mystery Boxes, Raccoon, spring artifact spots · 3 days', note: 'Carrot Seeds are not in Pierre\'s regular stock. They also show up at the Traveling Cart.', unsure: true },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Salal_Berry': { name: 'Salal Berry', mod: 'sve', how: [
    { type: 'crop', seasons: ['spring', 'summer'], where: ['Farm'], text: 'Seeds: SVE "Shrub Seed" · 13 days · regrows 4d', note: 'No shop in your data files sells Shrub Seed; SVE hands it out through its own code (Highlands drops / artifact spots). Also needed for Mixed Berry Pie, so grow at least 2.', unsure: true },
  ] },
  Cornucopia_Onion: { name: 'Onion', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['spring'], where: ['Farm'], text: 'Seeds: Pierre 40g · 8 days' },
  ] },
  190: { name: 'Cauliflower', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['spring'], where: ['Farm'], text: 'Seeds: Pierre 80g · 12 days' },
  ] },
  256: { name: 'Tomato', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Pierre 50g · 11 days · regrows 4d' },
  ] },
  SummerSquash: { name: 'Summer Squash', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Mystery Boxes, Raccoon, summer artifact spots · 6 days · regrows 3d', note: 'Not in Pierre\'s regular stock. Also at the Traveling Cart.', unsure: true },
  ] },
  Cornucopia_BellPepper: { name: 'Bell Pepper', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Pierre 65g · 10 days · regrows 4d' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Ancient_Fiber': { name: 'Ancient Fiber', mod: 'sve', how: [
    { type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: SVE "Ancient Ferns Seed" · 12 days', note: 'The seed is not sold in any shop in your data files; SVE gives it through its own code (Highlands / Highlands Cavern drops).', unsure: true },
  ] },
  278: { name: 'Bok Choy', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Pierre 50g · 4 days' },
  ] },
  Cornucopia_Olive: { name: 'Olive', mod: 'cornucopia', how: [
    { type: 'bush', seasons: ['fall'], where: ['Farm'], text: 'Olive Seeds: Pierre 1,000g · bush matures in 30 days · fruits in fall', note: 'Plant like a tea sapling. Plant by early spring to harvest 2–3 olives a day in fall of the same year.' },
  ] },
  Broccoli: { name: 'Broccoli', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Mystery Boxes, Raccoon, fall artifact spots · 8 days · regrows 4d', note: 'Not in Pierre\'s regular stock. Also at the Traveling Cart.', unsure: true },
  ] },
  276: { name: 'Pumpkin', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Pierre 100g · 13 days' },
  ] },
  24: { name: 'Parsnip', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['spring'], where: ['Farm'], text: 'Seeds: Pierre 20g · 4 days', note: 'Gold quality: use Quality or Deluxe Fertilizer; higher Farming level helps.' },
  ] },
  258: { name: 'Blueberry', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Pierre 80g · 13 days · regrows 4d, 3 per harvest', note: 'Gold quality: use Quality or Deluxe Fertilizer.' },
  ] },
  280: { name: 'Yam', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Pierre 60g · 10 days', note: 'Gold quality: use Quality or Deluxe Fertilizer.' },
  ] },
  Cornucopia_Rose: { name: 'Rose', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['spring', 'summer', 'fall'], where: ['Farm'], text: 'Seeds: Pierre 100g (rare rotation) · 12 days', note: 'Gold quality: use Quality or Deluxe Fertilizer.' },
  ] },
  454: { name: 'Ancient Fruit', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['spring', 'summer', 'fall'], where: ['Farm', 'Greenhouse'], text: 'Ancient Seeds: Gunther (donate the artifact) or Traveling Cart · 28 days · regrows 7d' },
  ] },
  417: { name: 'Sweet Gem Berry', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Rare Seed: Traveling Cart 1,000g (spring/summer stock) · 24 days' },
  ] },

  /* ---------------- Pantry: animals ---------------- */
  186: { name: 'Large Milk', mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Barn'], text: 'Cow with high friendship and mood' },
  ] },
  182: { name: 'Large Egg (brown)', mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Coop'], text: 'Brown chicken with high friendship' },
  ] },
  174: { name: 'Large Egg (white)', mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Coop'], text: 'White chicken with high friendship' },
  ] },
  438: { name: 'Large Goat Milk', mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Barn'], text: 'Goat (Big Barn) with high friendship · every other day' },
  ] },
  440: { name: 'Wool', mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Barn', 'Coop'], text: 'Shear a sheep (Deluxe Barn) or rabbit drop (Deluxe Coop)' },
  ] },
  442: { name: 'Duck Egg', mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Coop'], text: 'Duck (Big Coop) · every other day' },
  ] },

  /* ---------------- Pantry: fish farming ---------------- */
  812: { name: 'Roe', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Fish Pond'], text: 'Any fish pond' },
  ] },
  447: { name: 'Aged Roe', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Preserves Jar'], text: 'Roe → Preserves Jar · ~2.8 days each' },
  ] },
  172: { name: 'Soggy Newspaper', mod: 'vanilla', how: [
    { type: 'fish', seasons: ALL, where: ['Any water', 'Crab Pot'], text: 'Trash from fishing or crab pots', note: 'Town garbage cans also give it.' },
  ] },

  /* ---------------- Pantry: garden ---------------- */
  Cornucopia_Iris: { name: 'Iris', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Iris Bulb: Pierre 25g · 10 days' },
  ] },
  421: { name: 'Sunflower', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['summer', 'fall'], where: ['Farm'], text: 'Seeds: Pierre 200g or JojaMart 125g · 8 days' },
  ] },
  Cornucopia_BlueMist: { name: 'Blue Mist', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Pierre 10g · 7 days' },
  ] },
  Cornucopia_Pansy: { name: 'Pansy', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['spring'], where: ['Farm'], text: 'Seeds: Pierre 15g · 6 days' },
  ] },
  Cornucopia_MorningGlory: { name: 'Morning Glory', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['spring'], where: ['Farm'], text: 'Starter: Pierre 120g · 10 days · regrows 4d' },
  ] },

  /* ---------------- Pantry: artisan ---------------- */
  350: { name: 'Juice', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Keg'], text: 'Any vegetable → Keg · 4 days', note: 'Needed by two bundles (Artisan and Brewer\'s).' },
  ] },
  342: { name: 'Pickles', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Preserves Jar'], text: 'Any vegetable → Preserves Jar · ~3 days' },
  ] },
  344: { name: 'Jelly', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Preserves Jar'], text: 'Any fruit → Preserves Jar · ~3 days' },
  ] },
  'Rafseazz.RSVCP_Cherry_Pluot': { name: 'Cherry Pluot', mod: 'rsv', how: [
    { type: 'tree', seasons: ['spring'], where: ['Farm'], text: 'Sapling: Kimpoi\'s shop (Ridgeside) · tree matures in 28 days', note: 'Also needed for Kek\'s Style Shortcake ×5, so one tree is worth it.' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Random fruit forage in the cave' },
  ] },
  'Rafseazz.RSVCP_Mountain_Plumcot': { name: 'Mountain Plumcot', mod: 'rsv', how: [
    { type: 'tree', seasons: ['spring'], where: ['Farm'], text: 'Sapling: Kimpoi\'s shop (Ridgeside) · tree matures in 28 days' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Random fruit forage in the cave' },
  ] },
  'Rafseazz.RSVCP_Desert_Tangelo': { name: 'Desert Tangelo', mod: 'rsv', how: [
    { type: 'tree', seasons: ['summer'], where: ['Farm'], text: 'Sapling: Kimpoi\'s shop, Year 2+ · tree matures in 28 days' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Random fruit forage in the cave' },
  ] },
  'Rafseazz.RSVCP_Tropi_Ugli_Fruit': { name: 'Tropi Ugli Fruit', mod: 'rsv', how: [
    { type: 'tree', seasons: ['summer'], where: ['Farm'], text: 'Sapling: Kimpoi\'s shop (Ridgeside) · tree matures in 28 days' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Random fruit forage in the cave' },
  ] },
  'Rafseazz.RSVCP_Paradise_Rangpur': { name: 'Paradise Rangpur', mod: 'rsv', how: [
    { type: 'tree', seasons: ['summer'], where: ['Farm'], text: 'Sapling: Kimpoi\'s shop (Ridgeside) · tree matures in 28 days' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Random fruit forage in the cave' },
  ] },
  424: { name: 'Cheese', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Cheese Press'], text: 'Milk → Cheese Press · 3.3 hours' },
  ] },
  426: { name: 'Goat Cheese', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Cheese Press'], text: 'Goat Milk → Cheese Press · 3.3 hours' },
  ] },
  340: { name: 'Honey', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ['spring', 'summer', 'fall'], where: ['Bee House'], text: 'Bee House outdoors · 4 days', note: 'No honey in winter. The Spring Crops bundle rewards a Bee House.' },
  ] },
  Cornucopia_Avocado: { name: 'Avocado', mod: 'cornucopia', how: [
    { type: 'tree', seasons: ['summer'], where: ['Farm'], text: 'Sapling: Pierre 2,000g · tree matures in 28 days' },
  ] },
  459: { name: 'Mead', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Keg'], text: 'Honey → Keg · 10 hours' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Aged_Blue_Moon_Wine': { name: 'Aged Blue Moon Wine', mod: 'sve', how: [
    { type: 'buy', seasons: ALL, where: ['Blue Moon Vineyard (SVE)'], text: 'Sophia\'s ledger · 28,000g', note: 'No machine recipe produces it in your data files; buying is the only way.' },
  ] },
  303: { name: 'Pale Ale', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Keg'], text: 'Hops → Keg · 1.5 days', note: 'Hops: summer trellis crop, Pierre 60g, 11 days then daily.' },
  ] },
  614: { name: 'Green Tea', mod: 'vanilla', how: [
    { type: 'artisan', seasons: ALL, where: ['Keg'], text: 'Tea Leaves → Keg', note: 'Tea Leaves grow on a Tea Sapling (recipe from Caroline\'s 2-heart event) in the last week of spring, summer and fall, or all year indoors.' },
  ] },

  /* ---------------- Fish Tank ---------------- */
  'FlashShifter.StardewValleyExpandedCP_Butterfish': { name: 'Butterfish', mod: 'sve', how: [
    { type: 'fish', seasons: ['spring', 'summer'], weather: 'sun', time: '6am–2am', where: ['Shearwater Bridge (SVE)', 'Forest West (SVE, summer)'], text: 'Difficulty 80', note: 'Also an ingredient of Glazed Butterfish, so catch 2.' },
  ] },
  143: { name: 'Catfish', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['spring', 'fall'], weather: 'rain', time: '6am–12am', where: ['Pelican Town river', 'Cindersap Forest river'], text: 'Difficulty 75' },
    { type: 'fish', seasons: ['spring', 'summer', 'fall'], weather: 'rain', time: '6am–12am', where: ['Secret Woods pond'], text: 'Difficulty 75 · summer too' },
  ] },
  'Rafseazz.RSVCP_Harvester_Trout': { name: 'Harvester Trout', mod: 'rsv', how: [
    { type: 'fish', seasons: ['spring', 'fall', 'winter'], time: '8am–4pm', where: ['Ridgeside Village river', 'Summit Farm (Ridgeside)', 'Ridge Pond'], text: 'Difficulty 40' },
  ] },
  'Rafseazz.RSVCP_Mountain_Redbelly_Dace': { name: 'Mountain Redbelly Dace', mod: 'rsv', how: [
    { type: 'fish', seasons: ALL, time: '6am–7pm', where: ['Ridgeside Village', 'Ridge Forest', 'The Ridge', 'Ridge Falls', 'Summit Farm (Ridgeside)'], text: 'Difficulty 40' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Minnow': { name: 'Minnow', mod: 'sve', how: [
    { type: 'fish', seasons: ALL, weather: 'sun', time: '6am–6pm', where: ['Pelican Town river', 'Cindersap Forest river', 'Mountain Lake', 'Shearwater Bridge (SVE)', 'Farm pond'], text: 'Difficulty 1' },
  ] },
  698: { name: 'Sturgeon', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['summer', 'winter'], time: '6am–7pm', where: ['Mountain Lake'], text: 'Difficulty 78' },
  ] },
  'Rafseazz.RSVCP_Pebble_Back_Crab': { name: 'Pebble Back Crab', mod: 'rsv', how: [
    { type: 'fish', seasons: ['spring', 'summer', 'winter'], time: '3pm–10pm', night: true, where: ['Ridge Forest', 'Ridge Pond'], text: 'Difficulty 30' },
  ] },
  'Rafseazz.RSVCP_Crimson_Spiked_Clam': { name: 'Crimson Spiked Clam', mod: 'rsv', how: [
    { type: 'fish', seasons: ['spring', 'summer', 'winter'], time: '10am–4pm', where: ['Ridge Forest', 'Ridge Pond'], text: 'Difficulty 69' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Dulse_Seaweed': { name: 'Dulse Seaweed', mod: 'sve', how: [
    { type: 'fish', seasons: ALL, where: ['The Beach', 'Blue Moon Vineyard (SVE)', 'Fable Reef (SVE)'], text: 'Fished like Seaweed, no minigame', note: 'Needed by Ocean Fish and Fodder, so keep 2.' },
  ] },
  131: { name: 'Sardine', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['spring', 'fall', 'winter'], time: '6am–7pm', where: ['The Beach'], text: 'Difficulty 30' },
  ] },
  150: { name: 'Red Snapper', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['summer', 'fall', 'winter'], weather: 'rain', time: '6am–7pm', where: ['The Beach'], text: 'Difficulty 40' },
  ] },
  701: { name: 'Tilapia', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['summer', 'fall'], time: '6am–2pm', where: ['The Beach'], text: 'Difficulty 50' },
  ] },
  148: { name: 'Eel', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['spring', 'fall'], weather: 'rain', time: '4pm–2am', night: true, where: ['The Beach'], text: 'Difficulty 70' },
  ] },
  132: { name: 'Bream', mod: 'vanilla', how: [
    { type: 'fish', seasons: ALL, time: '6pm–2am', night: true, where: ['Pelican Town river', 'Cindersap Forest river'], text: 'Difficulty 35' },
  ] },
  'Rafseazz.RSVCP_Cardia_Septal_Jellyfish': { name: 'Cardia Septal Jellyfish', mod: 'rsv', how: [
    { type: 'fish', seasons: ['spring', 'fall', 'winter'], time: '8pm–2am', night: true, where: ['Ridge Forest', 'Ridge Pond'], text: 'Difficulty 69' },
  ] },
  156: { name: 'Ghostfish', mod: 'vanilla', how: [
    { type: 'fish', seasons: ALL, where: ['The Mines, floors 20 and 60'], text: 'Difficulty 50', note: 'Ghosts occasionally drop it too.' },
  ] },
  'Rafseazz.RSVCP_Fairytale_Lionfish': { name: 'Fairytale Lionfish', mod: 'rsv', how: [
    { type: 'fish', seasons: ['spring', 'summer', 'fall'], time: '11am–8pm', where: ['Ridge Falls', 'Ridge Pond'], text: 'Difficulty 69' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Puppyfish': { name: 'Puppyfish', mod: 'sve', how: [
    { type: 'fish', seasons: ['spring', 'summer', 'fall'], time: '6am–2am', where: ['Shearwater Bridge (SVE)', 'Forest West (SVE, summer)'], text: 'Difficulty 90', note: 'Also an ingredient of Big Bark Burger, so catch 2.' },
  ] },
  734: { name: 'Woodskip', mod: 'vanilla', how: [
    { type: 'fish', seasons: ALL, where: ['Secret Woods pond'], text: 'Difficulty 50', note: 'Steel Axe needed to enter the Secret Woods.' },
  ] },
  702: { name: 'Chub', mod: 'vanilla', how: [
    { type: 'fish', seasons: ALL, where: ['Mountain Lake', 'Cindersap Forest river'], text: 'Difficulty 35 · silver quality or better', note: 'Quality comes from the catch bar: better rod, bait and a perfect catch.' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Grass_Carp': { name: 'Grass Carp', mod: 'sve', how: [
    { type: 'fish', seasons: ['spring', 'summer'], time: '6am–2am', where: ['Secret Woods pond'], text: 'Difficulty 85 · silver quality or better' },
  ] },
  'Rafseazz.RSVCP_Ridgeside_Bass': { name: 'Ridgeside Bass', mod: 'rsv', how: [
    { type: 'fish', seasons: ALL, time: '6am–1am', where: ['Ridgeside Village', 'Ridge Forest', 'The Ridge', 'Ridge Falls', 'Summit Farm (Ridgeside)'], text: 'Difficulty 10 · silver quality or better' },
  ] },
  154: { name: 'Sea Cucumber', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['fall', 'winter'], time: '6am–7pm', where: ['The Beach'], text: 'Difficulty 40 · silver quality or better' },
  ] },
  149: { name: 'Octopus', mod: 'vanilla', how: [
    { type: 'fish', seasons: ['summer'], time: '6am–1pm', where: ['The Beach'], text: 'Difficulty 95' },
  ] },
  'Rafseazz.RSVCP_Golden_Rose_Fin': { name: 'Golden Rose Fin', mod: 'rsv', how: [
    { type: 'fish', seasons: ['spring', 'fall', 'winter'], time: '7am–7pm', where: ['Ridge Falls', 'Ridge Pond'], text: 'Difficulty 69' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Radioactive_Bass': { name: 'Radioactive Bass', mod: 'sve', how: [
    { type: 'fish', seasons: ALL, time: '6am–2am', where: ['The Sewers'], text: 'Fishing level 10 · difficulty 90', note: 'Sewers need the Rusty Key (60 museum donations).' },
  ] },
  165: { name: 'Scorpion Carp', mod: 'vanilla', how: [
    { type: 'fish', seasons: ALL, time: '6am–8pm', where: ['Calico Desert pond'], text: 'Fishing level 4 · difficulty 90', note: 'Desert needs the bus (Vault bundles).' },
  ] },
  715: { name: 'Lobster', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot (ocean)'], text: 'Ocean crab pot' }] },
  717: { name: 'Crab', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot (ocean)'], text: 'Ocean crab pot', note: 'Rock Crabs in the Mines also drop it.' }] },
  718: { name: 'Cockle', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['The Beach', 'Crab Pot (ocean)'], text: 'Beach forage or ocean crab pot' }] },
  719: { name: 'Mussel', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['The Beach', 'Crab Pot (ocean)'], text: 'Beach forage or ocean crab pot' }] },
  720: { name: 'Shrimp', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot (ocean)'], text: 'Ocean crab pot', note: 'Also an ingredient of Shrimp Cocktail.' }] },
  723: { name: 'Oyster', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['The Beach', 'Crab Pot (ocean)'], text: 'Beach forage or ocean crab pot' }] },
  716: { name: 'Crayfish', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot (fresh water)'], text: 'River or lake crab pot' }] },
  721: { name: 'Snail', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot (fresh water)'], text: 'River or lake crab pot' }] },
  722: { name: 'Periwinkle', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot (fresh water)'], text: 'River or lake crab pot' }] },
  169: { name: 'Driftwood', mod: 'vanilla', how: [{ type: 'fish', seasons: ALL, where: ['Crab Pot', 'Any water'], text: 'Trash from crab pots or fishing' }] },

  /* ---------------- Crafts Room ---------------- */
  'Rafseazz.RSVCP_Ridge_Azorean_Flower': { name: 'Ridge Azorean Flower', mod: 'rsv', how: [
    { type: 'forage', seasons: ['spring'], where: ['The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  'Rafseazz.RSVCP_Ridge_Cherry': { name: 'Ridge Cherry', mod: 'rsv', how: [
    { type: 'forage', seasons: ['spring'], where: ['Ridgeside Village', 'The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Big_Conch': { name: 'Big Conch', mod: 'sve', how: [
    { type: 'forage', seasons: ALL, where: ['The Beach'], text: 'Days 1, 2, 7, 11, 16, 19, 22, 26 of each season' },
    { type: 'forage', seasons: ALL, where: ['Fable Reef (SVE)'], text: 'Common forage', note: 'Fable Reef is late game (Ginger Island + Lance).' },
  ] },
  22: { name: 'Dandelion', mod: 'vanilla', how: [
    { type: 'forage', seasons: ['spring'], where: ['Cindersap Forest', 'Pelican Town', 'Bus Stop', 'Railroad'], text: 'Ground forage', note: 'Spring Seeds also grow it.' },
  ] },
  'Rafseazz.RSVCP_Mountain_Chico': { name: 'Mountain Chico', mod: 'rsv', how: [
    { type: 'forage', seasons: ['summer'], where: ['Ridgeside Village', 'The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage', note: 'Also an ingredient of Highland Ice Cream, so keep 2.' },
  ] },
  Cornucopia_Raspberry: { name: 'Raspberry', mod: 'cornucopia', how: [
    { type: 'bush', seasons: ['summer'], where: ['Farm'], text: 'Raspberry Seeds: Pierre 250g · bush matures in 14 days · fruits summer 22–28', note: 'Plant like a tea sapling; 2–4 berries a day during the last week of summer.' },
    { type: 'forage', seasons: ['summer'], where: ['Cindersap Forest', 'Mountain'], text: 'Wild summer forage', unsure: true },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Dried_Sand_Dollar': { name: 'Dried Sand Dollar', mod: 'sve', how: [
    { type: 'forage', seasons: ['summer', 'fall'], where: ['The Beach'], text: 'Days 1, 4, 7–9, 13–15, 17, 20, 23, 25–26, 28' },
    { type: 'forage', seasons: ALL, where: ['Fable Reef (SVE)'], text: 'Common forage' },
  ] },
  'Rafseazz.RSVCP_Summit_Snowbell': { name: 'Summit Snowbell', mod: 'rsv', how: [
    { type: 'forage', seasons: ['fall'], where: ['The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  408: { name: 'Hazelnut', mod: 'vanilla', how: [
    { type: 'forage', seasons: ['fall'], where: ['Mountain', 'Backwoods', 'Bus Stop', 'Railroad'], text: 'Ground forage · also shakes out of trees from fall 15' },
  ] },
  'Rafseazz.RSVCP_Autumn_Drop_Berry': { name: 'Autumn Drop Berry', mod: 'rsv', how: [
    { type: 'forage', seasons: ['fall'], where: ['Ridgeside Village', 'The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Mushroom_Colony': { name: 'Mushroom Colony', mod: 'sve', how: [
    { type: 'forage', seasons: ['fall'], where: ['Secret Woods', 'Forest West (SVE)', 'Highlands (SVE)'], text: 'Ground forage' },
    { type: 'forage', seasons: ['spring', 'summer', 'fall'], where: ['Junimo Woods (SVE)'], text: 'Ground forage', note: 'Junimo Woods only opens after the Community Center is finished.' },
  ] },
  'Rafseazz.RSVCP_Frost_Clump_Berry': { name: 'Frost Clump Berry', mod: 'rsv', how: [
    { type: 'forage', seasons: ['winter'], where: ['Ridgeside Village', 'The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  'Rafseazz.RSVCP_Sierra_Wintergreen': { name: 'Sierra Wintergreen', mod: 'rsv', how: [
    { type: 'forage', seasons: ['winter'], where: ['The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Bearberrys': { name: 'Bearberrys', mod: 'sve', how: [
    { type: 'forage', seasons: ['winter'], where: ['Secret Woods'], text: 'Ground forage', note: 'Also an ingredient of Mixed Berry Pie, so take 2.' },
  ] },
  418: { name: 'Crocus', mod: 'vanilla', how: [
    { type: 'forage', seasons: ['winter'], where: ['Anywhere outdoors'], text: 'Ground forage', note: 'Winter Seeds also grow it.' },
  ] },
  388: { name: 'Wood', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Anywhere'], text: 'Chop trees', note: '99 for the bundle plus 100 for the 50 fences.' }] },
  322: { name: 'Wood Fence', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '2 Wood each · 50 fences = 100 Wood' }] },
  390: { name: 'Stone', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines', 'Farm'], text: 'Break rocks' }] },
  709: { name: 'Hardwood', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Secret Woods', 'Farm'], text: 'Large stumps (Copper Axe) · logs (Steel Axe) · Mahogany trees', note: '6 stumps respawn every day in the Secret Woods.' }] },
  92: { name: 'Sap', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Anywhere'], text: 'Chop trees' }] },
  330: { name: 'Clay', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Farm', 'The Beach'], text: 'Hoe artifact spots or beach sand' }] },
  724: { name: 'Maple Syrup', mod: 'vanilla', how: [{ type: 'artisan', seasons: ALL, where: ['Tapper on Maple tree'], text: 'Tapper (Foraging 3) · 9 days', note: 'Needed by Sticky and Exotic Foraging.' }] },
  766: { name: 'Slime', mod: 'vanilla', how: [{ type: 'monster', seasons: ALL, where: ['The Mines', 'Secret Woods'], text: 'Slimes', note: 'Sticky needs 10, Adventurer\'s needs 99.' }] },
  Moss: { name: 'Moss', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Cindersap Forest', 'Farm'], text: 'Hit mossy trees with any tool', note: 'Moss spreads to more trees after rainy days.' }] },
  771: { name: 'Fiber', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Anywhere'], text: 'Scythe weeds', note: 'Fiber Seeds (Foraging 1, after the Linus quest) grow it in bulk.' }] },
  309: { name: 'Acorn', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Anywhere with oaks'], text: 'Shake or chop oak trees' }] },
  310: { name: 'Maple Seed', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Anywhere with maples'], text: 'Shake or chop maple trees', note: 'Fall gives extra seeds.' }] },
  78: { name: 'Cave Carrot', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 1–80'], text: 'Hoe dirt patches, break weeds' }] },
  725: { name: 'Oak Resin', mod: 'vanilla', how: [{ type: 'artisan', seasons: ALL, where: ['Tapper on Oak tree'], text: 'Tapper · 7 days' }] },
  726: { name: 'Pine Tar', mod: 'vanilla', how: [{ type: 'artisan', seasons: ALL, where: ['Tapper on Pine tree'], text: 'Tapper · 5 days' }] },
  422: { name: 'Purple Mushroom', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 81+', 'Farm Cave (mushrooms)'], text: 'Floor forage · mushroom cave', note: 'Skull Cavern also has them.' }] },
  'Rafseazz.RSVCP_Lava_Lily': { name: 'Lava Lily', mod: 'rsv', how: [
    { type: 'forage', seasons: ['fall'], where: ['The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Cave forage' },
  ] },
  88: { name: 'Coconut', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Calico Desert'], text: 'Desert forage', note: 'Bus needed. The Traveling Cart sells it sometimes.' }] },
  90: { name: 'Cactus Fruit', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Calico Desert'], text: 'Desert forage', note: 'Cactus Seeds from the Oasis grow indoors.' }] },
  'Rafseazz.RSVCP_Mountain_Mistbloom': { name: 'Mountain Mistbloom', mod: 'rsv', how: [
    { type: 'forage', seasons: ALL, weather: 'rain', where: ['Ridge Forest'], text: 'Spawns only on rainy or stormy days' },
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Cave forage' },
  ] },
  259: { name: 'Fiddlehead Fern', mod: 'vanilla', how: [{ type: 'forage', seasons: ['summer'], where: ['Secret Woods'], text: 'Ground forage' }] },
  'FlashShifter.StardewValleyExpandedCP_Smelly_Rafflesia': { name: 'Smelly Rafflesia', mod: 'sve', how: [
    { type: 'forage', seasons: ['spring', 'summer', 'fall'], where: ['Secret Woods'], text: 'Days 4, 8, 11, 14, 17, 21, 25' },
    { type: 'forage', seasons: ['fall'], where: ['Highlands (SVE)'], text: 'Ground forage' },
  ] },
  260: { name: 'Hot Pepper', mod: 'vanilla', how: [{ type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Pierre 40g · 5 days · regrows 3d' }] },

  /* ---------------- Boiler Room ---------------- */
  334: { name: 'Copper Bar', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['Furnace'], text: '5 Copper Ore + 1 Coal → Furnace' }] },
  335: { name: 'Iron Bar', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['Furnace'], text: '5 Iron Ore + 1 Coal → Furnace', note: 'Iron from Mines floors 40+.' }] },
  336: { name: 'Gold Bar', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['Furnace'], text: '5 Gold Ore + 1 Coal → Furnace', note: 'Gold from Mines floors 80+.' }] },
  80: { name: 'Quartz', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines'], text: 'Any floor' }] },
  86: { name: 'Earth Crystal', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 1–39'], text: 'Nodes, Geodes, Duggies' }] },
  84: { name: 'Frozen Tear', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 40–79'], text: 'Nodes, Frozen Geodes' }] },
  82: { name: 'Fire Quartz', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 80+'], text: 'Nodes, Magma Geodes' }] },
  767: { name: 'Bat Wing', mod: 'vanilla', how: [{ type: 'monster', seasons: ALL, where: ['The Mines, floors 30+'], text: 'Bats' }] },
  881: { name: 'Bone Fragment', mod: 'vanilla', how: [{ type: 'monster', seasons: ALL, where: ['The Mines, floors 70+', 'Skull Cavern'], text: 'Skeletons · bone nodes' }] },
  769: { name: 'Void Essence', mod: 'vanilla', how: [{ type: 'monster', seasons: ALL, where: ['The Mines, floors 80+', 'The Sewers (Krobus)'], text: 'Shadow Brutes / Shamans · Krobus 100g' }] },
  'Rafseazz.RSVCP_Spiritual_Essence': { name: 'Spiritual Essence', mod: 'rsv', how: [
    { type: 'monster', seasons: ALL, where: ['Ridge Forest'], text: 'Monsters roaming the Ridge Forest' },
  ] },
  72: { name: 'Diamond', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 50+'], text: 'Gem nodes · Omni Geodes' }] },
  60: { name: 'Emerald', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines'], text: 'Gem nodes · Geodes' }] },
  64: { name: 'Ruby', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 80+'], text: 'Gem nodes · Magma Geodes' }] },
  68: { name: 'Topaz', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines'], text: 'Gem nodes · Geodes' }] },
  66: { name: 'Amethyst', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines'], text: 'Gem nodes · Geodes' }] },
  62: { name: 'Aquamarine', mod: 'vanilla', how: [{ type: 'mine', seasons: ALL, where: ['The Mines, floors 40+'], text: 'Gem nodes · Frozen Geodes' }] },
  286: { name: 'Cherry Bomb', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '4 Copper Ore + 1 Coal · Mining 1', note: 'The Dwarf sells them too.' }] },
  287: { name: 'Bomb', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '4 Iron Ore + 1 Coal · Mining 6', note: 'The Dwarf sells them too.' }] },
  288: { name: 'Mega Bomb', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '4 Gold Ore + Solar Essence + Void Essence · Mining 8', note: 'The Dwarf sells them too.' }] },

  /* ---------------- Vault ---------------- */
  'gold-2500': { name: '2,500g', mod: 'vanilla', how: [{ type: 'money', seasons: ALL, where: ['Wallet'], text: 'Donate 2,500g' }] },
  'gold-5000': { name: '5,000g', mod: 'vanilla', how: [{ type: 'money', seasons: ALL, where: ['Wallet'], text: 'Donate 5,000g' }] },
  'gold-10000': { name: '10,000g', mod: 'vanilla', how: [{ type: 'money', seasons: ALL, where: ['Wallet'], text: 'Donate 10,000g' }] },
  'gold-25000': { name: '25,000g', mod: 'vanilla', how: [{ type: 'money', seasons: ALL, where: ['Wallet'], text: 'Donate 25,000g' }] },

  /* ---------------- Bulletin Board ---------------- */
  Cornucopia_OliveOil: { name: 'Olive Oil', mod: 'cornucopia', how: [{ type: 'artisan', seasons: ALL, where: ['Oil Maker'], text: '4 Olives → Oil Maker · 16 hours', note: 'Oil Maker recipe at Farming level 8.' }] },
  'FlashShifter.StardewValleyExpandedCP_Glazed_Butterfish': { name: 'Glazed Butterfish', mod: 'sve', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Butterfish + 2 Wheat Flour + 2 Oil + Sugar · recipe: Saloon 6,000g' },
  ] },
  605: { name: 'Artichoke Dip', mod: 'vanilla', how: [{ type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Artichoke + Milk · recipe: Queen of Sauce, Fall 28 (Y1)', note: 'Artichoke is a fall crop (Pierre, year 2+, or Traveling Cart).' }] },
  733: { name: 'Shrimp Cocktail', mod: 'vanilla', how: [{ type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Tomato + Shrimp + Wild Horseradish · recipe: Queen of Sauce, Winter 14 (Y2)', note: 'Queen of Sauce reruns old episodes on Wednesdays.' }] },
  'FlashShifter.StardewValleyExpandedCP_Big_Bark_Burger': { name: 'Big Bark Burger', mod: 'sve', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Puppyfish + Bread + Oil · recipe: Saloon 3,000g' },
  ] },
  'Rafseazz.RSVCP_Pink_Frosted_Sprinkled_Doughnut': { name: 'Pink Frosted Sprinkled Doughnut', mod: 'rsv', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Wheat Flour + 5 Sugar + Strawberry + Highland Jostaberry · recipe: Malaya (Ridgeside)', note: 'Highland Jostaberry is a Ridgeside fruit tree (Kimpoi\'s shop).' },
  ] },
  587: { name: 'Amphibian Fossil', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Cindersap Forest', 'Mountain'], text: 'Artifact spots · fishing treasure chests' }] },
  'FlashShifter.StardewValleyExpandedCP_Mushroom_Berry_Rice': { name: 'Mushroom Berry Rice', mod: 'sve', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: '3 Poison Mushroom + 10 Red Baneberry + Rice + 2 Sugar · recipe: Adventurer\'s Guild 1,500g', note: 'Poison Mushrooms and Red Baneberries are SVE forage (Highlands / summer woods).' },
  ] },
  'Rafseazz.RSVCP_Pillowsoft_Cheezy_Sandwich': { name: 'Pillowsoft Cheezy Sandwich', mod: 'rsv', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Wheat Flour + Cheese + Goat Cheese + Mountain Arugula · recipe: Malaya (Ridgeside)', note: 'Mountain Arugula is a Ridgeside crop.' },
  ] },
  392: { name: 'Nautilus Shell', mod: 'vanilla', how: [{ type: 'forage', seasons: ['winter'], where: ['The Beach'], text: 'Ground forage' }] },
  446: { name: "Rabbit's Foot", mod: 'vanilla', how: [
    { type: 'animal', seasons: ALL, where: ['Coop'], text: 'Rabbit with high friendship' },
    { type: 'monster', seasons: ALL, where: ['Skull Cavern'], text: 'Serpents', note: 'The Traveling Cart sometimes sells one.' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Frog': { name: 'Frog', mod: 'sve', how: [
    { type: 'fish', seasons: ['spring', 'summer'], weather: 'rain', time: '6pm–2am', night: true, where: ['Mountain Lake'], text: 'Fishing level 5 · difficulty 70' },
  ] },
  DriedMushrooms: { name: 'Dried Mushrooms', mod: 'vanilla', how: [{ type: 'artisan', seasons: ALL, where: ['Dehydrator'], text: '5 mushrooms of one kind → Dehydrator', note: 'Dehydrator recipe: Pierre 10,000g.' }] },
  773: { name: 'Life Elixir', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: 'Red + Purple Mushroom + Morel + Chanterelle · Combat 2' }] },
  444: { name: 'Duck Feather', mod: 'vanilla', how: [{ type: 'animal', seasons: ALL, where: ['Coop'], text: 'Happy duck, instead of an egg' }] },
  814: { name: 'Squid Ink', mod: 'vanilla', how: [{ type: 'artisan', seasons: ALL, where: ['Fish Pond', 'The Mines'], text: 'Squid fish pond · Squid Kid drop' }] },
  397: { name: 'Sea Urchin', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['The Beach (tide pools)'], text: 'East of the repaired bridge (300 Wood)', note: 'Most common in summer.' }] },
  284: { name: 'Beet', mod: 'vanilla', how: [{ type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Oasis 20g · 6 days', note: 'Oasis needs the bus.' }] },
  Cornucopia_Chrysanthemum: { name: 'Chrysanthemum', mod: 'cornucopia', how: [{ type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Pierre 20g · 9 days' }] },
  Cornucopia_CottonBoll: { name: 'Cotton Boll', mod: 'cornucopia', how: [{ type: 'crop', seasons: ['summer', 'fall'], where: ['Farm'], text: 'Seeds: Pierre 100g (rare rotation) or Fair 250 tokens · 8 days · regrows 2d' }] },
  'Rafseazz.RSVCP_Ridge_Wild_Apple': { name: 'Ridge Wild Apple', mod: 'rsv', how: [
    { type: 'forage', seasons: ['summer'], where: ['Ridgeside Village', 'The Ridge', 'Ridge Forest', 'Ridge Falls', 'The Hike (Ridgeside)'], text: 'Ground forage' },
  ] },
  Cornucopia_Soybeans: { name: 'Soybeans', mod: 'cornucopia', how: [
    { type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Traveling Cart (random) · 10 days · regrows 3d', note: 'The harvest is the seed itself. Also needed for Tofu (2).' },
  ] },
  103: { name: 'Ancient Doll', mod: 'vanilla', how: [{ type: 'forage', seasons: ALL, where: ['Pelican Town', 'Cindersap Forest', 'Mountain', 'Bus Stop'], text: 'Artifact spots · fishing treasure chests' }] },
  'FlashShifter.StardewValleyExpandedCP_Mixed_Berry_Pie': { name: 'Mixed Berry Pie', mod: 'sve', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Strawberry + Salal Berry + Blackberry + Bearberrys + Sugar + Wheat Flour · recipe: Saloon 5,000g' },
  ] },
  'Rafseazz.RSVCP_Highland_Ice_Cream': { name: 'Highland Ice Cream', mod: 'rsv', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Large Milk + Mountain Chico · recipe: Pika (Ridgeside)' },
  ] },
  TentKit: { name: 'Tent Kit', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '10 Hardwood + 10 Fiber + Cloth · recipe: Adventurer\'s Guild 2,000g', unsure: true }] },
  296: { name: 'Salmonberry', mod: 'vanilla', how: [{ type: 'forage', seasons: ['spring'], where: ['Bushes everywhere'], text: 'Shake bushes on spring 15–18', note: 'Forager\'s needs 50, each Baked Berry Oatmeal needs 15.' }] },
  410: { name: 'Blackberry', mod: 'vanilla', how: [{ type: 'forage', seasons: ['fall'], where: ['Bushes everywhere'], text: 'Shake bushes on fall 8–11', note: 'Forager\'s needs 50, each Baked Berry Oatmeal needs 15.' }] },
  495: { name: 'Spring Seeds', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: 'Wild Horseradish + Daffodil + Leek + Dandelion · Foraging 1' }] },
  496: { name: 'Summer Seeds', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: 'Spice Berry + Grape + Sweet Pea · Foraging 4' }] },
  497: { name: 'Fall Seeds', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: 'Common Mushroom + Wild Plum + Hazelnut + Blackberry · Foraging 6' }] },
  498: { name: 'Winter Seeds', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: 'Winter Root + Crystal Fruit + Snow Yam + Crocus · Foraging 7' }] },
  'FlashShifter.StardewValleyExpandedCP_Baked_Berry_Oatmeal': { name: 'Baked Berry Oatmeal', mod: 'sve', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: '15 Salmonberry + 15 Blackberry + Sugar + Wheat Flour · recipe: the Bear, Secret Woods 12,500g', note: 'Five dishes = 75 of each berry.' },
  ] },
  224: { name: 'Spaghetti', mod: 'vanilla', how: [{ type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Tomato + Wheat Flour · recipe: Lewis mail at 3 hearts' }] },
  'Rafseazz.RSVCP_Kek_s_Style_Shortcake': { name: "Kek's Style Shortcake", mod: 'rsv', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Wheat Flour + Strawberry + Egg + Cherry Pluot · recipe: Malaya (Ridgeside)', note: 'Five dishes = 5 Cherry Pluots and 5 Strawberries.' },
  ] },
  Cornucopia_Tofu: { name: 'Tofu', mod: 'cornucopia', how: [{ type: 'artisan', seasons: ALL, where: ['Cheese Press'], text: '2 Soybeans → Cheese Press · 3.3 hours' }] },
  PrizeTicket: { name: 'Prize Ticket', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Pelican Town'], text: 'Help Wanted quests, some Special Orders', note: 'Available once Lewis introduces the Prize Machine.' }] },
  MysteryBox: { name: 'Mystery Box', mod: 'vanilla', how: [{ type: 'other', seasons: ALL, where: ['Anywhere'], text: 'Trees, rocks, fishing, monsters, artifact spots', note: 'They start dropping after the meteor letter early in year 1. Donate 5 unopened boxes.' }] },
  746: { name: 'Jack-O-Lantern', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: 'Pumpkin + Torch · recipe: Spirit\'s Eve shop 2,000g (Fall 27)' }] },
  772: { name: 'Oil of Garlic', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '10 Garlic + Oil · Combat 6', note: 'Garlic is a spring crop (Pierre, year 2+).' }] },
  874: { name: 'Bug Steak', mod: 'vanilla', how: [{ type: 'craft', seasons: ALL, where: ['Crafting'], text: '50 Bug Meat · Combat 1' }] },
  'Rafseazz.RSVCP_Sweet_Cranberry_Cheesecake': { name: 'Sweet Cranberry Cheesecake', mod: 'rsv', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Wheat Flour + Sugar + Cheese + 2 Cranberries + Northern Limequat · recipe: Faye mail at 8 hearts', note: 'Northern Limequat is a Ridgeside fruit tree.' },
  ] },
  604: { name: 'Plum Pudding', mod: 'vanilla', how: [{ type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Wheat Flour + Wild Plum + Sugar · recipe: Queen of Sauce, Winter 7 (Y1)', note: 'Wild Plum is fall forage.' }] },
  DriedFruit: { name: 'Dried Fruit', mod: 'vanilla', how: [{ type: 'artisan', seasons: ALL, where: ['Dehydrator'], text: '5 fruit of one kind (not grapes) → Dehydrator' }] },
  Powdermelon: { name: 'Powdermelon', mod: 'vanilla', how: [
    { type: 'crop', seasons: ['winter'], where: ['Farm'], text: 'Seeds: Mystery Boxes, Raccoon, winter artifact spots · 7 days', note: 'Not in Pierre\'s regular stock. Also at the Traveling Cart.', unsure: true },
    { type: 'forage', seasons: ['winter'], where: ['Highlands (SVE)'], text: 'Ground forage (SVE)' },
  ] },

  /* ---------------- The Missing ---------------- */
  'Rafseazz.RSVCP_Foxbloom': { name: 'Foxbloom', mod: 'rsv', how: [
    { type: 'forage', seasons: ALL, where: ['Aguar Cave (Ridgeside)'], text: 'Rare cave forage, dialogue-gated', note: 'Only spawns after a villager has told you about it.' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Void_Pebble': { name: 'Void Pebble', mod: 'sve', how: [
    { type: 'monster', seasons: ALL, where: ['Crimson Badlands (SVE)'], text: 'Monster loot', note: 'Late game area.', unsure: true },
    { type: 'artisan', seasons: ALL, where: ['Fish Pond'], text: 'Void Eel pond, 8+ fish · 6% daily chance' },
  ] },
  'Rafseazz.RSVCP_Matcha_Latte': { name: 'Matcha Latte', mod: 'rsv', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Coffee + Green Tea · recipe: Malaya, after Olga\'s special order' },
  ] },
  'FlashShifter.StardewValleyExpandedCP_Void_Delight': { name: 'Void Delight', mod: 'sve', how: [
    { type: 'cook', seasons: ALL, where: ['Kitchen'], text: 'Void Eel + 50 Void Essence + 20 Solar Essence · recipe: Krobus 10 hearts 5,000g', note: 'Chloe\'s shop (SVE) also sells the recipe for 35,000g.' },
  ] },
  Cornucopia_Watermelon: { name: 'Watermelon', mod: 'cornucopia', how: [{ type: 'crop', seasons: ['summer'], where: ['Farm'], text: 'Seeds: Pierre 150g (rare rotation) or Luau stall · 12 days', note: 'Gold quality ×5: Deluxe Fertilizer.' }] },
  Cornucopia_Peanut: { name: 'Peanut', mod: 'cornucopia', how: [{ type: 'crop', seasons: ['fall'], where: ['Farm'], text: 'Seeds: Pierre 30g · 20 days', note: 'Gold quality ×5: Deluxe Fertilizer, plant by fall 8.' }] },
};

/* ------------------------------------------------------------------------- */
/* Bundles (from content.json: name / reward / items / colour / required)     */
/* ------------------------------------------------------------------------- */

const Q = { 0: '', 1: 'silver', 2: 'gold', 3: 'iridium' };
const it = (id, qty = 1, q = 0) => ({ id: String(id), qty, q });

const ROOMS = [
  { id: 'pantry', name: 'Pantry', icon: '🥕', bundles: [
    { id: 'spring-crops', name: 'Spring Crops', reward: 'Bee House', need: 4, items: [it('Carrot'), it('FlashShifter.StardewValleyExpandedCP_Salal_Berry'), it('Cornucopia_Onion'), it(190)] },
    { id: 'summer-crops', name: 'Summer Crops', reward: 'Quality Sprinkler', need: 4, items: [it(256), it('SummerSquash'), it('Cornucopia_BellPepper'), it('FlashShifter.StardewValleyExpandedCP_Ancient_Fiber')] },
    { id: 'fall-crops', name: 'Fall Crops', reward: '5 Deluxe Fertilizer', need: 4, items: [it(278), it('Cornucopia_Olive'), it('Broccoli'), it(276)] },
    { id: 'quality-crops', name: 'Quality Crops', reward: 'Preserves Jar', need: 4, items: [it(24, 5, 2), it(258, 5, 2), it(280, 5, 2), it('Cornucopia_Rose', 5, 2)] },
    { id: 'rare-crops', name: 'Rare Crops', reward: 'Preserves Jar', need: 1, items: [it(454), it(417)] },
    { id: 'animal', name: 'Animal', reward: 'Cheese Press', need: 5, items: [it(186), it(182), it(174), it(438), it(440), it(442)] },
    { id: 'fish-farmers', name: "Fish Farmer's", reward: 'Worm Bin', need: 2, items: [it(812, 15), it(447, 15), it(172, 10)] },
    { id: 'garden', name: 'Garden', reward: '15 Mixed Flower Seeds', need: 4, items: [it('Cornucopia_Iris'), it(421), it('Cornucopia_BlueMist'), it('Cornucopia_Pansy'), it('Cornucopia_MorningGlory')] },
    { id: 'artisan', name: 'Artisan', reward: 'Soda Machine', need: 6, items: [it(350), it(342), it(344), it('Rafseazz.RSVCP_Cherry_Pluot'), it('Rafseazz.RSVCP_Mountain_Plumcot'), it('Rafseazz.RSVCP_Desert_Tangelo'), it('Rafseazz.RSVCP_Tropi_Ugli_Fruit'), it('Rafseazz.RSVCP_Paradise_Rangpur'), it(424), it(426), it(340), it('Cornucopia_Avocado')] },
    { id: 'brewers', name: "Brewer's", reward: 'Soda Machine', need: 4, items: [it(350), it(459), it('FlashShifter.StardewValleyExpandedCP_Aged_Blue_Moon_Wine'), it(303), it(614)] },
  ] },
  { id: 'fishtank', name: 'Fish Tank', icon: '🐟', bundles: [
    { id: 'river-fish', name: 'River Fish', reward: 'Recycling Machine', need: 4, items: [it('FlashShifter.StardewValleyExpandedCP_Butterfish'), it(143), it('Rafseazz.RSVCP_Harvester_Trout'), it('Rafseazz.RSVCP_Mountain_Redbelly_Dace')] },
    { id: 'lake-fish', name: 'Lake Fish', reward: '3 Crab Pots', need: 4, items: [it('FlashShifter.StardewValleyExpandedCP_Minnow'), it(698), it('Rafseazz.RSVCP_Pebble_Back_Crab'), it('Rafseazz.RSVCP_Crimson_Spiked_Clam')] },
    { id: 'ocean-fish', name: 'Ocean Fish', reward: '30 Deluxe Bait', need: 4, items: [it('FlashShifter.StardewValleyExpandedCP_Dulse_Seaweed'), it(131), it(150), it(701)] },
    { id: 'night-fishing', name: 'Night Fishing', reward: "5 Dish O' The Sea", need: 3, items: [it(148), it(132), it('Rafseazz.RSVCP_Cardia_Septal_Jellyfish')] },
    { id: 'specialty-fish', name: 'Specialty Fish', reward: 'Fishing Vest', need: 4, items: [it(156), it('Rafseazz.RSVCP_Fairytale_Lionfish'), it('FlashShifter.StardewValleyExpandedCP_Puppyfish'), it(734)] },
    { id: 'quality-fish', name: 'Quality Fish', reward: 'Fishing Vest', need: 4, items: [it(702, 1, 2), it('FlashShifter.StardewValleyExpandedCP_Grass_Carp', 1, 2), it('Rafseazz.RSVCP_Ridgeside_Bass', 1, 2), it(154, 1, 2)] },
    { id: 'master-fishers', name: "Master Fisher's", reward: 'Fishing Vest', need: 2, items: [it(149), it('Rafseazz.RSVCP_Golden_Rose_Fin'), it('FlashShifter.StardewValleyExpandedCP_Radioactive_Bass'), it(165)] },
    { id: 'crab-pot', name: 'Crab Pot', reward: 'Anchor', need: 6, items: [it(715), it(717), it(718), it(719), it(720), it(723), it(716), it(721), it(722), it(169)] },
  ] },
  { id: 'crafts', name: 'Crafts Room', icon: '🌿', bundles: [
    { id: 'spring-foraging', name: 'Spring Foraging', reward: '15 Basic Fertilizer', need: 4, items: [it('Rafseazz.RSVCP_Ridge_Azorean_Flower'), it('Rafseazz.RSVCP_Ridge_Cherry'), it('FlashShifter.StardewValleyExpandedCP_Big_Conch'), it(22)] },
    { id: 'summer-foraging', name: 'Summer Foraging', reward: 'Rain Totem', need: 3, items: [it('Rafseazz.RSVCP_Mountain_Chico'), it('Cornucopia_Raspberry'), it('FlashShifter.StardewValleyExpandedCP_Dried_Sand_Dollar')] },
    { id: 'fall-foraging', name: 'Fall Foraging', reward: 'Tapper', need: 4, items: [it('Rafseazz.RSVCP_Summit_Snowbell'), it(408), it('Rafseazz.RSVCP_Autumn_Drop_Berry'), it('FlashShifter.StardewValleyExpandedCP_Mushroom_Colony')] },
    { id: 'winter-foraging', name: 'Winter Foraging', reward: 'Furnace', need: 4, items: [it('Rafseazz.RSVCP_Frost_Clump_Berry'), it('Rafseazz.RSVCP_Sierra_Wintergreen'), it('FlashShifter.StardewValleyExpandedCP_Bearberrys'), it(418)] },
    { id: 'construction', name: 'Construction', reward: 'Charcoal Kiln', need: 4, items: [it(388, 99), it(322, 50), it(390, 99), it(709, 10)] },
    { id: 'sticky', name: 'Sticky', reward: 'Charcoal Kiln', need: 3, items: [it(92, 100), it(330), it(724), it(766, 10)] },
    { id: 'forest', name: 'Forest', reward: 'Charcoal Kiln', need: 3, items: [it('Moss', 10), it(771, 200), it(309, 10), it(310, 10)] },
    { id: 'exotic-foraging', name: 'Exotic Foraging', reward: 'Apricot Sapling', need: 5, items: [it(78), it(725), it(726), it(422), it('Rafseazz.RSVCP_Lava_Lily'), it(88), it(90), it(724)] },
    { id: 'wild-medicine', name: 'Wild Medicine', reward: 'Apricot Sapling', need: 3, items: [it('Rafseazz.RSVCP_Mountain_Mistbloom', 5), it(259, 5), it('FlashShifter.StardewValleyExpandedCP_Smelly_Rafflesia', 5), it(260, 5)] },
  ] },
  { id: 'boiler', name: 'Boiler Room', icon: '⛏️', bundles: [
    { id: 'blacksmiths', name: "Blacksmith's", reward: '5 Omni Geodes', need: 3, items: [it(334), it(335), it(336)] },
    { id: 'geologists', name: "Geologist's", reward: 'Small Glow Ring', need: 4, items: [it(80), it(86), it(84), it(82)] },
    { id: 'adventurers', name: "Adventurer's", reward: 'Small Magnet Ring', need: 2, items: [it(766, 99), it(767, 10), it(881, 10), it(769), it('Rafseazz.RSVCP_Spiritual_Essence', 10)] },
    { id: 'treasure-hunters', name: "Treasure Hunter's", reward: '3 Artifact Troves', need: 5, items: [it(72), it(60), it(64), it(68), it(66), it(62)] },
    { id: 'engineers', name: "Engineer's", reward: 'Lightning Rod', need: 3, items: [it(286), it(287), it(288)] },
  ] },
  { id: 'vault', name: 'Vault', icon: '💰', bundles: [
    { id: 'vault-2500', name: '2,500g', reward: 'Upright Piano', need: 1, items: [it('gold-2500')] },
    { id: 'vault-5000', name: '5,000g', reward: 'Golden Skull Coral', need: 1, items: [it('gold-5000')] },
    { id: 'vault-10000', name: '10,000g', reward: 'Navy Tuxedo', need: 1, items: [it('gold-10000')] },
    { id: 'vault-25000', name: '25,000g', reward: 'Aged Blue Moon Wine', need: 1, items: [it('gold-25000')] },
  ] },
  { id: 'bulletin', name: 'Bulletin Board', icon: '📌', bundles: [
    { id: 'chefs', name: "Chef's", reward: 'Tea Set', need: 6, items: [it('Cornucopia_OliveOil'), it('FlashShifter.StardewValleyExpandedCP_Glazed_Butterfish'), it(605), it(733), it('FlashShifter.StardewValleyExpandedCP_Big_Bark_Burger'), it('Rafseazz.RSVCP_Pink_Frosted_Sprinkled_Doughnut')] },
    { id: 'field-research', name: 'Field Research', reward: 'Dinosaur Egg', need: 4, items: [it(587), it('FlashShifter.StardewValleyExpandedCP_Mushroom_Berry_Rice'), it('Rafseazz.RSVCP_Pillowsoft_Cheezy_Sandwich'), it(392)] },
    { id: 'enchanters', name: "Enchanter's", reward: 'Stardrop Tea', need: 4, items: [it(446), it('FlashShifter.StardewValleyExpandedCP_Frog'), it('DriedMushrooms'), it(773)] },
    { id: 'dye', name: 'Dye', reward: 'Clothes Line', need: 6, items: [it(444), it(814), it(397), it(284), it('Cornucopia_Chrysanthemum'), it('Cornucopia_CottonBoll', 5)] },
    { id: 'fodder', name: 'Fodder', reward: 'Void Egg', need: 3, items: [it('FlashShifter.StardewValleyExpandedCP_Dulse_Seaweed'), it('Rafseazz.RSVCP_Ridge_Wild_Apple', 3), it('Cornucopia_Soybeans')] },
    { id: 'childrens', name: "Children's", reward: 'Plush Bunny', need: 3, items: [it(103), it('FlashShifter.StardewValleyExpandedCP_Mixed_Berry_Pie'), it('Rafseazz.RSVCP_Highland_Ice_Cream'), it('TentKit')] },
    { id: 'foragers', name: "Forager's", reward: '30 Magic Bait', need: 3, items: [it(296, 50), it(410, 50), it(495), it(496), it(497), it(498)] },
    { id: 'home-cooks', name: "Home Cook's", reward: '5 Cookout Kits', need: 3, items: [it('FlashShifter.StardewValleyExpandedCP_Baked_Berry_Oatmeal', 5), it(224, 5), it('Rafseazz.RSVCP_Kek_s_Style_Shortcake', 5), it('Cornucopia_Tofu')] },
    { id: 'helpers', name: "Helper's", reward: 'Treasure Totem', need: 2, items: [it('PrizeTicket'), it('MysteryBox', 5)] },
    { id: 'spirits-eve', name: "Spirit's Eve", reward: 'Wizard Study (wallpaper)', need: 3, items: [it(746), it(772), it(874)] },
    { id: 'winter-star', name: 'Winter Star', reward: 'Golden Mystery Box', need: 2, items: [it('Rafseazz.RSVCP_Sweet_Cranberry_Cheesecake'), it(604), it('DriedFruit'), it('Powdermelon', 5)] },
  ] },
  { id: 'missing', name: 'Abandoned JojaMart', icon: '🎬', bundles: [
    { id: 'the-missing', name: 'The Missing', reward: 'Movie Theater', need: 5, items: [it('Rafseazz.RSVCP_Foxbloom'), it('FlashShifter.StardewValleyExpandedCP_Void_Pebble'), it('Rafseazz.RSVCP_Matcha_Latte'), it('FlashShifter.StardewValleyExpandedCP_Void_Delight'), it('Cornucopia_Watermelon', 5, 2), it('Cornucopia_Peanut', 5, 2)] },
  ] },
];
