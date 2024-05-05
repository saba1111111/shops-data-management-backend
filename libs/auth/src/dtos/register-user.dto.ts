import { createZodDto } from 'nestjs-zod';
import { RegisterUserInputSchema } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';
import { UserTypes } from 'libs/users/enums';
import { ListPossibleValues } from 'libs/common/helpers';

export class RegisterUserDto extends createZodDto(RegisterUserInputSchema) {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'Doe',
  })
  surname: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+995555555555',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'VerySecurePassword123!',
  })
  password: string;

  @ApiProperty({
    description: 'The type of the user.',
    enum: UserTypes,
    example: `Available types: ${ListPossibleValues(UserTypes)}.`,
  })
  type: UserTypes;

  @ApiProperty({
    description: 'Additional information about the user',
    example: 'Loves programming in TypeScript',
    required: false,
  })
  information?: string;
}
