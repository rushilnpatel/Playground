import { PortalHostDirective } from './portal.directive';

describe('PortalHostDirective', () => {
  it('should create an instance', () => {
      const directive = new PortalHostDirective(null, null, null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
