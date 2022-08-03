import { DatePipe, DecimalPipe } from '@angular/common';
import { CustomNumberPipe } from '@shared/pipes/custom-number.pipe';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { JyskeKurslisteMapper } from './jyske-kursliste.map.service';

describe('JyskeKurslisteMapper', () => {
  let spectator: SpectatorService<JyskeKurslisteMapper>;

  const createMapper = createServiceFactory({
    service: JyskeKurslisteMapper,
    imports: [],
    providers: [DatePipe, CustomNumberPipe, DecimalPipe],
  });

  beforeEach(() => {
    spectator = createMapper();
  });

  it('should create', () => {
    expect(spectator).toBeDefined();
  });

  it('abc', () => {
    // arrange:
    const omvendtDato = '2019-09-23T23:16:kjhdfa';

    // act:
    const korrektDato = spectator.service._mapDato(omvendtDato);

    // assert:
    expect(korrektDato).toBe('23-09-2019');
  })
});
