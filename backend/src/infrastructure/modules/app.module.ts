import { Module } from '@nestjs/common';
import { AppController } from '../../infrastructure/controllers/app.controller';
import { AppService } from '../../app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de infraestructura (vía imports relativos)
import { AuthModule } from '../../infrastructure/modules/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // el que configuraste
      password: '1234', // reemplaza con la real
      database: 'turnos_db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, // ¡solo en desarrollo!
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
