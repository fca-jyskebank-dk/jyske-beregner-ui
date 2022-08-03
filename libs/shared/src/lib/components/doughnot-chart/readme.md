# Doughnut Chart

Doughnut chart er udviklet til Jyske Boligberegner. Denne readme viser hvordan den kan bruges som en komponent

---

### Doughnut Chart komponent

Komponenten har indlejres på et side som følgende. Den har et enkelt input felt som hedder "ChartData"

```
    <jyske-beregner-doughnut-chart
        [chartData]="chartData">
    </jyske-beregner-doughnut-chart>
```

### Doughnut Chart interface for input ChartData

ChartData interfacet består af følgende

```
    export interface ChartData {
        labels: string[];
        colors: string[];
        data: number[];
    }
```

De 3 arrays skal anses, som være sammenhængende

- labels - Angiver tekster for de enkelte data værdier i grafen
- colors - Angiver farver på grafen for data værdierne
- data - Angiver numerisk værdi for grafen

---

### Eksempel på brug af Doughnut Chart komponenten

#### HTML

```
    <jyske-beregner-doughnut-chart
        [chartData]="chartData">
    </jyske-beregner-doughnut-chart>
```

#### Component

```
    /// Privat variabelt til at holde data
    chartData: ChartData;

    /// Konfiguration af data
    /// data vil være dynamisk
    this.chartData = {
        labels: ['Udbetaling', 'Boliglån', 'Realkreditlån'],
        colors: [
            ColorHelper.getThemeColorHexString('success'),
            ColorHelper.getThemeColorHexString('warning'),
            ColorHelper.getThemeColorHexString('background-color'),
        ],
        data: [15, 25, 60],
    };
```
