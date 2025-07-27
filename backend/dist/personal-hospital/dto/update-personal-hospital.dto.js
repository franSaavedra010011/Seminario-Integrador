"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonalHospitalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_personal_hospital_dto_1 = require("./create-personal-hospital.dto");
class UpdatePersonalHospitalDto extends (0, mapped_types_1.PartialType)(create_personal_hospital_dto_1.CreatePersonalHospitalDto) {
}
exports.UpdatePersonalHospitalDto = UpdatePersonalHospitalDto;
//# sourceMappingURL=update-personal-hospital.dto.js.map