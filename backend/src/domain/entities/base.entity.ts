import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'fechaHoraCreacion', type: 'timestamp' })
  fechaHoraCreacion: Date;

  @UpdateDateColumn({ name: 'fechaHoraModificacion', type: 'timestamp' })
  fechaHoraModificacion: Date;

  @Column({ name: 'fechaHoraBaja', type: 'timestamp', nullable: true })
  fechaHoraBaja?: Date;
}
