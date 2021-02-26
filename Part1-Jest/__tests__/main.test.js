const main = require('../assets/scripts/main');

describe('volume level', () => {
  test('is 3', () => {
    expect(main(67)).toBe('./assets/media/icons/volume-level-3.svg');
  });

  test('is 2', () => {
    expect(main(34)).toBe('./assets/media/icons/volume-level-2.svg');
  });

  test('is 1', () => {
    expect(main(1)).toBe('./assets/media/icons/volume-level-1.svg');
  });

  test('is 0', () => {
    expect(main(0)).toBe('./assets/media/icons/volume-level-0.svg');
  });
});
