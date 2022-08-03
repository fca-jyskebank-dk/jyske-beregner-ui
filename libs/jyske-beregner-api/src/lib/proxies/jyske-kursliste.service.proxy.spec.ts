import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JyskeKurslisteServiceProxy } from './jyske-kursliste.service.proxy';
import { KurslisteService } from '..';

describe('JyskeKurslisteServiceProxy', () => {
  let spectator: SpectatorService<JyskeKurslisteServiceProxy>;

  const createService = createServiceFactory({
    service: JyskeKurslisteServiceProxy,
    imports: [HttpClientTestingModule],
    providers: [KurslisteService],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator).toBeDefined();
  });
});
