import { randomBytes } from 'crypto';

export const MockingDates = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MockingBaseItem = Object.freeze({
  id: randomBytes(16).toString('hex'),
  ...MockingDates,
});
