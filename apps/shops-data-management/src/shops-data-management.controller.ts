import { Controller, Get } from '@nestjs/common';
import { ShopsDataManagementService } from './shops-data-management.service';

@Controller()
export class ShopsDataManagementController {
  constructor(
    private readonly shopsDataManagementService: ShopsDataManagementService,
  ) {}

  @Get()
  getHello(): string {
    return this.shopsDataManagementService.getHello();
  }
}
