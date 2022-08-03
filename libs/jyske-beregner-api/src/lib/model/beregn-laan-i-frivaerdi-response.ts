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
import { BoligFinansieringResponse } from './bolig-finansiering-response';


export interface BeregnLaanIFrivaerdiResponse { 
    laaneForslag?: Array<BoligFinansieringResponse> | null;
    frivaerdiProcent?: number;
    nytLaanProcent?: number;
    restgaeldProcent?: number;
    kontaktMigParametre?: string | null;
}

