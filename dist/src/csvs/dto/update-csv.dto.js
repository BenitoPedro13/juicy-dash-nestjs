"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCsvDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_csv_dto_1 = require("./create-csv.dto");
class UpdateCsvDto extends (0, mapped_types_1.PartialType)(create_csv_dto_1.CreateCsvDto) {
}
exports.UpdateCsvDto = UpdateCsvDto;
//# sourceMappingURL=update-csv.dto.js.map