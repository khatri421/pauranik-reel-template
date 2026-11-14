# Saare prompts (copy karne ke liye)

Har box ke upar right mein **copy** ka button hai (phone par bhi). Copy karo, Claude app mein paste karo, aur `[ ]` wala hissa apne hisaab se badlo (jaise `karna-kavach` ki jagah apni reel ka naam).

Ye wahi prompts hain jo guide "AI Se Viral Pauranik Reels" mein hain. Kahan bhejna hai (normal chat ya Code tab) har prompt ke upar likha hai.

## PROMPT · MADAD MAANGNE KE LIYE
**Kahan:** Claude app ki normal chat mein

```text
Ye meri reel banane wali guide hai. Main bilkul beginner hoon aur mujhe English kam aati hai.
Page 12 ka Step 3 samajh nahi aaya. Mujhe bahut aasaan Hinglish mein,
ek-ek karke samjhao ki kya dabana hai. Agar screenshot chahiye to mujhse maang lo.
```

## PROMPT · PC SETUP (SIRF EK BAAR)
**Kahan:** Code tab mein paste karo

```text
Main Instagram ke liye animated pauranik reels banana chahta hoon. Mujhe coding nahi aati,
isliye saara technical kaam tum karo aur mujhe simple Hinglish mein ek-ek line mein batao.

Ye folder ek ready Remotion reel template hai. CLAUDE.md aur README.md padh lo. Phir:
1. Check karo Node.js (version 20 ya upar) aur FFmpeg installed hain. Nahi hain to install
   karo (Windows par winget use karo).
2. Is folder mein npm install chalao.
3. reels/example wali reel ka 15 second ka preview banao.
4. Remotion Studio chalu karke mujhe uska link do, taaki main preview dekh sakoon.
Koi error aaye to khud fix karo. Har step ke baad batao kya hua.
```

## PROMPT · PEHLI TEST REEL
**Kahan:** Code tab mein

```text
Ye mera reel template hai. CLAUDE.md padh lo.
Environment settings bilkul mat badalna. Kuch install karna ho to repo ke andar khud
bash setup.sh chalao. Phir reels/example ki poori reel banao (npm run reel -- example),
use commit karke push karo, aur mujhe batao video kis branch mein aur kahan hai.
```

## FIX · ENVIRONMENT
**Kahan:** Usi session mein

```text
Environment settings mat badlo. Repo folder ke andar khud
bash setup.sh chalao aur aage badho.
```

## PROMPT 1 · TOPIC IDEAS
**Kahan:** Claude app ki normal chat

```text
Mujhe Instagram reels ke liye Ramayan, Mahabharat aur Puranon se 10 kahani ideas do,
jo log kam jaante hon. Har idea ke saath likho:
- ek line ka hook (virodhabhas ya "main ___ hoon" ya "kyun?" wala)
- kahani kis granth mein hai (ya ye lok katha hai)
- koi aane wala tyohaar ho to us se jodo
- is kahani ki seekh kya hai
Koi kahani mat banana. Sirf wahi jo granthon ya lok parampara mein sach mein hai.
```

## PROMPT 2 · SCRIPT LIKHWAO
**Kahan:** Claude app ki normal chat

```text
Is kahani par Instagram reel ki voiceover script likho: [kahani ka naam]
Niyam:
- 60-90 second, lagbhag 120-180 shabd
- Pehli line hi zabardast hook ho, koi "namaste" ya bhoomika nahi
- Har line chhoti (4-10 shabd), alag line mein, full stop ke saath
- Dialogue ho, beech mein ek sawaal, end mein "aaj bhi..." ya cliffhanger
- Ek achhi seekh ho. Granth ka naam ek baar bolo. Lok katha ho to saaf bolo.
- Kuch bhi apni taraf se mat banana
Mujhe script DO roop mein do, line se line same:
(A) Devanagari mein, ElevenLabs ke liye. Jahan emotion badle wahan [calm], [serious],
    [whispers] jaisa tag lagao, bas 3-4 jagah.
(B) Wahi lines Hinglish (Roman) mein, subtitles ke liye. Isme tag mat lagana.
Script ke baad 3 alag hook lines bhi do aur batao kaun si sabse strong hai.
```

## PROMPT 3 · SACH KI JAANCH (FACT CHECK)
**Kahan:** Script milte hi

```text
Ab is script ki ek-ek line check karo:
- Kaun si baat kis granth mein hai (Valmiki Ramayan, Mahabharat, kaunsa Puran)?
- Kaun si baat lok katha ya baad ki parampara hai?
- Koi baat galat, badha-chadha ke ya banayi hui to nahi?
- Kisi devi-devta ka apmaan ya galat chitran to nahi?
Galti mile to sahi karke poori script dobara do (dono roop mein).
```

## PROMPT 4A · AASAAN TAREEKA (AWAAZ CHAT MEIN)
**Kahan:** Code tab, naya session + MP3 attach

```text
Is message ke saath meri awaaz ki MP3 file attach hai. Is reel ka naam karna-kavach rakho.
Awaaz ko reels/karna-kavach/ folder mein save karo, aur neeche wali script ko usi
folder mein script.txt bana ke save karo (shabd bilkul mat badalna).
Phir CLAUDE.md ke saare niyam follow karke is kahani ki reel banao.
Environment settings mat badalna, zaroorat ho to bash setup.sh chalao. Pehle scene plan
dikhao. Jo character library mein nahi, wo isi style mein banao aur save karo. Phir sirf
15 second ka preview banao, commit + push karo aur batao preview kahan hai.
Poori reel abhi mat banana.

Script:
[yahan apni (B) Hinglish script paste karo]
```

## PROMPT 4 · NAYI REEL KA PREVIEW
**Kahan:** Code tab, har reel ke liye

```text
reels/karna-kavach folder mein meri awaaz aur script.txt hai. CLAUDE.md ke saare niyam
follow karke is kahani ki reel banao.
- Environment settings mat badalna. Kuch install karna ho to bash setup.sh chalao.
- Pehle mujhe scene plan dikhao: har line par kaun sa scene, kaun se characters.
- Library mein jo character nahi hai, wo isi style mein naya banao aur library mein save karo.
- Phir sirf pehle 15 second ka preview banao, commit karke push karo,
  aur batao preview kis branch mein aur kahan hai. Poori reel abhi mat banana.
```

## PROMPT 5 · BADLAAV (EXAMPLE)
**Kahan:** Usi session mein

```text
Preview dekha. Ye badlaav karo:
1. 2-4 second par subtitle Karna ke chehre ke upar aa raha hai, use upar khiskao.
2. Surya dev ka rang aur sunehra karo.
3. Sound effects 40% dheeme karo.
Phir dobara 15 second ka preview banao aur push karo.
```

## PROMPT 6 · FINAL REEL
**Kahan:** Preview OK hone ke baad

```text
Preview badhiya hai. Ab isi style mein poori reel end tak banao. Bante hi kuch frames
check karna ki kahin overlap ya galti na ho. Phir final reel.mp4 render karo,
commit karke push karo aur batao file kis branch mein aur kahan hai.
```

## PROMPT 7 · CAPTION + HASHTAGS
**Kahan:** Claude app ki normal chat

```text
Is pauranik reel ke liye Instagram caption likho: [kahani ek line mein]
- 2-3 line, Hinglish, kahani ki seekh ke saath
- Granth ka naam ho (ya "lok katha")
- Jhootha clickbait nahi ("99% log nahi jaante" jaisa nahi)
- End mein 5-8 sahi hashtags
Saath mein ek pinned comment bhi likho jo log ko apni raay likhne ke liye bulaaye.
```

## PROMPT 8 · JAGAH KHAALI KARO
**Kahan:** Code tab

```text
Repo kitna bada ho gaya hai, batao. Saari reels ke preview.mp4 hata do aur jo reels
main bataun unki reel.mp4 bhi hata do (pehle mujhse poochh lena). Phir commit aur push karo.
```

## PROMPT 9 · STYLE CARD
**Kahan:** Normal chat + screenshots

```text
Ye ek Instagram reel ke screenshots hain jiska style mujhe pasand aaya. Iska ek "style card"
banao jo main Claude Code ko de sakoon: rangon ka mood, drawing ka type (kaisi lines, kaise
chehre), background, subtitles ki jagah/size/rang, scene kitni jaldi badalte hain, camera
aur transitions. Sirf STYLE batao. Unke characters, logo ya kisi cheez ko hubahu copy karne
ki baat mat likhna. Ant mein 3 tareeke batao jisse meri reel isse alag aur behtar dikhe
(lagbhag 60-70% style unke jaisa, baaki hamara apna).
```

## PROMPT 10 · INSPIRED SCRIPT
**Kahan:** Normal chat

```text
Ek viral reel ka dhaancha main apne shabdon mein bata raha hoon: [hook kaisa tha,
kahani kaise badhi, end kaisa tha, kitne second ki thi]
Is DHAANCHE se seekh ke meri kahani [kahani ka naam] par bilkul NAYI script likho.
Unka koi vaakya ya khaas line copy mat karna (unke 4 shabd bhi lagataar same nahi).
Chapter 9 wale saare niyam lagao
(do roop: Devanagari + Hinglish, sach ki jaanch, ek achhi seekh).
```

## PROMPT 11 · INSPIRED REEL
**Kahan:** Code tab, naya session

```text
reels/naam folder mein meri awaaz, script.txt, style.txt aur reference screenshots hain.
Is reel ke liye CLAUDE.md ke style niyam ki jagah style.txt follow karo. Screenshots sirf
style samajhne ke liye hain: unke characters ya drawing trace/copy mat karna, apne original
characters banao. Environment settings mat badalna, zaroorat ho to bash setup.sh chalao.
Pehle scene plan dikhao, phir sirf 15 second ka preview banao, commit + push karo.
```

---
© 2026 "AI Se Viral Pauranik Reels". Sirf guide kharidne walon ke liye. Share ya resell karna mana hai.
