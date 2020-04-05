import InstanceManager from '../.';

describe('Instance Manager', () => {
  test('Initializes', () => {
    expect(new InstanceManager<any, any>()).toBeTruthy();
  });
});
