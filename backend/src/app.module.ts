import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de infraestructura (vía imports relativos)
import { AuthModule } from './infrastructure/modules/auth.module';
import path from 'path';
import { AbmModule } from './infrastructure/modules/abm.module';
import { RouterModule } from '@nestjs/core';
import { RecomendacionModule } from './infrastructure/modules/recomendacion.module';
import { SharedModule } from './infrastructure/modules/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // el que configuraste
      password: 'admin', // reemplaza con la real
      database: 'turnos_db',
      autoLoadEntities: true,
      synchronize: true, // ¡solo en desarrollo!
    }),
    RouterModule.register([
      {
        path: 'abm',
        module: AbmModule, // Asegúrate de que AbmModule esté importado correctamente
      },
      {
        path: 'shared',
        module: SharedModule,
      },
    ]),
    AuthModule, AbmModule, RecomendacionModule, SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
