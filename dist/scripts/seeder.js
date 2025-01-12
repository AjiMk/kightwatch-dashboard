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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
const allSeeders_1 = require("../seeders/allSeeders");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
        for (const seeder of allSeeders_1.allSeeders) {
            const seederInstance = new seeder();
            const seederName = seederInstance.getName();
            console.log(`\x1b[33m Seeding: \x1b[0m ${seederName}`);
            yield seederInstance.run();
            console.log(`\x1b[32m Seeded:  \x1b[0m ${seederName}`);
        }
        process.exit();
    });
}
run();
