const sayWelcomeAPI = require('../src/services/sayWelcomeAPI');

describe('Say Welcome tests', () => {
  it('Should say Hello Elton Moraes', () => {
    const response = sayWelcomeAPI.sayWelcome(
      'Welcome to the Deploy-First-Demo-API'
    );
    expect(response).toBe('Welcome to the Deploy-First-Demo-API');
  });
});
