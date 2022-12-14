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

import { FogoLightRequest } from '../model/models';
import { FogoLightResponse } from '../model/models';
import { ProblemDetails } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface FogoLightServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
     * Fogo Light beregning
     * 
     * @param fogoLightRequest 
     */
    apiFogoLightBeregnPost(fogoLightRequest?: FogoLightRequest, extraHttpRequestParams?: any): Observable<FogoLightResponse>;

}
