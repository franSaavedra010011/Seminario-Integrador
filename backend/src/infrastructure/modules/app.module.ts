import { Module } from '@nestjs/common';
import { AppController } from 'src/infrastructure/controllers/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de infraestructura (vía imports relativos)
import { AuthModule } from 'src/infrastructure/modules/auth.module';
import { AbmModule } from 'src/infrastructure/modules/abm.module';
import { RouterModule } from '@nestjs/core';
import { RecomendacionModule } from 'src/infrastructure/modules/recomendacion.module';
import { SharedModule } from 'src/infrastructure/modules/shared.module';
import { Turno } from 'src/domain/entities/turno.entity';
import { TurnoModule } from 'src/infrastructure/modules/turno.module';

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
    AuthModule, AbmModule, RecomendacionModule, SharedModule, TurnoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }