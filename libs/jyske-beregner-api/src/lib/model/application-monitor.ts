/**
 * Jyske Boliglånsberegner API
 * Understøtter udbetalingsberegninger for Jyske Realkredits boliglånsprodukter.
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ApplicationMonitorComponent } from './application-monitor-component';
import { ApplicationMonitorBlob } from './application-monitor-blob';


export interface ApplicationMonitor { 
    name?: string | null;
    timestamp?: string;
    environment?: string | null;
    version?: string | null;
    contact?: string | null;
    views?: Array<string> | null;
    components?: Array<ApplicationMonitorComponent> | null;
    blob?: ApplicationMonitorBlob;
}

