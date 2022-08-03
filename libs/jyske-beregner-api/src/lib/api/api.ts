export * from './andelsboligforening.service';
import { AndelsboligforeningService } from './andelsboligforening.service';
export * from './andelsboligforening.serviceInterface'
export * from './application-monitor.service';
import { ApplicationMonitorService } from './application-monitor.service';
export * from './application-monitor.serviceInterface'
export * from './beregninger.service';
import { BeregningerService } from './beregninger.service';
export * from './beregninger.serviceInterface'
export * from './boligudlejning.service';
import { BoligudlejningService } from './boligudlejning.service';
export * from './boligudlejning.serviceInterface'
export * from './fogo-light.service';
import { FogoLightService } from './fogo-light.service';
export * from './fogo-light.serviceInterface'
export * from './kommunikation.service';
import { KommunikationService } from './kommunikation.service';
export * from './kommunikation.serviceInterface'
export * from './kursliste.service';
import { KurslisteService } from './kursliste.service';
export * from './kursliste.serviceInterface'
export const APIS = [AndelsboligforeningService, ApplicationMonitorService, BeregningerService, BoligudlejningService, FogoLightService, KommunikationService, KurslisteService];
