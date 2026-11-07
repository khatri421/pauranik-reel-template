# Art library (pick fast)

Picture of everything: [docs/library.png](docs/library.png) (re-make it with `npm run library` after adding art).

## Characters: `<Figure kind="..." p={pose({...})} x={...} y={FLOOR} s={1} prop="..." flip? />`
Defined in `src/art/Rig.tsx` (`SPEC` table). All face right; `flip` makes them face left.

| kind | Kaun | Default look / best prop |
|---|---|---|
| `ram` | Shri Ram | blue skin, tall gold mukut, saffron dhoti, quiver - `bow` |
| `lakshman` | Lakshman | fair skin, gold mukut, green dhoti, quiver - `bow` |
| `sita` | Sita Mata | red blouse, yellow saree, tiara, bun, bindi, nath - hands `namaste` |
| `hanuman` | Hanuman ji | orange, cream muzzle, tail, gold crown - `mace` |
| `ravan` | Ravan | dark skin, 5 visible heads, spiky crown, mustache - `sword` |
| `shiv` | Mahadev | pale blue, jata with moon and Ganga, snake, tripundra - `trishul` |
| `krishna` | Shri Krishna | blue, peacock feather crown, yellow dhoti - `flute` |
| `arjun` | Arjun | red top, gold crown, quiver - `bow` |
| `devi` | Devi (Lakshmi/Durga/Parvati) | red saree, tall mukut, golden halo - `lotus` (or `trishul` for Durga) |
| `rishi` | Rishi / muni | white beard and hair bun, saffron, tripundra - `staff` |
| `raja` | Koi bhi raja | maroon top, gold crown, mustache - `sword` |
| `sainik` | Sainik / soldier | steel helmet, grey armour, mustache - `spear` or `sword` |
| `surya` | Surya dev | sun-ray crown, red dhoti - `lotus` |
| `satrajit` | Raja Satrajit / nobleman | orange turban |
| `prasen` | Prasen / young noble | red turban, green top |
| `ugrasen` | Old king | white beard, gold crown |
| `folk1` | Gaon wala | yellow turban, green top |
| `folk2` | Buzurg gaon wala | white turban, beard |
| `bear` | Jambavan | bear, gold crown, white beard - `mace` |
| `cub` | Bhalu baccha | small red dhoti bear |
| `nurse` | Bhalu maa | bear with maroon scarf |

Props: `bow`, `mace`, `flute`, `mani` (glowing gem), `trishul`, `sword`, `spear`, `staff`, `lotus`, `none`.
Poses (in Rig.tsx): `STAND`, `KNEEL`, `SIT`, `NAMASTE`, `BLESS`, `POINT`, `STOP`, `walk(phase)`; blend with `mix(a, b, k)`.
Pose fields: `armF/armB` [shoulder, elbow] degrees, `legF/legB`, `lean`, `neck`, `hand` ('open'|'namaste'|'bless'|'fist'), `mouth` (pass `talk`), `smile`, `blink`, `scream`.
Other props on Figure: `glow` (0..1 golden glow on the chest).

### New character banana
Add one line to `Kind`, `KINDS` and `SPEC` in `src/art/Rig.tsx`. Spec options: `skin, skin2, cloth, cloth2, border, top` colours,
`crown` ('ram'|'krishna'|'king'|'turban'|'surya'|'tiara'|'devi'|'ravan'|'jata'|'rishi'|'helmet'|'bear'|'scarf'|'none'),
`hair` ('long'|'short'), `hairColor`, `female`, `monkey`, `mustache`, `beard`, `heads`, `quiver`, `snake`, `tilak` ('line'|'tripundra'|'none'), `halo`, `body: 'bear'` (use `...BEAR`).
Then add a row to this table and run `npm run library`.

## Backgrounds: `<Scene><Jungle t={t} /> ...figures... </Scene>`
Defined in `src/art/Backgrounds.tsx`. Characters stand at `FLOOR` (y = 1700).

| Component | Jagah |
|---|---|
| `Jungle` | Van / jungle: hills, folk trees, green ground |
| `Mahal` | Raj darbar: maroon wall, gold pillars, toran, throne (`throne={false}` to hide) |
| `YuddhBhoomi` | Yuddh-bhoomi at dusk: red sun, flags, arrows, embers |
| `Samudra` | Samudra kinara: sea scrolls, sand, sun, cloud |
| `Lanka` | Golden Lanka fort across the sea (`fire={1}` = Lanka dahan, night) |
| `Devlok` | Devlok / aasmaan: rays, clouds, golden palace, cloud floor |
| `Gufa` | Gufa ke andar: red rock arches (`dark={0.5}` darker) |
| `Gaon` | Gaon: mud huts, tree, kuan, hills |
| `Dwarka` | Dwarka nagri on the sea at sunrise |

Pieces to build your own (`src/art/World.tsx`, `src/art/Props.tsx`, `src/art/Backgrounds.tsx`):
`Paper tint`, `Ground y colors`, `Sea y`, `Sun`, `Moon`, `Cloud`, `Hills`, `Hut`, `Tree`, `Rock`, `Flag`, `Arrow`, `Embers`, `Feather`, `FallenCrown`,
`LankaFort`, `DwarkaCity`, `SkyPalace`, `ScalePattern` (indigo close-up backdrop), `Court`, `Throne`, `CaveHill`, `CaveInside`,
`Lion`, `Horse`, `Mani` (big gem), `Coins`, `Bubble` (speech bubble), `Scuffle` (dust cloud that hides a fight), `Paw`.
