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
import { UdbetalingsKurs } from './udbetalings-kurs';


export interface FastRenteProdukt { 
    produktnavn?: string | null;
    loebetidAar?: number;
    aktuelKurs?: number;
    tilbudsKurs?: number;
    tilbudsKursDato?: string;
    maxAntalAfdragsfrieAar?: number;
    kuponrenteProcent?: number;
    aabenForTilbud?: boolean;
    fastkursAftaleKurser?: Array<UdbetalingsKurs> | null;
    isin?: string | null;
}

