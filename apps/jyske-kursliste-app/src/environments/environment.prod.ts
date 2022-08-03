import * as base from '@shared/environments/environment.base';

export const environment = {
  production: true,
  base_href: base.getEnvironmentBase(
    window.location.protocol,
    window.location.hostname
  ).hostnameBaseUrl,
  endpoints: {
    get jyskeBoligberegnerApiBaseUrl(): string {
      return base.getEnvironmentBase(
        window.location.protocol,
        window.location.hostname
      ).apiBaseUrl;
    },
  },
};
