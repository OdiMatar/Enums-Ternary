# Weerwijs

Weerwijs is mijn eigen weeratelier: een app waarin je zelf een weerbericht samenstelt. Ik heb de opdrachten over enums en ternary operators verwerkt in één app met een eigen naam, icoon en kleurenthema. Een zonnige dag heeft een warme gele weerkaart, regen krijgt een blauwe kaart en een nacht een donkere kaart.

Ik heb dit project gemaakt om te oefenen met React Native, TypeScript, enums, switch statements, ternary operators, state, gebruikersinteractie, iconen en navigatie. De app is een simulatie: er wordt geen echt weer opgehaald.

Op het hoofdmenu kies ik **Weer kiezen** (de enum-opdracht) of **Dag & temperatuur** (de ternary-opdracht). Op beide schermen staat **Terug naar menu**. Ik kan ook direct van de ene opdracht naar de andere gaan. Met **Hoe werkt dit?** klap ik uitleg en een klein codevoorbeeld open.

De opdrachtbestanden en routes heten nog `enum_example` en `ternary_example`, zodat ze bij de oorspronkelijke lesopdracht passen. De app zelf heet Weerwijs.

## Enum opdracht: enum_example

In `src/types/Weather.ts` staat mijn `Weather` enum met `Sunny`, `Cloudy`, `Rainy` en `Snowy`. Het huidige weer begint bij `Weather.Sunny` en wordt bijgehouden met `useState`.

In `EnumExampleScreen.tsx` gebruik ik een switch statement om voor ieder weertype een ander icoon te kiezen. De iconen komen uit `@expo/vector-icons`. Met de dropdown kan ik het weer veranderen. De tekst en het icoon veranderen meteen mee, omdat de dropdown de state aanpast. Op iOS gebruikt deze selectie de standaard iOS-kiezer.

De weerkaart krijgt ook een Nederlandse titel, een korte beschrijving en een kleur die bij het weer past. Hiervoor gebruik ik dezelfde enum als sleutel; er is dus één huidige weerkeuze.

## Ternary opdracht: ternary_example

Dit scherm heeft drie onderdelen:

1. **isDayTime:** begint op `true`. Een ternary kiest een zon of maan. Met de schakelaar zet ik de dagmodus aan of uit.
2. **isSunny:** begint op `true`. Samen met `isDayTime` bepaalt deze waarde of ik een zon, wolk, maan of maan met wolk zie. Bij nacht betekent `isSunny` een heldere hemel.
3. **temperature:** begint op `20`. Met de plus- en minknop verander ik de temperatuur met één graad per keer. Vanaf 30°C verschijnt een hoge thermometer. Bij 0°C of lager verschijnt een sneeuwvlok. Daartussen zie ik een zon of maan, afhankelijk van `isDayTime`. Ook de tekst gebruikt ternary operators.

Ik gebruik `useState(true)` en `useState(20)` in plaats van vaste variabelen, zodat ik de waarden in de app kan veranderen. De dagmodus uit deel 1 wordt ook gebruikt in deel 2 en 3. De instellingen worden niet opgeslagen als ik de app afsluit.

Met de situatieknoppen **Vorst**, **Lentedag** en **Hitte** kan ik snel naar 0, 20 en 30 graden gaan. **Begin opnieuw** zet alle instellingen terug naar een zonnige dag met 20°C. Deze knoppen zijn handig bij het demonstreren aan mijn docent.

## Installatie

Benodigd: Visual Studio Code, Node.js 22.13 of nieuwer en npm. Dit project gebruikt Expo SDK 57.

Download het project via Git en open het in VS Code:

```bash
git clone https://github.com/OdiMatar/Enums-Ternary.git
cd Enums-Ternary
code .
```

Heb je het project al lokaal? Open dan de map waarin `package.json` staat. In mijn oorspronkelijke workspace heet die map `react-native-examples`. Installeer daarna de dependencies:

```bash
npm install
```

## Project starten

```bash
npx expo start
```

Laat deze terminal openstaan zolang je de app gebruikt. Stoppen kan met `Ctrl+C`.

### Expo Go op een telefoon

Installeer een versie van Expo Go die Expo SDK 57 ondersteunt. Verbind de telefoon en computer met hetzelfde wifi-netwerk. Scan de QR-code met Expo Go op Android of met de camera op een iPhone.

Lukt verbinden via wifi niet, probeer dan `npx expo start --tunnel`. Expo kan daarbij vragen om het tunnelpakket te installeren.

### Android emulator

Installeer Android Studio en maak een virtueel Android-apparaat aan. Start de emulator en druk in de Expo-terminal op `a`, of gebruik:

```bash
npm run android
```

### iOS

Een iPhone kan de app via Expo Go openen, ook als de computer Windows gebruikt. Voor de iOS Simulator heb je een Mac met Xcode nodig. Start daar de simulator en druk op `i` in de Expo-terminal, of gebruik `npm run ios`.

### Web

Web wordt ook ondersteund:

```bash
npm run web
```

Expo opent de app in de browser. Je kunt ook op `w` drukken als Expo al draait.

## Mappenstructuur

```text
Enums-Ternary/
├── assets/                       # Eigen Weerwijs-icoon, bron-SVG en favicon
├── src/
│   ├── app/
│   │   ├── _layout.tsx            # Navigatie en statusbalk
│   │   ├── index.tsx              # Route voor het hoofdmenu
│   │   ├── enum_example.tsx
│   │   └── ternary_example.tsx
│   ├── components/
│   │   ├── AppButton.tsx
│   │   ├── LearnNote.tsx          # Uitklapbare uitleg van de opdracht
│   │   ├── Screen.tsx             # Scherm met scrollen en terugknop
│   │   ├── WeatherCard.tsx        # Weerkaart met een passend kleurenthema
│   │   └── WeatherResult.tsx      # Icoon met tekst
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── EnumExampleScreen.tsx
│   │   └── TernaryExampleScreen.tsx
│   ├── types/
│   │   └── Weather.ts
│   └── styles.ts
├── tests/
│   └── app.spec.ts                # Controle van de app in de browser
├── .gitignore
├── app.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.ts
├── PRESENTATIE.md
├── tsconfig.json
└── README.md
```

Expo Router regelt de navigatie. Daarom staat het startpunt in `src/app/_layout.tsx` en is er geen losse `App.tsx` nodig. De routebestanden verwijzen naar de schermen in `src/screens`. De Expo-template bevat ook instructiebestanden voor ontwikkeltools, zoals `AGENTS.md`.

## Controleren

```bash
npm run typecheck
npm run lint
npx expo-doctor
```

De vijf browsertests controleren de navigatie, alle vier enumkeuzes, de schakelaars, de temperatuurgrenzen, de iconen, de situatieknoppen, de resetknop, de code-uitleg en het menu op een smal en breed scherm. Eenmalig de testbrowser installeren en daarna testen:

```bash
npx playwright install chromium
npm run test:web
```

De tests starten zelf een lokale Expo-server. Deze browsertests vervangen geen controle op een echte telefoon.

Zelf uitproberen:

1. Open Weer kiezen en kies alle vier weertypes. Controleer de tekst, de kleur en het icoon.
2. Ga terug en open Dag & temperatuur. Probeer alle combinaties van de twee schakelaars.
3. Verhoog de temperatuur naar 30°C en verlaag hem naar 0°C. Bekijk ook 29°C en 1°C.
4. Wissel bij een normale temperatuur tussen dag en nacht. Het temperatuuricoon verandert mee.
5. Gebruik opnieuw de terugknop om naar het hoofdmenu te gaan.

## Git

De repository staat op [GitHub: OdiMatar/Enums-Ternary](https://github.com/OdiMatar/Enums-Ternary). De hoofdbranch heet `main`. De `.gitignore` houdt onder andere `node_modules`, de Expo-cache, builds en testresultaten buiten Git. `package-lock.json` hoort juist wel in Git, zodat dezelfde dependencyversies kunnen worden geïnstalleerd.

Na een wijziging kan ik de bestanden zo bijwerken op GitHub:

```bash
git add .
git commit -m "Weerwijs bijgewerkt"
git push
```

## Wat ik heb geleerd

Door deze opdracht begrijp ik beter wanneer ik een enum kan gebruiken. Ik hoef dan niet steeds zelf losse weerteksten te bedenken. Met een switch kan ik duidelijk aangeven wat er bij elke waarde moet gebeuren. Een ternary vind ik handig voor een korte keuze, zoals dag of nacht. Ik heb ook gezien dat React de UI vanzelf bijwerkt als ik state verander. Door de schermen en knoppen te verdelen over bestanden kan ik de code makkelijker terugvinden.

Ik heb daarnaast geprobeerd om van de losse oefeningen een samenhangende app te maken. De kleuren, knoppen en weerkaarten passen bij elkaar. De extra uitleg is uitklapbaar, zodat ik de app normaal kan gebruiken en ook kan laten zien wat er in de code gebeurt.

## Presenteren

In [PRESENTATIE.md](./PRESENTATIE.md) staat een korte volgorde voor een demonstratie, met de bestanden waar de belangrijkste onderdelen staan. Ik kan die gebruiken om mijn uitleg te oefenen.

## Gebruikte hulpmiddelen

Bij het bouwen zijn de ECC-skills `react-native-patterns` en `frontend-design-direction` gebruikt voor de opbouw, lokale state, stijlen en het eigen thema. De genoemde L99-skill was niet beschikbaar in de ontwikkelomgeving en is daarom nog niet toegepast. Deze skills zijn ontwikkelhulp en geen dependencies van de app.

Documentatie: [Expo en TypeScript](https://docs.expo.dev/guides/typescript/), [Expo Router](https://docs.expo.dev/router/introduction/), [iconen](https://docs.expo.dev/guides/icons/) en [Picker](https://docs.expo.dev/versions/v57.0.0/sdk/picker/).
