# Jyske Bank Beregner UI

Dette er UI projekt for Jyske Bank Beregnere. Det indeholder følgende 

- Jyske Frihed
- Jyske boligberegner (beregn lån til køb af bolig)
- Beregn lån i friværdi
- Beregn lån generel (hvad koster det at låne 500.000 kr)
- Jyske Kursliste (privat)

---

## Jyske Frihed UI
Jyske Frihed UI er en beregner, som kan lave simuleringsberegninger på et fastforrentet 30 årigt lån, eller et RTL lån med renteperiode på 1–6 år, med 30 års afdragsfrihed hvis LTV er lig med eller mindre end 60%. 

#### **Start**
For at starte projektet Jyske Frihed  
- `npm run jyske-frihed:start`



#### **Build**
For at lave et produktion build af Jyske Frihed  
- `jyske-frihed:build:prod`

---

## Reverse Proxy
Ved afvikling af projektet på egen PC/Mac, er det ikke muligt at kalde et API på en ekstern adresse. Derfor benyttes nginx, som en reverse proxy. 

Start med at installere nginx. Efter installation opdateres nginx.conf med konfiguration filen nginx.conf  der ligger i rodmappen af projektet.

Rod mappe på Mac:
/usr/local/etc/nginx

Den startes i en kommando prompt ved at stå i nginx mappen
- `nginx`

---

## Sådan laver du en ny app
Start med at køre disse to kommandoer: 
nx g @nrwl/angular:app <app-navn-app>
nx g @nrwl/angular:lib <navn-ui>
herefter skal alt slettes fra apps/<app-navn-app>/scr/app/ undtagen app.module.ts
Du kan nu kopiere det du skal bruge fra en anden app. 
i apps/<app-navn-app>/ find filen tsconfig.json og slet afsnittene med compiler options (sammenlign evt. med en anden app)
i libs/<navn-ui>/ find filen tsconfig.json og slet afsnittene med compiler options (sammenlign evt. med en anden app)
når du bruger @ i tsconfig.base.json så husk at genstarte din editor for at ændringen træder i kraft
i angular.json skal der tilføjes noget udne assets for application, nemlig globale assets, gik på en af de andre apps (hvis du glemmer det, så finder du ud af det når du bygger til deploy)

---

## Sådan tilføjer du yderligere Kirby iconer/svg'er så de kommer med når der bygges til wcm
I concatenate-build.js, der ligger i roden:
  I const filterFuncSvg() tilføjer du filnavnene på de ønskede kirby-icons i det boolske udtryk, der returneres fra metoden.
  Dette sikrer, at de refererede icons kopieres fra kirby til bygget.
I libs/shared/src/lib/services/assets-registration.service.ts:
  I metoden registrer() registreres de icons, der skal benyttes i wcm.
  Fra denne metode hentes underliggende arrays med icons og adderes til listen over ønskede icons.
  Du tilføjer de ønskede icons i en eller flere af de eksisterende lister.
  Du kan også oprette et nyt array med icons. Husk blot at tilføje arrayet i metoden registrer().
  Et eksempel:
      {
        name: 'close',
        svg: this._assetsUrl + '/assets/kirby/icons/svg/close.svg',
      },
