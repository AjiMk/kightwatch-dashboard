"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incidentChecker_1 = __importDefault(require("../services/incidentChecker"));
const mongoose_1 = require("mongoose");
const cveRegister_1 = require("../models/cveRegister");
const mongoose_2 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_2.default.connect(config_1.default.dbURI, {});
        const registerId = new mongoose_1.Types.ObjectId("6679919fe1172000965f4edb");
        const cveRecord = yield cveRegister_1.CVERegisterModel.findById(registerId).orFail();
        yield new incidentChecker_1.default(cveRecord).check();
    });
}
main();
