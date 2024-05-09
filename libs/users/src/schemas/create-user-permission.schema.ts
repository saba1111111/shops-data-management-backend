import { z } from 'nestjs-zod/z';

export const CreateUserPermissionSchema = z.object({
  allow: z.boolean(),
  userId: z.string(),
  permissionId: z.string(),
});
