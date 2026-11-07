# Mythology Reel Studio (sirf phone se)

Apni voice + apni script do → **koi bhi Ramayan / Mahabharat / Puran ki katha** ka folk-painting style
animated reel ban jaata hai: 1080x1920, Hinglish subtitles shabd-dar-shabd, characters ka muh awaaz ke saath hilta hai.

Sab kuch **phone se**: github.com (browser) + Claude app ka **Code** tab. Laptop nahi chahiye.

![Characters aur backgrounds](docs/library.png)

---

## Kya chahiye

| Cheez | Kitne ka |
|---|---|
| Claude **Pro** plan (Code tab ke liye) | ~₹2,000 / mahina |
| GitHub account | Free |
| Phone: Claude app (Android / iPhone) + Chrome browser | Free |
| Apni voiceover mp3 (khud record ki ya AI voice) | — |

> Sirf apni likhi script aur apni / licensed voice use karo. Kisi aur creator ki audio, script ya art copy mat karo.

---

## Ek baar ka setup (10 min)

1. **GitHub account:** phone ke Chrome me **github.com** → **Sign up** → email verify.
2. **Apni copy banao:** is repo ke page par **Use this template** → **Create a new repository** → naam (jaise `my-reels`) → **Private** → **Create repository**.
3. **Claude ko GitHub ki permission do:** Chrome me **github.com/apps/claude** kholo → **Install** (ya **Configure**) → apni `my-reels` repo chuno → **Save**.
   *(Yeh step zaroori hai, warna Code tab me repo dikhegi hi nahi.)*
4. **Claude app** → neeche **Code** tab → GitHub connect karo → `my-reels` repo chuno.
   Environment me **kuch bhi mat badlo**: koi setup script nahi, network default rehne do.
   ffmpeg wagairah Claude khud `setup.sh` se install kar leta hai.

---

## Har naye reel ke liye

### A. Voice aur script upload karo (github.com, phone browser)
1. Reel ka ek naam socho, jaise `hanuman-lanka` (chhote English akshar aur `-` best hain; galti ho gayi to Claude khud theek kar dega).
2. **Pehle script:** repo me **Add file → Create new file** → naam wale box me likho `reels/hanuman-lanka/script.txt`
   (`/` likhte hi folder ban jaata hai) → script likho → **Commit changes**.
3. **Phir voice:** `reels/hanuman-lanka` folder kholo → **Add file → Upload files** → ElevenLabs se download ki hui audio chuno → **Commit changes**.
   File ka naam badalne ki zaroorat **nahi** (.mp3 .m4a .wav .aac .ogg .opus sab chalega). Bas folder me **ek hi** audio file ho.

**script.txt ke rules:**
- **Roman Hinglish** me likho (subtitles yahin se aate hain). ElevenLabs me aap Devanagari wala version daal sakte ho, koi dikkat nahi.
- **Har line = voice ka ek phrase** (jahan awaaz rukti hai).
- **Khaali line = naya scene.** Ek scene me 1-2 lines (2-3 second) best hai.
- Pehli line `#` se shuru ho to woh upar chhota title banti hai.

```
# HANUMAN · LANKA DAHAN
Jab Hanuman ji Lanka pahunche,

Ravan ne unki poonch mein
aag lagwa di.

Par Hanuman ji muskuraaye...

aur poori Lanka jal uthi!
```

### B. Claude app → Code tab → apni repo → yeh message bhejo
```
hanuman-lanka ka reel banao
```
Claude khud: script padhega → har line ke liye naye scenes banayega → **15 second ka preview** banayega → push karega
→ aapko batayega file kahan hai.

### C. Preview dekho
github.com → repo → `reels/hanuman-lanka/preview.mp4` → **⋯ → Download**.
Pasand aaya to Claude ko likho: **`OK, full reel banao`**. Kuch badalna ho to seedha bolo (neeche dekho).

### D. Full reel download
`reels/hanuman-lanka/reel.mp4` → Download → gallery → Instagram par post.

> Claude batayega kis **branch** par push kiya. Agar file na dikhe to repo me upar branch dropdown (`main`) se woh branch chuno.

---

## Badlav ke liye Claude se aise bolo
- "Scene 3 mein Hanuman ko udte hue dikhao"
- "Ravan ko mahal mein singhasan par bithao"
- "Subtitle thoda bada karo"
- "Naya character banao: Vibhishan" → library me save ho jaata hai, agli baar bhi milega
- "Purane preview.mp4 delete karo, repo bhari ho gayi"

## Library (pehle se bane characters aur jagah)
Ram, Lakshman, Sita, Hanuman, Ravan, Shiv, Krishna, Arjun, Devi, Rishi, Raja, Sainik, Surya, Jambavan aur aur bhi.
Jagah: jungle, mahal, yuddh-bhoomi, samudra, Lanka, devlok, gufa, gaon, Dwarka.
Poori list: [LIBRARY.md](LIBRARY.md) · Tasveer: [docs/library.png](docs/library.png)

## Example
`reels/example/` me ek demo hai (awaaz ki jagah sirf "hum" sound, test ke liye):
`npm run preview -- example` aur `npm run reel -- example`.

---

## Problem aaye to
| Dikkat | Kya karein |
|---|---|
| Code tab me repo nahi dikhti | github.com/apps/claude → Configure → repo ko access do |
| Claude "environment update" ki permission maange | **Mana karo.** Likho: "environment mat badlo, bash setup.sh chalao" |
| `koi audio file nahi mili` | Audio `reels/<naam>/` folder ke andar upload karo (script.txt ke saath) |
| `audio files hain ... sirf ek rakho` | Folder me purani audio delete karo, ya Claude ko bolo kaunsi rakhni hai |
| Naam me space / capital | Claude khud folder ka naam theek kar dega, bas bata dega naya naam |
| Subtitle aage-peeche | script.txt me har phrase alag line par likho (jahan voice rukti hai) |
| Push fail: file too large | Voice 60-90 second se chhoti rakho |

---

## Commands (Claude ke liye)
| Command | Kya karta hai |
|---|---|
| `npm run preview -- <naam>` | `reels/<naam>/preview.mp4` (pehle 15 s) |
| `npm run reel -- <naam>` | `reels/<naam>/reel.mp4` (poora) |
| `npm run library` | `docs/library.png` dobara banata hai |
| `bash setup.sh` | ffmpeg + npm packages (dono commands khud chala lete hain) |

Rules for Claude: [CLAUDE.md](CLAUDE.md). Scenes: `src/reels/<naam>.tsx`. Art: `src/art/`.
