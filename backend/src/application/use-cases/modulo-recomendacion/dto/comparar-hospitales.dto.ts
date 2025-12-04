import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty } from "class-validator";

export class CompararHospitalesDto {
    
    @IsInt()
    @IsNotEmpty()
    idLocalidad: number;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsInt({ each: true })
    idHospitales: number[];
}