# Mall för inlämning laboration 1, 1dv610

## Checklista

- [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
- [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt: "det bör fungera" :) )
- [x] Koden är objektorienterad
- [x] Jag har skrivit en modul som riktar sig till programmerare

## Egenskattning och mål

- [ ] Jag är inte klar eftersom jag vet att jag saknar något. (Då skall du inte lämna in! Lämna då istället in på restlaboration.)
- [x] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
  - [x] De flesta testfall fungerar
  - [x] Koden är förberedd på Återanvändning
  - [x] All kod samt historik finns i git
  - [ ] Kodkvaliterskraven är ifyllda
  - [ ] Reflektion är skriven utifrån bokens kapitel
- [ ] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta.
  - [ ] Samtliga testfall är skrivna
  - [ ] Testfall är automatiserade
  - [ ] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
  - [ ] Kodkvalitetskraven är varierade
- [ ] Jag eftersträvar med denna inlämning högsta betyg (A)

Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser.

## Återanvändning

Beskriv hur du anpassat din kod och instruktioner för att någon annan programmerare skall kunna använda din modul. Om du skrivit instruktioner för din användare, länka till dessa. Om inte, beskriv här hur någon skall göra för att använda din modul.

## Beskrivning av min kod

Beskriv din kod på en hög abstraktionsnivå. En kort beskrivning av dina viktigaste klasser och metoder. Skapa gärna ett klassdiagram som bild. Använd det ni lärt er så här långt i 1dv607. Kommunicera så att jag kan förstå.

## Hur jag testat

_Beskriv hur du kommit fram till om din kod fungerar._

Jag har testat min kod genom manuella test som utförts med hjälp av en test applikation som körs i webbläsaren. De manuella testen har utformats för att på ett så genomgående sett som möjligt verifiera att koden fungerar som det är tänkt.

### Testfall

Lista de enskilda testfallen. **Fetmarkera** sådant som du själv fyllt i. En rad per testfall. Om ni använder vertyg för testning kan ni ha en bild här med testrapporten. Tänk på att kommunicera till mig. Vad fungerar?, vad fungerar inte? Hur är det testat? Vilka delar testas inte?

| Testfallsnummer | Vad testas                                                                                                                          | input                                                                                | output                                                                                                                                        | utfall PASS/FAIL |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1               | Instansiering av ett Timer object och utskrift av tid getTimeString-metoden. Utan att ställa någon tid på timern.                   | Starta upp test-appen genom att följa instruktionerna i README filen.                | Sidan ska laddas och tiden mellan "Set Timer" och timer kontrollerna ska visa 00:00.                                                          | PASS             |
| 2               | Sätta tiden på timern med setTime-metoden. Testar även getTimeString-metoden för att visa timerns interna tid i test applikationen. | Skriv in 12345 i inputfältet. Tryck på Set Timer.                                    | 03:25:45:00 ska visas                                                                                                                         | PASS             |
| 3               | Start av timern med start-metoden.                                                                                                  | Förkrav: Testfall ovan. Tryck därefter Startknappen.                                 | Timern ska nu börja räkna nedåt.                                                                                                              | PASS             |
| 4               | Pausa timern med pause-metoden.                                                                                                     | Förkrav: Testfall ovan. Tryck därefter på pause-knappen.                             | Timern ska stanna på den tid den var på när knappen trycktes.                                                                                 | PASS             |
| 5               | Återgå till att räkna ner efter pausning.                                                                                           | Förkav: Testfall ovan. Tryck på start-knappen                                        | Timern ska nu börja räkna ner från den tiden som den var pausad på.                                                                           | PASS             |
| 6               | Återställning av tiden på timern med reset-metoden.                                                                                 | Förkrav: Testfall ovan. Tryck på reset-knappen.                                      | Tiden ska nu visa den tid som den först sattas till i testfall 2. Alltså den ska visa 03:25:45:00. Tiden ska vara stoppad och inte räkna ner. | PASS             |
| 7               | Lägga till tid till en startad timer.                                                                                               | Förkrav: Testfall 3. Tryck på +5 knappen.                                            | 5 sekunder ska ha adderats till tiden.                                                                                                        | PASS             |
| 8               | Dra av tid från timern.                                                                                                             | Förkrav: Testfall 3. Tryck på -5 knappen.                                            | 5 sekunder ska ha dragits av tiden.                                                                                                           | PASS             |
| 9               | När timern når 0 ska ett expired event skickas ut och timern stannar på 0.                                                          | Förkrav: Testfall 1. Sätt timern på 5 sekunder och tryck på start. Vänta 5 sekunder. | Timern ska efter 5 sekunder stanna på 0 och i consolen printas "Timer expired"                                                                | PASS             |

## Kodkvalitetskrav

**Fetmarkera** de "regler" som används ur CC. Ni kan frångå tabellformat om ni vill. Skapa direktlänkar till er kod där det är lämpligt. Skriv så att jag kan förstå.

### Namngivning

| Namn och förklaring | Reflektion |
| ------------------- | ---------- |
|                     |            |

### Funktioner

| Metodnamn och förklaring | Reflektion |
| ------------------------ | ---------- |
|                          |            |

## Laborationsreflektion

Reflektera över uppgiften utifrån ett kodkvalitetsperspektiv. Använd begrepp ifrån boken.
