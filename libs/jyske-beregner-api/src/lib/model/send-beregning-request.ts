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


export interface SendBeregningRequest { 
    kundenavn?: string | null;
    email?: string | null;
    serializedBeregning?: string | null;
    opretLead?: boolean;
    partnerId?: string | null;
}
