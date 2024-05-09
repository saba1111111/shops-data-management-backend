import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { CreateUserPermissionSchema } from '../schemas';

export class CreateUserPermissionCredentialsDto extends createZodDto(
  CreateUserPermissionSchema,
) {
  @ApiProperty({
    type: Boolean,
    description:
      'Specifies whether the permission allows the user to perform a certain action. If true, the user is allowed; if false, the user is denied.',
  })
  allow: boolean;

  @ApiProperty({
    type: String,
    description: 'The ID of the user to whom the permission is assigned.',
  })
  userId: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the permission being assigned to the user.',
  })
  permissionId: string;
}
