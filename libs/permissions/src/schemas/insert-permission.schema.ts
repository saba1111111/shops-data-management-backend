import { z } from 'nestjs-zod/z';
import { PermissionTypes, Resources } from '../enums';

const typeValidation = z.enum(Object.values(PermissionTypes) as [string]);
const resourceValidation = z.enum(Object.values(Resources) as [string]);
const descriptionValidation = z.string().optional();

export const CreatePermissionSchema = z.object({
  type: typeValidation,
  resource: resourceValidation,
  description: descriptionValidation,
});

const UpdatePermissionSchema = z.object({
  type: typeValidation.optional(),
  resource: resourceValidation.optional(),
  description: descriptionValidation,
});

export const UpdatePermissionSchemaWithRequirement =
  UpdatePermissionSchema.superRefine((data, ctx) => {
    if (
      data.type === undefined &&
      data.resource === undefined &&
      data.description === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided',
      });
    }
  });
