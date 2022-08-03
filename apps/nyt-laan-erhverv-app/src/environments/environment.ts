// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

import * as base from '@shared/environments/environment.base';

export const environment = {
  production: false,
  base_href: base.getEnvironmentBase(
    window.location.protocol,
    window.location.hostname
  ).hostnameBaseUrl,
  endpoints: {
    get nytLaanErhvervApiBaseUrl(): string {
      return base.getEnvironmentBase(
        window.location.protocol,
        window.location.hostname
      ).apiBaseUrl;
    },
  },
};
