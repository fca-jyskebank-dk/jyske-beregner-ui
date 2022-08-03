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


export interface FrivaerdiRequest { 
    boligType?: string | null;
    boligVaerdi?: number;
    oensketLoebetidIAar?: number;
    antalAfdragsfrieAar?: number;
    laaneOenske?: number;
    foranstaaendeGaeld?: number;
}
