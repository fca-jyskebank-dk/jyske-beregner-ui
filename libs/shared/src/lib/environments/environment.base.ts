import { EnvironmentBase } from './environment.base.interface';

export enum environments {
  Localhost = 'localhost',
  Test = 'wcm2-jyskebank-dk-t.bdunet.dk',
  SystemTest = 'wcm2-jyskebank-dk-s.bdunet.dk',
  Prod = 'www.jyskebank.dk',
  JyskeFrihedPrivat = 'jyskefriheddemo.azurewebsites.net',
  JyskeBoligberegnerPrivat = 'jyske-boligberegner-app.azurewebsites.net',
  BeregnLaanIFrivaerdiPrivat = 'beregn-laan-i-frivaerdi-app.azurewebsites.net',
  JyskeKurslistePrivat = 'jyske-kursliste-app.azurewebsites.net',
  JyskeFrihedErhverv = 'jyskefriheddemo-erhverv.azurewebsites.net',
  BeregnLaanGenerel = 'generel-laan-app.azurewebsites.net',
}

export enum apiBaseUrls {
  Localhost = 'localhost:4210',
  Test = 'det-jyskeberegner-api.jyskebank.dk',
  SystemTest = 'det-jyskeberegner-api.jyskebank.dk',
  Prod = 'jyskeberegner-api.jyskebank.dk',
  JyskeFrihedPrivat = 'det-jyskeberegner-api.jyskebank.dk',
  JyskeBoligberegnerPrivat = 'det-jyskeberegner-api.jyskebank.dk',
  BeregnLaanIFrivaerdiPrivat = 'det-jyskeberegner-api.jyskebank.dk',
  JyskeKurslistePrivat = 'det-jyskeberegner-api.jyskebank.dk',
  JyskeFrihedErhverv = 'det-jyskeberegner-api.jyskebank.dk',
  BeregnLaanGenerel = 'det-jyskeberegner-api.jyskebank.dk',
}

export enum generelleJyskeBankBaseUrls {
  Localhost = 'wcm2-jyskebank-dk-t.bdunet.dk',
  Test = 'wcm2-jyskebank-dk-t.bdunet.dk',
  SystemTest = 'wcm2-jyskebank-dk-s.bdunet.dk',
  Prod = 'www.jyskebank.dk',
  JyskeBoligberegnerPrivat = 'wcm2-jyskebank-dk-t.bdunet.dk',
  BeregnLaanIFrivaerdiPrivat = 'wcm2-jyskebank-dk-t.bdunet.dk',
  BeregnLaanGenerel = 'wcm2-jyskebank-dk-t.bdunet.dk',
}

export function getEnvironmentBase(
  protocol: string,
  hostname: string
): EnvironmentBase {
  return {
    hostnameBaseUrl: getHostnameBaseUrl(protocol, hostname),
    apiBaseUrl: getApiBaseUrl(hostname),
  };
}

export function getEnvironmentGenerelJyskeBankBase(
  protocol: string,
  hostname: string
): EnvironmentBase {
  return {
    hostnameBaseUrl: getHostnameBaseUrl(protocol, hostname),
    apiBaseUrl: getGenerelJyskeBankBaseUrl(hostname),
  };
}

function getHostnameBaseUrl(protocol: string, hostname: string): string {
  for (const key in environments) {
    if (hostname.search(environments[key]) === 0) {
      return `${protocol}//${environments[key]}`;
    }
  }
  return `${protocol}//${environments['Test']}`;
}

export function getApiBaseUrl(hostname): string {
  for (const key in environments) {
    if (hostname.search(environments[key]) === 0) {
      return `//${apiBaseUrls[key]}`;
    }
  }
  return `//${apiBaseUrls['Test']}`;
}

export function getGenerelJyskeBankBaseUrl(hostname): string {
  for (const key in environments) {
    if (hostname.search(environments[key]) === 0) {
      return `//${generelleJyskeBankBaseUrls[key]}`;
    }
  }
  return `//${generelleJyskeBankBaseUrls['Test']}`;
}
