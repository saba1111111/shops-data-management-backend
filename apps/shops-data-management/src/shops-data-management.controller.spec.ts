import { Test, TestingModule } from '@nestjs/testing';
import { ShopsDataManagmentController } from './shops-data-management.controller';
import { ShopsDataManagmentService } from './shops-data-management.service';

describe('ShopsDataManagmentController', () => {
  let shopsDataManagmentController: ShopsDataManagmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShopsDataManagmentController],
      providers: [ShopsDataManagmentService],
    }).compile();

    shopsDataManagmentController = app.get<ShopsDataManagmentController>(
      ShopsDataManagmentController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shopsDataManagmentController.getHello()).toBe('Hello World!');
    });
  });
});
