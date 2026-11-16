const fs = require('fs');
const path = require('path');

// Read the parsed data from scripts/parseAndBuild.js
const { execSync } = require('child_process');

const csvRaw = fs.readFileSync('scripts/parseAndBuild.js', 'utf8');

// Condition Spanish translation dictionary
const conditionTranslations = {
  'Working good': { label: 'Funciona bien / Buen estado estético', code: 'works_perfect' },
  'Working good cosmetic': { label: 'Funciona bien con cosmética cuidada', code: 'works_perfect' },
  'Working no yellowing/cracks': { label: 'Funciona bien sin grietas ni amarilleo', code: 'works_perfect' },
  'Working no yellowing': { label: 'Funciona bien sin amarilleo', code: 'works_perfect' },
  'Working yellowed': { label: 'Funciona bien pero con carcasa amarilleada', code: 'works_cosmetic_damage' },
  'Working yellowed/discolored': { label: 'Funciona bien pero con decoloración o amarilleo', code: 'works_cosmetic_damage' },
  'Working yellowing no cracks': { label: 'Funciona bien con amarilleo (sin grietas)', code: 'works_cosmetic_damage' },
  'Working cracks no yellowing': { label: 'Funciona bien con fisuras/grietas (sin amarilleo)', code: 'works_cosmetic_damage' },
  'Working yellowing and cracks': { label: 'Funciona bien pero con amarilleo y grietas', code: 'works_cosmetic_damage' },
  'Working cracked corners': { label: 'Funciona bien pero con esquinas cuarteadas/rotas', code: 'works_cosmetic_damage' },
  'Working cracked housing': { label: 'Funciona bien pero con carcasa cuarteada', code: 'works_cosmetic_damage' },
  'Working cracked shell': { label: 'Funciona bien pero con carcasa cuarteada/rota', code: 'works_cosmetic_damage' },
  'Working heavy scratches': { label: 'Funciona bien pero con rayones profundos/visibles', code: 'works_cosmetic_damage' },
  'Heavy scratches': { label: 'Funciona pero con rayones profundos/visibles', code: 'works_cosmetic_damage' },
  'Cracked shell': { label: 'Funciona pero con carcasa rota o cuarteada', code: 'works_cosmetic_damage' },
  'Broken hinge': { label: 'Bisagra rota o floja (pantalla suelta)', code: 'has_functional_problems' },
  'Powers on but does not load games': { label: 'Enciende pero no lee/carga cartuchos', code: 'has_functional_problems' },
  'Powers on but does not read discs': { label: 'Enciende pero no lee discos (láser agotado)', code: 'has_functional_problems' },
  'Powers on no video': { label: 'Enciende pero sin señal de video ni imagen', code: 'has_functional_problems' },
  'Powers on no picture/video': { label: 'Enciende pero sin imagen ni video', code: 'has_functional_problems' },
  'Picture works no sound': { label: 'Da imagen en pantalla pero sin sonido/audio', code: 'has_functional_problems' },
  'Does not read discs': { label: 'No lee discos ópticos', code: 'has_functional_problems' },
  'Disc tray malfunction': { label: 'Bandeja de discos trabada o no abre/cierra', code: 'has_functional_problems' },
  'Disc lid malfunction': { label: 'Tapa superior de discos rota o no traba', code: 'has_functional_problems' },
  'Disc tray/lid does not operate properly': { label: 'Bandeja o tapa de discos no opera correctamente', code: 'has_functional_problems' },
  'No sound': { label: 'Sin sonido / bocina integrada dañada', code: 'has_functional_problems' },
  'Missing/damaged faceplate': { label: 'Carátula frontal faltante o dañada', code: 'has_functional_problems' },
  'Missing/damaged character decorations': { label: 'Decoraciones/figuras del personaje faltantes o rotas', code: 'has_functional_problems' },
  'Pikachu nose/power button missing/damaged': { label: 'Nariz de Pikachu / botón de encendido roto o faltante', code: 'has_functional_problems' },
  'Camera not functioning': { label: 'Cámara integrada no funciona', code: 'has_functional_problems' },
  'Circle Pad/3D slider or C-Stick not working': { label: 'Circle Pad, slider 3D o C-Stick no responde', code: 'has_functional_problems' },
  'Buttons/shoulder triggers not working': { label: 'Botones o gatillos laterales (L/R) no responden', code: 'has_functional_problems' },
  'Battery does not hold charge': { label: 'Batería agotada / no retiene carga', code: 'has_functional_problems' },
  'Missing vertical screen lines': { label: 'Líneas verticales faltantes en pantalla LCD', code: 'has_functional_problems' },
  'Damaged top screen': { label: 'Pantalla superior dañada / rota', code: 'has_functional_problems' },
  'Damaged bottom screen': { label: 'Pantalla inferior dañada / rota', code: 'has_functional_problems' },
  'Unresponsive touchscreen': { label: 'Digitalizador / pantalla táctil no responde', code: 'has_functional_problems' },
  'Damaged screen': { label: 'Pantalla LCD dañada / rota o con manchas', code: 'does_not_work' },
  'Does not turn on': { label: 'No enciende en absoluto', code: 'does_not_work' },
  'Battery compartment corrosion': { label: 'Corrosión/sulfato en compartimiento de pilas', code: 'for_parts_only' }
};

// Accessory translation and key mapping
const accessoryKeyMap = {
  'OEM N64 controller': { key: 'extra_controller', label: 'Control original N64 adicional' },
  'OEM power adapter': { key: 'power_adapter', label: 'Adaptador de corriente / Eliminador original' },
  'OEM AV cable': { key: 'av_cable', label: 'Cable de Audio/Video AV original' },
  'Expansion Pak': { key: 'expansion_pak', label: 'Expansion Pak original (Memoria 4MB N64)' },
  'Jumper Pak': { key: 'jumper_pak', label: 'Jumper Pak original N64' },
  'Wii Remote': { key: 'wii_remote', label: 'Control Wii Remote oficial' },
  'Nunchuk': { key: 'nunchuk', label: 'Nunchuk oficial' },
  'Power adapter': { key: 'power_adapter', label: 'Adaptador de corriente / Eliminador original' },
  'AV cable': { key: 'av_cable', label: 'Cable de Audio/Video AV original' },
  'Sensor bar': { key: 'sensor_bar', label: 'Barra sensora original Wii' },
  'OEM controller': { key: 'extra_controller', label: 'Control original adicional oficial' },
  'RF switch/cable': { key: 'rf_switch', label: 'Cable / Conmutador RF original' },
  'RF cable if applicable (no native RF output)': { key: 'rf_cable', label: 'Cable RF / Adaptador si aplica' },
  'OEM dogbone controller': { key: 'dogbone_controller', label: 'Control original tipo Hueso de Perro (Dogbone)' },
  'OEM battery cover': { key: 'battery_cover', label: 'Tapa de pilas original oficial' },
  'OEM link cable': { key: 'link_cable', label: 'Cable Game Link original' },
  'OEM charger': { key: 'charger', label: 'Cargador original oficial' },
  'OEM interchangeable faceplate': { key: 'faceplate', label: 'Carátula frontal intercambiable original Micro' },
  'OEM stylus': { key: 'stylus', label: 'Lápiz táctil Stylus original' },
  'OEM interchangeable cover plates, complete pair': { key: 'cover_plates', label: 'Juego de carátulas Cover Plates intercambiables originales' },
  'Matching OEM controller': { key: 'matching_controller', label: 'Control original del color/edición a juego' },
  'Matching OEM Pikachu controller': { key: 'matching_pikachu_controller', label: 'Control original Pikachu edición especial a juego' },
  'OEM power cable': { key: 'power_cable', label: 'Cable de corriente original' },
  'OEM memory card': { key: 'memory_card', label: 'Memory Card original oficial' },
  'Original Sony PSone LCD screen fully working': { key: 'psone_lcd_screen', label: 'Pantalla portátil LCD original Sony PSone funcionando' },
  'OEM DualShock 2 controller': { key: 'dualshock2_controller', label: 'Control DualShock 2 original oficial' },
  'OEM 8MB memory card': { key: 'memory_card_8mb', label: 'Tarjeta de memoria oficial 8MB' },
  'OEM network adapter': { key: 'network_adapter', label: 'Adaptador de red Ethernet/HDD oficial PS2' },
  'OEM external power adapter SCPH-7000x': { key: 'power_adapter_7000x', label: 'Eliminador de corriente externo oficial SCPH-7000x' },
  'OEM power cable SCPH-9000x': { key: 'power_cable_9000x', label: 'Cable de corriente directo oficial SCPH-9000x' },
  'OEM Light Phaser working': { key: 'light_phaser', label: 'Pistola de luz Light Phaser original funcionando' },
  'OEM 3-button controller': { key: 'controller_3button', label: 'Control de 3 botones original oficial Sega' },
  'OEM 6-button controller': { key: 'controller_6button', label: 'Control de 6 botones original oficial Sega' },
  'OEM Model 1 power adapter': { key: 'model1_power_adapter', label: 'Eliminador oficial Sega Model 1' },
  'OEM Model 1 AV cable': { key: 'model1_av_cable', label: 'Cable AV oficial Sega Model 1' },
  'OEM Model 2 power adapter': { key: 'model2_power_adapter', label: 'Eliminador oficial Sega Model 2' },
  'OEM Model 2 AV cable': { key: 'model2_av_cable', label: 'Cable AV oficial Sega Model 2' },
  'OEM RF cable': { key: 'rf_cable', label: 'Cable RF original oficial' },
  'OEM standard controller': { key: 'saturn_controller', label: 'Control estándar oficial Sega Saturn' },
  'OEM 3D Control Pad': { key: 'saturn_3d_pad', label: 'Control 3D Control Pad analógico oficial (Saturn)' },
  'OEM backup memory cartridge': { key: 'saturn_backup_cart', label: 'Cartucho de memoria de respaldo oficial Saturn' },
  'VMU': { key: 'dreamcast_vmu', label: 'Tarjeta de memoria VMU con pantalla LCD original' },
  'Vibration pack': { key: 'dreamcast_jump_pack', label: 'Jump Pack / Paquete de vibración original' },
  'Power cable': { key: 'power_cable', label: 'Cable de corriente original' },
  'OEM Controller S': { key: 'controller_s', label: 'Control Controller S original oficial (Xbox)' },
  'OEM Duke controller': { key: 'controller_duke', label: 'Control Duke clásico grande original oficial (Xbox)' },
  'OEM DVD playback kit': { key: 'dvd_kit', label: 'Kit de reproducción de DVD con receptor y control original' },
  'Working original built-in DVD player (only DVD-equipped models)': { key: 'dvd_working', label: 'Reproductor DVD integrado original funcionando' },
  'Broken original built-in DVD player (if applicable)': { key: 'dvd_broken', label: 'Reproductor DVD integrado con falla' },
  'Matching OEM remote': { key: 'matching_remote', label: 'Control remoto temático original correspondiente' },
  'Original detachable power cord (if applicable)': { key: 'detachable_power_cord', label: 'Cable de corriente desmontable original' }
};

// Image filename mapping
const imageMapping = {
  'Nintendo 64 Standard': 'Nintendo 64 console.jpg',
  'GameCube': 'Nintendo gamecube consoles.png',
  'Wii Original': 'Nintendo wii console_.webp',
  'NES Front Loader': 'nes console.webp',
  'SNES Original': 'super nintendo snes console.jpg',
  'SNES Jr SNES-101': 'super nintendo snes console.jpg',
  'NES Top Loader NES-101': 'Nintendo nes top loader.jpg',
  'Game Boy DMG-01': 'Nintendo gameboy.jpg',
  'Game Boy Pocket MGB-001': 'Nintendo gameboy pocket_.jpg',
  'Game Boy Color CGB-001': 'Nintendo Gameboy color.jpg',
  'Game Boy Advance AGB-001': 'gameboy advance_.png',
  'GBA SP AGS-001': 'Nintendo gameboy advance sp model 001.png',
  'GBA SP AGS-101': 'Nintendo gameboy advance sp model 101.jpg',
  'Game Boy Micro OXY-001': 'Nintendo gameboy micro_.jpg',
  'Nintendo DS NTR-001': 'Nintendo ds fat.jpg',
  'Nintendo DS Lite USG-001': 'Nintendo ds lite.jpg',
  'Nintendo DSi TWL-001': 'Nintendo dsi.png',
  'Nintendo DSi XL UTL-001': 'Nintendo dsi xl.jpg',
  'Nintendo 3DS CTR-001': 'Nintendo 3ds original_.jpg',
  'Nintendo 3DS XL SPR-001': 'Nintendo 3ds xl original 2012.jpg',
  'Nintendo 2DS FTR-001': 'Nintendo 2ds xl.jpg',
  'New Nintendo 3DS KTR-001': 'Nintendo 3ds original_.jpg',
  'New Nintendo 3DS XL RED-001': 'Nintendo 3ds xl original 2012.jpg',
  'New Nintendo 2DS XL JAN-001': 'Nintendo 2ds xl.jpg',
  'Nintendo 64 Funtastic Jungle Green': 'Nintendo 64 jungle green.jpg',
  'Nintendo 64 Funtastic Ice Blue': 'Nintendo 64 Ice blue.jpg',
  'Nintendo 64 Funtastic Grape Purple': 'Nintendo 64 grape purple.jpg',
  'Nintendo 64 Funtastic Fire Orange': 'Nintendo 64 fire orange.jpg',
  'Nintendo 64 Funtastic Watermelon Red': 'Nintendo 64 watermelon red.jpg',
  'Nintendo 64 Funtastic Smoke Black': 'Nintendo 64 smoke_.jpg',
  'Nintendo 64 Pikachu Blue/Yellow': 'Nintendo 64 pikachu console_.jpg',
  'PlayStation PS1 Original': 'Playstation 1 slim.jpg',
  'PSone Slim': 'Playstation 1 slim.jpg',
  'PS2 Fat': 'Playstation 2 fat.jpg',
  'PS2 Slim': 'Playstation 2 slim.jpg',
  'Master System Model 1': 'sega master system 1.jpg',
  'Master System II': 'sega master system 2.jpg',
  'Genesis Model 1': 'sega genesis model 1.jpg',
  'Genesis Model 2': 'sega genesis model 1.jpg',
  'Saturn': 'sega Saturn.jpg',
  'Dreamcast': 'sega dreamcast.jpg',
  'Original Xbox Standard Black': 'Microsoft original xbox_.jpg',
  'Original Xbox Crystal': 'Microsoft Xbox crystal version_.jpg',
  'Original Xbox Halo Green': 'Microsoft Xbox halo green.jpg',
  'Original Xbox Blue Translucent': 'Microsoft Xbox blue edition_.jpg',
  'Original Xbox Mountain Dew Green': 'Microsoft Xbox mountain dew edition_.jpg',
  'Winnie the Pooh': 'winnie the pooh crt tv.jpg',
  'Batman': 'batman crt tv.jpg',
  'Disney Pixar Cars': 'Disney_s cars crt tv.jpg',
  'SpongeBob SquarePants': 'SpongeBob squarepants crt tv.jpg',
  'Mickey Mouse': 'mickey mouse crt tv.jpg',
  'Disney Princess': 'disney princess crt tv.jpg',
  'Hello Kitty': 'hello kitty crt tv.jpg',
  'Teenage Mutant Ninja Turtles': 'teenage mutant ninja turtles crt tv.jpg',
  'Spider-Man': 'spiderman crt tv.jpg',
  'Dora the Explorer': 'dora the explorer crt tv.jpg',
  'Shrek': 'shrek crt tv.jpg'
};

// IDs mapping for stability
function makeId(category, model) {
  if (model === 'Nintendo 64 Standard') return 'n64-original';
  if (model === 'GameCube') return 'nintendo-gamecube';
  if (model === 'Wii Original') return 'nintendo-wii';
  if (model === 'NES Front Loader') return 'nes-original';
  if (model === 'SNES Original') return 'snes-original';
  if (model === 'Game Boy DMG-01') return 'gameboy-original';
  if (model === 'PlayStation PS1 Original') return 'ps1-original';
  if (model === 'PSone Slim') return 'ps1-slim';
  if (model === 'PS2 Fat') return 'ps2-original';
  if (model === 'PS2 Slim') return 'ps2-slim';
  if (model === 'Original Xbox Standard Black') return 'xbox-original';
  if (model === 'Dreamcast') return 'sega-dreamcast';
  if (model === 'Genesis Model 1') return 'sega-genesis';
  if (model === 'Saturn') return 'sega-saturn';

  return (category.slice(0, 3) + '-' + model)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

console.log('Building script loaded successfully.');
module.exports = {
  conditionTranslations,
  accessoryKeyMap,
  imageMapping,
  makeId
};
