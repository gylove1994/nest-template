import { DynamicModule } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';

export class FileModule {
  static forRoot(): DynamicModule {
    return {
      module: FileModule,
      providers: [FileService],
      controllers: [FileController],
      exports: [FileService],
      global: true,
    };
  }
}
