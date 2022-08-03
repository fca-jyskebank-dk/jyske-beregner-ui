1. Find kontrakterne til låneberegnerne, download dem og gem filen. (swagger-api.yml)
  Swagger til beregner-api'et ligger her:
  https://det-jyskeberegner.corp.jyskebank.net/index.html
  Klik på swagger.yml-linket øverst til venstre eller benyt denne url:
  https://det-jyskeberegner.corp.jyskebank.net/swagger/v1/swagger.yml

2. Klienten genereres med følgende kommando i en terminal:
  npm run jyske-beregner-api:generate
  Hvis du benytter VS CODE kan du også finde kommandoen under >NPM SCRIPTS i EXPLORER til venstre

3. Hvis any-type.ts er blevet slettet ved genereringen, så gendan den (evt. via Source Control i menuen til venstre i VS Code)

4. Tilret proxy'en så den afspejler den nye kontrakt

5. Tilret mapperen i +state-folderen i ui-lib'et

6. Tilret effect'en så den afspejler det ændrede api 
