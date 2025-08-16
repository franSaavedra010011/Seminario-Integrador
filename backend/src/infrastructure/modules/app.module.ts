import { Module } from '@nestjs/common';
import { AppController } from '../../infrastructure/controllers/app.controller';
import { AppService } from '../../app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de infraestructura (vía imports relativos)
import { AuthModule } from '../../infrastructure/modules/auth.module';
import path from 'path';
import { AbmModule } from './abm.module';
import { RouterModule } from '@nestjs/core';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // el que configuraste
      password: '1234', // reemplaza con la real
      database: 'turnos_db',
      autoLoadEntities: true,
      synchronize: true, // ¡solo en desarrollo!
    }),
    RouterModule.register([
      {
        path: 'abm',
        module: AbmModule, // Asegúrate de que AbmModule esté importado correctamente
      }
    ]),
    AuthModule,
    AbmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
