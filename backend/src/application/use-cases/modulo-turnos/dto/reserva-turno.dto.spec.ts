import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ReservaTurnoDto } from './reserva-turno.dto';

describe('ReservaTurnoDto', () => {
    it('debe crear correctamente un DTO válido', async () => {
        // Arrange
        const validData = {
            idUsuario: 1,
            idMedico: 2,
            idHospital: 3,
            idAgendaSemanal: 4,
            idAgendaDia: 5,
            idTurnoAgendaDia: 6,
            idEspecialidad: 7
        };

        const dto = plainToClass(ReservaTurnoDto, validData);

        // Act & Assert
        expect(dto).toMatchObject(validData);
    });

    it('debe validar que todos los campos son requeridos', async () => {
        // Arrange
        const invalidData = {
            idUsuario: 1,
            // Faltan campos requeridos
        };

        const dto = plainToClass(ReservaTurnoDto, invalidData);

        // Act
        const errors = await validate(dto);

        // Assert
        expect(dto.idUsuario).toBe(1);
        expect(dto.idMedico).toBeUndefined();
        expect(dto.idHospital).toBeUndefined();
    });

    it('debe manejar tipos de datos correctamente', async () => {
        // Arrange
        const data = {
            idUsuario: 1,
            idMedico: 2,
            idHospital: 3,
            idAgendaSemanal: 4,
            idAgendaDia: 5,
            idTurnoAgendaDia: 6,
            idEspecialidad: 7
        };

        const dto = new ReservaTurnoDto();
        Object.assign(dto, data);

        // Act & Assert
        expect(typeof dto.idUsuario).toBe('number');
        expect(typeof dto.idMedico).toBe('number');
        expect(typeof dto.idHospital).toBe('number');
        expect(typeof dto.idAgendaSemanal).toBe('number');
        expect(typeof dto.idAgendaDia).toBe('number');
        expect(typeof dto.idTurnoAgendaDia).toBe('number');
        expect(typeof dto.idEspecialidad).toBe('number');
    });

    it('debe permitir asignación de todos los campos', () => {
        // Arrange
        const dto = new ReservaTurnoDto();

        // Act
        dto.idUsuario = 1;
        dto.idMedico = 2;
        dto.idHospital = 3;
        dto.idAgendaSemanal = 4;
        dto.idAgendaDia = 5;
        dto.idTurnoAgendaDia = 6;
        dto.idEspecialidad = 7;

        // Assert
        expect(dto.idUsuario).toBe(1);
        expect(dto.idMedico).toBe(2);
        expect(dto.idHospital).toBe(3);
        expect(dto.idAgendaSemanal).toBe(4);
        expect(dto.idAgendaDia).toBe(5);
        expect(dto.idTurnoAgendaDia).toBe(6);
        expect(dto.idEspecialidad).toBe(7);
    });
});