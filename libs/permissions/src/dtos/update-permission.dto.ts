import { createZodDto } from 'nestjs-zod';
import { UpdatePermissionSchemaWithRequirement } from '../schemas';
import { PermissionTypes, Resources } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { ListPossibleValues } from 'libs/common/helpers';

export class UpdatePermissionDto extends createZodDto(
  UpdatePermissionSchemaWithRequirement,
) {
  @ApiProperty({
    enum: PermissionTypes,
    example: `Available types: ${ListPossibleValues(PermissionTypes)}.`,
    required: false,
  })
  type?: PermissionTypes;

  @ApiProperty({
    enum: Resources,
    example: `Available resources: ${ListPossibleValues(Resources)}.`,
    required: false,
  })
  resource?: Resources;

  @ApiProperty({
    type: String,
    required: false,
  })
  description?: string;
}
