import { CustomGeneratorService } from './custom-generator.service';

describe('CustomGeneratorService', () => {
  let service: CustomGeneratorService;

  beforeEach(() => {
    service = new CustomGeneratorService();
  });

  it.each([1, 2, 3, 4, 5])('should generate a %d-digit number', (digits) => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9999);
    const generatedCode = service.generateCode(digits);

    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    expect(generatedCode).toBeGreaterThanOrEqual(min);
    expect(generatedCode).toBeLessThanOrEqual(max);
    expect(generatedCode.toString().length).toBe(digits);

    jest.spyOn(Math, 'random').mockRestore();
  });

  it('should cover the entire possible range of values', () => {
    const digits = 3;
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(service.generateCode(digits)).toBe(min);

    jest.spyOn(Math, 'random').mockReturnValue(0.9999999999999999);
    expect(service.generateCode(digits)).toBe(max);

    jest.spyOn(Math, 'random').mockRestore();
  });
});
