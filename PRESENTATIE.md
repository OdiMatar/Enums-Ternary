# Weerwijs laten zien

Dit is een korte route voor een demonstratie van ongeveer drie minuten. Oefen de uitleg in je eigen woorden en houd de code open in VS Code.

## 1. Begin bij het menu

Vertel wat de app doet: in Weerwijs maak je zelf een weerbericht. Het is een interactieve simulatie. De twee lesopdrachten zijn onderdeel van dezelfde app.

Laat de eigen naam, het weericoon en de twee onderdelen zien.

## 2. Laat de enum zien

Open **Weer kiezen** en verander de dropdown van Sunny naar Rainy en Snowy. De tekst, het icoon en de kleur veranderen direct.

Open **Hoe werkt dit?** en laat daarna deze bestanden zien:

- `src/types/Weather.ts`: de vier vaste enumwaarden.
- `src/screens/EnumExampleScreen.tsx`: de huidige keuze in `useState`, de switch die het icoon kiest en de dropdown die de state aanpast.

Kern van de uitleg: de enum beperkt de mogelijke waarden. De switch bepaalt welk icoon bij een waarde hoort. Een statewijziging zorgt dat React het scherm bijwerkt.

## 3. Probeer de ternary operators

Ga naar **Dag & temperatuur**.

1. Zet de dagmodus uit. De zon verandert in een maan.
2. Zet de heldere hemel uit. Op de weerkaart verschijnt een maan met wolk.
3. Druk op **Hitte · 30°**. Het temperatuurresultaat toont een hoge thermometer.
4. Druk één keer op de minknop. Bij 29°C komt het normale nachticoon terug.
5. Druk op **Vorst · 0°**. De sneeuwvlok verschijnt. Druk op plus om de grens bij 1°C te laten zien.
6. Druk op **Begin opnieuw** om terug te gaan naar de begininstellingen.

Laat in `src/screens/TernaryExampleScreen.tsx` de drie stukken met comments zien. Wijs de vorm `voorwaarde ? alsWaar : alsOnwaar` aan. Leg uit hoe de geneste ternary eerst de temperatuur en daarna dag/nacht controleert.

## 4. Sluit af met de opbouw en controles

Laat kort zien dat knoppen, weerkaarten en uitleg herbruikbare components zijn. De routes in `src/app` verwijzen naar de schermen in `src/screens`.

Je kunt in de terminal laten zien hoe je controleert:

```bash
npm run typecheck
npm run lint
npm run test:web
```

De browsertests bedienen de app en controleren onder andere de iconen en temperatuurgrenzen. Android- en iOS-bundels bouwen is iets anders dan testen op een echt toestel. Probeer de app voor je presentatie ook zelf in Expo Go als je een geschikte telefoon hebt.

## Vragen om te oefenen

- Waarom gebruik je een enum in plaats van zelf losse strings te typen?
- Waarom gebruik je `useState` in plaats van een vaste `const temperature = 20`?
- Wanneer is een switch duidelijker dan meerdere ternary operators?
- Wat gebeurt er precies bij 0°C, 1°C, 29°C en 30°C?
- Waar staat de navigatie en waarom staan components in eigen bestanden?
