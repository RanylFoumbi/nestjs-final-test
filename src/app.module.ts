import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule.forRoot({ port: "24000", dbName: "nestjs-final-test-db"})],
})
export class AppModule {}
