import { IsInt, IsNotEmpty } from "class-validator";

export class DetalleHospitalDto {
    @IsInt()
    @IsNotEmpty()
    idHospital: number;
}
