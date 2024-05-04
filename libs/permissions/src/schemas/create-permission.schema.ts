import { z } from 'nestjs-zod/z';
import { PermissionTypes, Resources } from '../enums';

export const CreatePermissionSchema = z.object({
  type: z.enum(Object.values(PermissionTypes) as unknown as [string]),
  resource: z.enum(Object.values(Resources) as unknown as [string]),
  description: z.string().optional(),
});
