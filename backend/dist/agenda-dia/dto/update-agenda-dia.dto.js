"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAgendaDiaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_agenda_dia_dto_1 = require("./create-agenda-dia.dto");
class UpdateAgendaDiaDto extends (0, mapped_types_1.PartialType)(create_agenda_dia_dto_1.CreateAgendaDiaDto) {
}
exports.UpdateAgendaDiaDto = UpdateAgendaDiaDto;
//# sourceMappingURL=update-agenda-dia.dto.js.map