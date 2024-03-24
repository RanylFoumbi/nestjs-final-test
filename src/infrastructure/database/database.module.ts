import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({})
export class DatabaseModule {
  static forRoot(options: Record<string, string>): DynamicModule {
    const port: string = options.port;
    const dbName: string = options.dbName;
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DatabaseService,
          useClass: DatabaseService,
        }
      ],
      imports: [
        MongooseModule.forRoot(`mongodb://localhost:${port}/${dbName}`),
      ],
      exports: [
        MongooseModule
      ],
    };
  }
}
