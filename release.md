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
  - [x] Kodkvaliterskraven är ifyllda
  - [x] Reflektion är skriven utifrån bokens kapitel
- [ ] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta.
  - [ ] Samtliga testfall är skrivna
  - [ ] Testfall är automatiserade
  - [ ] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
  - [ ] Kodkvalitetskraven är varierade
- [ ] Jag eftersträvar med denna inlämning högsta betyg (A)

Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser.

## Återanvändning

Github repositoriet är utrustad med en README-fil som beskriver vad modulen gör och hur man som utvecklare kan integrera den i sin egen kod. READMEN beskriver i detalj vilka publika metoder, egenskaper och event som finns. Modulen är dessutom publicerad på [npm](https://www.npmjs.com/package/tick-tock-timer) vilket den enkel att använda i sitt projekt. Bara att hämta paketet med "npm i tick-tock-timer" och importera Timer klassen.

## Beskrivning av min kod

Själva modulen består en Timer klass. Jag hittade inte något lämpligt sätt att bryta ur några metoder eller egenskaper utan tyckte att de hörde hemma i samma klass. De publika metoderna, som till exempel start(), pause(), addEventListener(), får man snabbt en överblick på genom att läsa avsnittet i README-filen. Efter start uppdateras tiden på timern med jämnt intervall. Den nya tiden beräknas och timern skickar ut ett event om att den uppdaterats.

Test applikationen importerar Timer klassen och tillhadahåller ett gränssnitt för att kunna testa applikationen. Den instansierar ett timerobjekt och anropar dess publika metoder när anvädaren använder respektive funktion i gränssnittet.

## Hur jag testat

Koden är testat genom manuella test som utförts med hjälp av en test applikation som körs i webbläsaren. De manuella testen har utformats för att verifiera modulens vision som är beskriven i första stycket i README-filen.

### Testfall

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

### Namngivning

OBS: Då jag hade svårt hitta namngiviningar där jag kan ge exempel på "fel" så har jag också tagit med och reflekterat över regler som jag följt.

Det riktlinjer Robert beskriver i Clean Code tycker jag faller naturligt in i hur jag tenderat att skapat namn tidigare. Det har nog att göra med att vi under utbildningen tidigt blev uppmuntrade till att skapa längre variabel/metod namn som bättre förklarar dess funktion. Som ny lärd programmerare har jag inte med mig dåliga vanor från när man ville hålla namn korta på grund av språkbegränsnigar eller att man inte hade en IDE som hjälpte en att autofylla långa variabelnamn.

Noterbart är dock att jag lärt mig programmera och även i den här uppgiften programmerar i ett dynamiskt språk som Javascript. Detta göra att jag har en tendens till att lägga till information i ett metodnamn om vilken typ som returneras vilket hade varit överflödig information i ett statiskt språk. Att ange retur typ i JSDOC är en möjlig lösning till detta även om det inte är lika tydligt.

#### 1. start()

Metod för att starta timern.

**Use Intention-Revealing Names** - lätt att förstå vad metoden gör. Jag har valt att inte döpa den till ex. startTimer(), då det skulle anses som **Don’t Add Gratuitous Context**. Start-metoden tillhör redan en Timer-klass så det hade varit ett onödigt tillägg till namnet.

#### 2. addEventListener(event, callback)

Metod för att lyssna på event som timern skickar ut.

**Use Problem Domain Names** - Jag har valt denna utformning då den antyder på Web APIs addEventListener metod som många utvecklare är familjär med. Eftersom de känner igen metodens namn och utformning går det snabbt att förstå vad den gör. Då användaren av metoden kommer vara programmerare är det okej att använda tekniska termer i metodnamnet.

#### 3. isRunning

Egenskap/getter för avgöra om timern är igång eller inte. (boolean)

**Method Names** - "is" ger en hint av att retur värdet är boolskt.

#### 4. Timer

Klassnamn.

**Class Names** - klassnamn ska vara substantiv.

#### 5. getTimeString()

Metod för att hämta timerns tid som en sträng.

**Use Intention-Revealing Names** - Det jag vill uttrycka med namnet är att användaren kommer serveras timerns i form av en sträng, vilket namnet tydligt förklarar. Men hur denna sträng är formaterad framgår inte. Strängen som returneras är formaterad i formatet HH:MM:SS:hh. Timmar och minuter visas inte om de är 0. Jag kunde inte komma på något bra metodnamn som förklarar detta på en rad som inte blir omriligt lång. En underliggande privat metod har jag döpt till formatTimeTo24hourString(). Kanske ligger den lite närmre sanningen även om den delvis ljuger eftersom det inte är en äkta 24-timmarsformat då tiden innehåller hundradelar.

**Avoid Disinformation** - Möjligt att man som användare kan blanda ihop denna och _getTimeObject()_ då de är snarlika. Man kanske läser snabbt och inte är uppmärksam.

**Method Names** - Eftersom det är ett metodnamn ska det utformas som ett verb. Access-funktioner brukar inledas med get. Denna funktion är ingen regelrätt acessor, då den ändrar/formaterar värdet på tiden, men jag tycker det passar då den trots allt hämtar ett värde baserat på ett av klassen fält.

### Funktioner

OBS: Exemplevis **Do One Thing** och **One Level of Abstraction per Function** är återkommande i de flesta funktioner. Jag har valt att inte skriva ut dessa på alla funktioner för att slippa återupprepa mig så mycket. Istället försöker jag göra en mer utförlig reflektion av med hjälp av reglen på åtmistone en funktion.

#### 1. start() - 9 rader

```javascript
  start() {
  if (this.#isRunning) return

  if (this.#isInitialStart()) {
    this.#setNewStartTime()
  } else {
    this.#updateStartTimeAfterPause()
  }

  this.#setRunningState()
  this.#dispatchEvent('started')
  this.#updateTime()
}
```

**Do One Thing** jag är lite ambivalent till hurvida funktionen endast gör en sak eller flera. Man skulle kunna argumentera för att den gör flera saker:

1. Kollar timerns "state" (startad/pausad).
2. Uppdaterar start tids värdet beroende på "state".
3. Uppdaterar sin "state".
4. Skickar ut event om att den startat.
5. Uppdaterar tiden.

Å andra sidan är det saker som behöver ske för att starta timern, skulle jag vilja argumentera. Dessutom tycker jag att de görs på en abstraktionsnivå under det större konceptet av att "starta timern" Jag ser inte heller möjlighet till att kunna "extrahera" någon mer funktion på ett meningsfullt sätt. Detta är, enligt Robert C. Martin, tecken på att funktionen endast gör en sak.

**Structured Programming** Det är ganska vanligt att jag i min programmering bryter mot "Structured programming" principen som säger att en function endast ska han en ingång och en utgång. Jag tycker det kan vara rätt så smidigt med någon extra retur-sats. Som i det här fallet där jag väljer att returnera direkt om timer redan är startad. Ett annat alternativ hade i det här fallet kunnat vara att kasta ett undantag om timern redan är startad. Robert C. Martin menar dock att det kan vara okej med flera retur/break/continue satser ibland så länge man håller funktionerna små. Det kommer inte öka komplexiteten när det är så lätt att få överblick i en liten funktion.

#### 2. adjustTime() - 10 rader

```javascript
/**
 * @param {Number} timeAdjustment - milliseconds. Positive to add time. Negative to substract.
 */
adjustTime(timeAdjustment) {
  this.#validateTimeAdjustmentInput(timeAdjustment)

  if (this.#isRunning) {
    this.#startTimeInMS += timeAdjustment
    this.#updateEllapsedTime()

    if (this.#isExpired()) {
      this.#endTimer()
    } else {
      this.#dispatchEvent('updated')
    }
  }
}
```

**One Level of Abstraction per Function** - Detta ska vara en funktion på högnivå. Jag tycker dock det finns en del olika nivåer på abstraction nivå så här under reflektion. Till exempel så är `this.#startTimeInMS += timeAdjustment` på låg nivå och kräver att man förstår hur timern beräknar sin tid för att kunna förstå innebörden av satsen. Den skulle kunna extraheras till en egen funktion men det ända läpliga namnet jag kan komma på hade varit något i stilen med adjustTime vilket är detsamma som den ursprungliga funktionen.

**Function Argument** Metoden har ett argument, **Common Monadic Forms**. I det här fallet den något mindre vanliga formen där argumentet ändrar applikationens "state". Funktionen ändrar timerns tid.

Då Javascript är dynamiskt typat har jag avänt mig av JSDOC för att lägga till typinformation till funktionens argument.

#### 3. updateTime() - 7 rader

```javascript
#updateTime() {
  this.#updateEllapsedTime()

  if (this.#isExpired()) {
    this.#endTimer()
  } else {
    this.#dispatchEvent('updated')
    this.#setNextTimerUpdate()
  }
}
```

**Have No Side Effects** En funktion som har sideffekter säger att den gör en sak, men påverkar också systemet på andra sätt en vad den lovat. Den här updateTime funktionen säger att den ska updatera timers tid. Vad som kanske inte är lika tydligt är att den också sätter en timeout för när nästa uppdatering ska ske. Kanske hade en bättre lösning varit att extrahera timerns "tick"-motor ur funktionen och låta denna endast uppdatera timerns tids-state som den utlovat.

#### 4. formatTimeTo24hourString() - 7 rader

```javascript
#formatTimeTo24hourString() {
  const timeObject = this.getTimeObject()
  let timeString = ''

  for (const timeUnit in timeObject) {
    timeString += this.#formatTimeUnitValue(timeUnit, timeObject[timeUnit])
  }

  return timeString
}
```

**One Level of Abstraction per Function** Det här är en privat funktion på lägre nivå. Här ser vi mer detaljer av kodimplementationen. Jag tycker dock de håller en liknande abstraktionsnivå vilket är bra.

Det är möjligt att jag hade kunnat extrahera ut alla tidsformatering för modulen till en helt egen klass.

#### 5. formatTimeUnitValue() - 7 rader

```javascript
/**
 * @param {String} unit - time unit. ex 'seconds' or 'minutes'.
 * @param {Number} value - value of unit.
 */
#formatTimeUnitValue(unit, value) {
  let timeString = value < 10 ? this.#padTimeString(value) : '' + value

  timeString += this.#semicolonIfNotHundreths(unit)

  if (value === 0) {
    timeString = this.#showZerosOnlyForSecondsAndHundreths(unit, timeString)
  }

  return timeString
}
```

**Function Argument** Metoden har två argument, **Dyadic Functions**. Fler argument för en metod ökar dess komplexitet. I det här fallet har vi en enhet och ett värde som hör samman.

Då Javascript är dynamiskt typat har jag avänt mig av JSDOC för att lägga till typinformation till funktionens argument.

## Laborationsreflektion

Modulen som vi skapar i uppgiften är tänkt att rikta sig till andra utvecklare. Det innebär att andra människor kan komma att behöva sätta sig in i, och förstå den kod vi skriver. Hur skriver vi då kod som andra utvecklar kan förstå? Det är konsten av kodkvalitet eller Clean Code some Robert C. Martin kallar det.

Det är svårt eller nästintill omöjligt att skriva ren kod från början till slut. När jag skriver kod vet jag för det mesta inte exakt hur problemet först ska lösas innan jag först sätter mig och skriver. Förhoppningsvis har jag en rikting. Att samtidigt försöka skriva perfekt ren kod och följa alla de regler som Robert beskriver i boken skulle få mig att frysa och inte kunna få ut en enda rad kod. Som tur var presenterar han en lösning till detta. Du börjar med ett första utkast av kod som förhoppningsvis fungerar men troligtvis inte ser så vacker ut. Sedan går du tillbaka och förfinar. Mer och mer. Du extraherar ut funktioner, kanske hela klasser. Finslipar namngivning. När du skrivit kod så att de passerar det tillhörande testet är du ofta bara halvvägs. Resterande tid går åt till att förfina kodkvaliten så att koden kan få en lång livslängd.

Som ett komplement till boken, när min sinne varit lite för flyktigt för att klara av att läsa, har sett igenom Roberts föreläsningar på youtube om Clean Code, som är förvånantsvärt underhållande. Uttryck som fastnat hos mig är "Extract until you drop" och "Code should read like well written prose". Det första refererar till att funktioner ska vara små, väldigt små. Det andra är att kod ska vara sjävförklarande och intuitiv med en lämplig abstraktionsnivå.

Som tidigare nämnt har jag haft det lättar med namngivning. Självklart kan det ta tid att komma på ett bra namn och det kan ta ett par iterationer innan man känner sig nöjd. En fälla jag tidigare ofta gått i är angåede "Pick One Word per Concept". Jag har ofta blandat exempelvis "get" och "fetch" för liknande koncept.

Små funktioner, en nivå av abstraktion och inga sidoeffekter har har hittills varit min största lärdom i kodkvalitet. Det var inget jag tänk på så mycket tidigare men det gör otrolig skillnad i hur lättförståerlig koden blir. Sidoeffekter har jag nog ljugit med väldigt många gånger. Det är så enkelt att bara kasta in lite extra i en funktion även om det inte är vad den borde göra. Tidigare under utbildningen har vi matats med DRY principen och det har varit största motivation till att bryta ur kod i mindre funktioner. Nu har jag förstått att det inte bara hjälper till att upprepa kod färre gånger, utan att det också kan hjälpa oss att seperara abstraktionnivårerna vilket gör koden mycket mer lättförståerlig.
