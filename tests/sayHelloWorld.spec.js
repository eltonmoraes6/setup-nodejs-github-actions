const sayHelloWorld = require('../src/services/sayHelloWorld');

describe('Say Hello tests', () => {
  it('Should say Hello World', () => {
    const response = sayHelloWorld.sayHello();

    expect(response).toBe('Hello World!');
  });

  it('Should say Hello Elton Moraes', () => {
    const response = sayHelloWorld.sayHello('Elton Moraes');

    expect(response).toBe('Hello Elton Moraes!');
  });
});
