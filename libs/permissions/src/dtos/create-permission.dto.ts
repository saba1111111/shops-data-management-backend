import { createZodDto } from 'nestjs-zod';
import { CreatePermissionSchema } from '../schemas';
import { PermissionTypes, Resources } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { ListPossibleValues } from 'libs/common/helpers';

export class CreatePermissionDto extends createZodDto(CreatePermissionSchema) {
  @ApiProperty({
    enum: PermissionTypes,
    example: `Available types: ${ListPossibleValues(PermissionTypes)}.`,
  })
  type: PermissionTypes;

  @ApiProperty({
    enum: Resources,
    example: `Available resources: ${ListPossibleValues(Resources)}.`,
  })
  resource: Resources;

  @ApiProperty({
    type: String,
    required: false,
  })
  description: string;
}
