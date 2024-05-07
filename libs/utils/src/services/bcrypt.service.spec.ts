import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import * as bcrypt from 'bcrypt';

// When you call jest.mock('bcrypt'), Jest replaces every function in the bcrypt module with a Jest mock function. This means that calls to bcrypt.genSalt, bcrypt.hash, and bcrypt.compare within your test file now reference Jest's mock functions, which can be controlled and monitored in your tests.
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('BcryptService', () => {
  let service: BcryptService;
  let mockGenSalt: jest.Mock;
  let mockHash: jest.Mock;
  let mockCompare: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);

    mockGenSalt = bcrypt.genSalt as jest.Mock;
    mockHash = bcrypt.hash as jest.Mock;
    mockCompare = bcrypt.compare as jest.Mock;
    // Here we connect bcrypt mocks functions to variables.
  });

  describe('hash', () => {
    it('should generate a hash for the provided value', async () => {
      const value = 'password';
      const saltRounds = 10;
      const fakeSalt = 'fake_salt';
      const expectedHash = 'hashed_value';

      mockGenSalt.mockResolvedValue(fakeSalt);
      mockHash.mockResolvedValue(expectedHash);

      const result = await service.hash(value, saltRounds);
      expect(mockGenSalt).toHaveBeenCalledWith(saltRounds);
      expect(mockHash).toHaveBeenCalledWith(value, fakeSalt);
      expect(result).toBe(expectedHash);
    });

    it('should handle errors in hash generation', async () => {
      const error = new Error('hashing failed');
      mockGenSalt.mockRejectedValue(error);

      await expect(service.hash('password')).rejects.toThrow(error);
    });
  });

  describe('compare', () => {
    it('should return true when comparison is successful', async () => {
      const value = 'password';
      const encryptedValue = 'encrypted_password';
      mockCompare.mockResolvedValue(true);

      const result = await service.compare(value, encryptedValue);
      expect(mockCompare).toHaveBeenCalledWith(value, encryptedValue);
      expect(result).toBe(true);
    });

    it('should return false when comparison is unsuccessful', async () => {
      const value = 'password';
      const encryptedValue = 'wrong_encrypted_password';
      mockCompare.mockResolvedValue(false);

      const result = await service.compare(value, encryptedValue);
      expect(mockCompare).toHaveBeenCalledWith(value, encryptedValue);
      expect(result).toBe(false);
    });
  });
});
