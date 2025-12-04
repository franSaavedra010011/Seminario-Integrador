import { IsInt, IsNotEmpty } from "class-validator";

export class ConsultarCongestionHospitalDto {
    @IsInt()
    @IsNotEmpty()
    idHospital: number;
}