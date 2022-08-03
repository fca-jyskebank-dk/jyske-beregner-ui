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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { FastrenteFrihedDefaultUdbetalingRequest } from '../model/models';
import { OblFrihedUdbetalingErhvervResponse } from '../model/models';
import { ProblemDetails } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface BoligudlejningServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
     * 
     * 
     * @param fastrenteFrihedDefaultUdbetalingRequest 
     */
    apiErhvervBoligudlejningProdukterFastrenteFrihedDefaultPost(fastrenteFrihedDefaultUdbetalingRequest?: FastrenteFrihedDefaultUdbetalingRequest, extraHttpRequestParams?: any): Observable<OblFrihedUdbetalingErhvervResponse>;

}
