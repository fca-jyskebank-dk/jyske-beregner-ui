# Background konvertering

For at kunne se baggrundsbilledet i WCM er det lavet som inline css og skal dermed konverteres til base64 encoding

Dette kan gøres på en mac med følgende kommando
```
base64 -i 'Angiv input sti og filnavn' -o 'Angiv output stil og filnavn'
```

### Eksempel
```
base64 -i '/Users/lars/repos/repos-jyskebank/jyske-beregner/jyske-beregner-ui/apps/jyske-boligberegner-app/src/assets/images/background_1800x455.jpg' -o '/Users/lars/repos/repos-jyskebank/jyske-beregner/jyske-beregner-ui/apps/jyske-boligberegner-app/src/assets/images/background.txt'
```