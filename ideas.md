# MOMO BAN CHECKER — Mawazo ya Muundo

## Njia tatu za kimtindo

### 1. **Control Room ya Usalama**
**Utangulizi mfupi:** Dashboard ya uchunguzi yenye hali ya kituo cha usalama: navy yenye kina, amber ya tahadhari, na paneli za data zilizo wazi. Inaleta hisia ya umakini, uaminifu, na hatua zinazoweza kufuatiliwa.

**Probability:** 0.073

### 2. **Kadi ya Huduma ya Kiraia**
**Utangulizi mfupi:** Muundo wa editorial wenye cream, ink, na coral, ukiwasilisha ukaguzi kama huduma rahisi ya kila siku. Ni wa kirafiki, unaoweza kusomeka, na unaondoa hofu ya neno “ban”.

**Probability:** 0.028

### 3. **Signal / Quiet Tech**
**Utangulizi mfupi:** Interface safi ya teknolojia yenye graphite, mint, na mistari ya telemetry; inaonekana ya kisasa bila neon nyingi. Inalenga speed ya kuelewa, si mapambo.

**Probability:** 0.091

## Chaguo lililochaguliwa: Control Room ya Usalama

### Design Movement
**Neo-editorial control room:** mchanganyiko wa dashboard ya uchunguzi wa kisasa, uchapaji wa editorial, na uaminifu wa huduma za umma. Mfumo unaonekana wa kitaalamu bila kuogopesha mtumiaji wa kawaida.

### Core Principles
1. **Clarity before cleverness:** kila status, CTA, na hatua ya kurejesha akaunti ionekane kwa lugha rahisi.
2. **Evidence-led hierarchy:** namba, alama ya status, na timestamp vitangulie; mapambo yawe nyuma.
3. **Calm authority:** rangi za navy na paper zinajenga uaminifu; amber inaashiria hatua, si hatari ya kutisha.
4. **Progressive disclosure:** mtumiaji apate majibu ya haraka kwanza, kisha maelezo ya kiufundi kwa anayehitaji.

### Color Philosophy
Navy ya kina inawakilisha uthabiti na faragha; off-white ya karatasi inaleta usomaji mwepesi; amber ya dhahabu inawakilisha “next action” na tahadhari yenye utu; mint ndogo inaashiria akaunti iliyo sawa. **Signature brand color:** `#E9A23B` — amber ya signal, inayotambulika na kutumika kwenye active state, focus, na hatua zinazofuata.

### Layout Paradigm
Muundo wa **split workspace**: rail nyembamba ya kushoto yenye utambulisho na navigation, kisha canvas kuu yenye header ya status, hero ya ukaguzi isiyo katikati kabisa, na safu ya pili ya evidence + recovery. Kwenye simu, rail inageuka kuwa top bar; cards zinabaki na nafasi ya kutosha, si grid iliyosongamana.

### Signature Elements
- **Signal rail:** mstari mwembamba wa amber unaoendelea kwenye active navigation na status card.
- **Stamped status chip:** kibonge cha status chenye dot inayopumua taratibu na timestamp ya “last checked”.
- **Evidence ticks:** orodha ya vipimo vidogo yenye checkmarks, dots, na labels kama “Number format” / “Session history”.

### Interaction Philosophy
Kila interaction ijibu kwa heshima: focus states ziwe wazi, submit ionyeshe mchakato wa sekunde chache, na error ionyeshe jinsi ya kurekebisha badala ya kulaumu. Usitaje au kuahidi “unban”; interface itoe ukaguzi wa dalili na njia halali ya kuwasiliana na support.

### Animation
Entrance ya sections itumie opacity + translateY ndogo, kwa stagger ya 50ms. Status dot itumie pulse ya chini isiyozidi; button itumie scale 0.98 wakati wa kubonyeza. Kila motion iwe chini ya 240ms, easing ya snappy ease-out, na kuzimwa kwa `prefers-reduced-motion`.

### Typography System
- **Display:** `DM Serif Display`, kwa heading kuu na neno “MOMO” ili kuleta character ya editorial.
- **UI/body:** `Manrope`, kwa labels, body copy, inputs, na data.
- H1: clamp(2.6rem, 6vw, 5.7rem), tight line-height, weight 400 kwa contrast ya editorial.
- H2: 1.7–2.3rem, weight 700.
- Body: 0.95–1.05rem, line-height 1.65.
- Labels: 0.68–0.75rem, uppercase, letter-spacing 0.14em.

### Brand Essence
**MOMO BAN CHECKER ni dashboard salama ya watu wanaotaka kuelewa hali ya akaunti yao ya ujumbe bila kubahatisha, na inatofautiana kwa kutoa dalili zilizo wazi pamoja na hatua halali za recovery.**

**Personality:** makini, tulivu, mwelekezi.

### Brand Voice
Vichwa vya habari viwe vifupi, vya moja kwa moja, na vyenye utu. CTA ziwe za vitendo bila ahadi za kupita mipaka. Microcopy itumie Kiswahili rahisi pamoja na English technical labels pale inaposaidia.

**Mifano:**
- “Jua kinachoendelea kabla hujaanza kubahatisha.”
- “Kagua dalili. Chukua hatua salama.”

### Wordmark & Logo
Alama iwe **M iliyokatwa kwa mstari wa signal**: pembe mbili za M zimeunganishwa na amber line inayokatika katikati, ikimaanisha uchunguzi unaounganisha data na hatua. Wordmark itumie “MOMO” kwa DM Serif Display, ikifuatwa na “BAN CHECKER” kwa Manrope uppercase. Logo mark itumike kama badge ya mraba yenye kona moja iliyonyooka—si icon ya generic shield.

### Style Decisions
- Tumia navy/cream/amber/mint; epuka purple gradients na dark neon.
- Navigation iwe asymmetric split workspace; epuka full-page centered hero.
- Status check ni local demo flow tu kwenye static frontend; usikusanye credentials na usiweke mbinu za ban evasion.
- Tumia lucide icons kwa alama za UI, si emoji.

## Style Decisions

- First screen identity is explicit: the MOMO mark/wordmark and amber signal rail appear before the checker interaction.
- Human-facing copy is Swahili-first; English remains for technical labels such as `Signal board`, `Number format`, and `status monitor`.
- The recurring visual grammar is an amber signal rail, stamped status chip with timestamp, and evidence ticks. These now repeat in the hero, checker card, evidence board, and recovery protocol.
- The recovery illustration is paired with an `official route · safe mode` status overlay so it supports the control-room system instead of reading as generic service art.
