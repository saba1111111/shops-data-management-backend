import { UserTypes } from 'libs/users/enums';
import { z } from 'nestjs-zod/z';

const phoneNumberValidation = z.string().regex(/^(\+995)?(5\d{8})$/, {
  message:
    'Invalid Georgian phone number. Must start with +995 followed by 9 digits.',
});
const typeValidation = z.enum(Object.values(UserTypes) as [string]);
const passwordValidation = z
  .string()
  .min(8, {
    message: 'Password must be at least 8 characters long.',
  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  });

export const RegisterUserInputSchema = z.object({
  name: z.string(),
  surname: z.string(),
  phoneNumber: phoneNumberValidation,
  type: typeValidation,
  information: z.string().optional(),
  password: passwordValidation,
});
