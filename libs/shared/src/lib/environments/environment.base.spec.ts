import * as base from './environment.base';

describe('EnvironmentBase', () => {
  describe('HostnameBaseUrl', () => {
    it('should be localhost', () => {
      // Arrange
      const protocol = 'http:';
      const hostname = base.environments.Localhost;

      // Act
      const actual = base.getEnvironmentBase(protocol, hostname);

      // Assert
      expect(actual.hostnameBaseUrl).toBe(`${protocol}//${hostname}/`);
    });

    it('should be localhost when unknown hostname', () => {
      // Arrange
      const protocol = 'http:';
      const hostname = 'unknown';

      // Act
      const actual = base.getEnvironmentBase(protocol, hostname);

      // Assert
      expect(actual.hostnameBaseUrl).toBe(`${protocol}//localhost/`);
    });

    it('should be WCM Test', () => {
      // Arrange
      const protocol = 'https:';
      const hostname = base.environments.SystemTest;

      // Act
      const actual = base.getEnvironmentBase(protocol, hostname);

      // Assert
      expect(actual.hostnameBaseUrl).toBe(`${protocol}//${hostname}/`);
    });

    it('should be WCM Prod', () => {
      // Arrange
      const protocol = 'https:';
      const hostname = base.environments.Prod;

      // Act
      const actual = base.getEnvironmentBase(protocol, hostname);

      // Assert
      expect(actual.hostnameBaseUrl).toBe(`${protocol}//${hostname}/`);
    });

    it('should be Azure Privat', () => {
      // Arrange
      const protocol = 'https:';
      const hostname = base.environments.DemoAzurePrivat;

      // Act
      const actual = base.getEnvironmentBase(protocol, hostname);

      // Assert
      expect(actual.hostnameBaseUrl).toBe(`${protocol}//${hostname}/`);
    });

    it('should be Azure Erhverv', () => {
      // Arrange
      const protocol = 'https:';
      const hostname = base.environments.DemoAzureErhverv;

      // Act
      const actual = base.getEnvironmentBase(protocol, hostname);

      // Assert
      expect(actual.hostnameBaseUrl).toBe(`${protocol}//${hostname}/`);
    });
  });

  describe('ApiBaseUrl', () => {
    it('should be localhost', () => {
      // Arrange
      const hostname = base.environments.Localhost;

      // Act
      const actual = base.getApiBaseUrl(hostname);

      // Assert
      expect(actual).toBe(`//${base.apiBaseUrls.Localhost}/`);
    });

    it('should be localhost when unknown hostname', () => {
      // Arrange
      const hostname = 'unknown';

      // Act
      const actual = base.getApiBaseUrl(hostname);

      // Assert
      expect(actual).toBe(`//${base.apiBaseUrls.Localhost}/`);
    });

    it('should be WCM Test', () => {
      // Arrange
      const hostname = base.environments.SystemTest;

      // Act
      const actual = base.getApiBaseUrl(hostname);

      // Assert
      expect(actual).toBe(`//${base.apiBaseUrls.SystemTest}/`);
    });

    it('should be WCM Prod', () => {
      // Arrange
      const hostname = base.environments.Prod;

      // Act
      const actual = base.getApiBaseUrl(hostname);

      // Assert
      expect(actual).toBe(`//${base.apiBaseUrls.Prod}/`);
    });

    it('should be Azure Privat', () => {
      // Arrange
      const hostname = base.environments.DemoAzurePrivat;

      // Act
      const actual = base.getApiBaseUrl(hostname);

      // Assert
      expect(actual).toBe(`//${base.apiBaseUrls.DemoAzurePrivat}/`);
    });

    it('should be Azure Erhverv', () => {
      // Arrange
      const hostname = base.environments.DemoAzureErhverv;

      // Act
      const actual = base.getApiBaseUrl(hostname);

      // Assert
      expect(actual).toBe(`//${base.apiBaseUrls.DemoAzureErhverv}/`);
    });
  });
});
