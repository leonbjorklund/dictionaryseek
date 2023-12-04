# DictionarySeek

Användare kan söka efter ett ord och få tillbaka definition från API: https://dictionaryapi.dev/

## Test:

1. App-test som kollar efter alla main, header, darkmode-knapp och sökfält.
2. ToggleDarkLightMode-test kollar ifall man kan toggla dark-light-mode.
3. Search-test testar sök och sedan om det renderas ut i resultat.
4. Togglefavorite-test kollar om ordet läggs till i favorites-menyn och till session-storage.

Samtliga tester är ganska simpla där jag utgick för att säkerställa funktionalitet från uppgiftsbeskrivningen. Fick tyvärr skriva om testerna efter att jag implementerade app-contexten vilket visade sig vara en utmaning, så testerna blev inte så utförliga som jag initiallt gjort. Response-mockdatan som användes togs direkt från exemplet på https://dictionaryapi.dev/

*App-komponenttestet säkerställer att alla grund-komponenter i uppgiftsbeskrivningen är med, vilket överenstämmer med designen och funktionskraven.
*ToggleDarkLightMode-testet togglar knappen och tittar på HTML-bodyns "colormode" vilket är chakras sätt att sätta färgläge på samtliga chakra-komponenter i DOM:en, *detta testet säkerställer att knappen funkar som den ska.
*Search-testet tittar mockar en sökning, och kollar sedan att en definition finns renderat. Detta test säkerställer den grundläggande sökfunktionen fungerar effektivt och korrekt, vilket avgör appens funktionalitet.
\*Togglefavorite-testet kontrollerar om ett ord kan läggas till i favoritmenyn och i session-lagringen korrekt. Genom att säkerställa att användare kan spara och återfinna sina favoriter, får vi kontrollerat att denna centrala del av sidans användargränssnitt fungerar som den ska.
