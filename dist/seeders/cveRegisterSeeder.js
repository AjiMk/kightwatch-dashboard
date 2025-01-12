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
const seeder_1 = __importDefault(require("./seeder"));
const promises_1 = require("fs/promises");
const cveRegister_1 = require("../models/cveRegister");
const tagCriteria_1 = require("../models/tagCriteria");
class CveRegisterSeeder extends seeder_1.default {
    /**
     * Get file name
     *
     * @returns {string}
     */
    getName() {
        return __filename;
    }
    /**
     * Get seed data
     *
     * @returns {Promise<CVERegister[]>}
     */
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAllCveRecords();
        });
    }
    /**
     * Seed data to db
     *
     * @returns {Promise<boolean>}
     */
    seed(cveRegisters) {
        return __awaiter(this, void 0, void 0, function* () {
            const chunkSize = 5000;
            for (let i = 0; i < cveRegisters.length; i += chunkSize) {
                const chunk = cveRegisters.slice(i, i + chunkSize);
                try {
                    const docs = yield cveRegister_1.CVERegisterModel.insertMany(chunk);
                }
                catch (err) {
                    console.error('Batch insert error:', err);
                }
            }
            return true;
        });
    }
    /**
     * All cve records
     *
     * @returns {Promise<CVERegister>}
     */
    getAllCveRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = process.env.CVE_DB_PATH;
            const queue = [path];
            const allKeywords = yield this.allTagKeywords();
            const allRegisters = [];
            while (queue.length > 0) {
                const currentPath = queue.shift();
                const files = yield (0, promises_1.readdir)(currentPath);
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fullPath = currentPath + "/" + file;
                    const fileExtension = fullPath.split(".")[1];
                    const statResult = yield (0, promises_1.stat)(fullPath);
                    try {
                        if (statResult.isDirectory()) {
                            queue.push(fullPath);
                        }
                        else if (fileExtension === "json") {
                            const content = yield (0, promises_1.readFile)(fullPath, { encoding: "utf-8" });
                            const jsonData = JSON.parse(content);
                            const tags = this.getCveRecordTags(jsonData, allKeywords);
                            /**
                             * Insert data
                             *
                             */
                            const insertData = Object.assign({}, jsonData);
                            insertData.tags = tags;
                            allRegisters.push(insertData);
                        }
                        else {
                            console.log(`some other files: ${fullPath}`);
                        }
                    }
                    catch (e) {
                        console.log(e);
                        break;
                    }
                }
            }
            return allRegisters;
        });
    }
    /**
     * Get all CVE record tags
     *
     * @param {CVERecord} cveData
     * @param {string[]} keywords
     * @returns {string[]}
     */
    getCveRecordTags(cveData, keywords) {
        var _a, _b;
        const tags = [];
        const allDescriptions = ((_b = (_a = cveData.containers) === null || _a === void 0 ? void 0 : _a.cna) === null || _b === void 0 ? void 0 : _b.descriptions) || [];
        const descriptionText = allDescriptions
            .map((desc) => desc.value.toLowerCase())
            .join(" ");
        for (const keyword of keywords) {
            if (descriptionText.includes(keyword.toLowerCase())) {
                tags.push(keyword);
            }
        }
        return tags;
    }
    /**
     * Get all tag keywords
     *
     * @returns {Promise<string[]>}
     */
    allTagKeywords() {
        return __awaiter(this, void 0, void 0, function* () {
            const tagCriterias = yield tagCriteria_1.TagCriteriaModel.find().select("tags");
            let allTags = [];
            for (let i = 0; i < tagCriterias.length; i++) {
                const tagCriteria = tagCriterias[i].tags;
                allTags = allTags.concat(tagCriteria);
            }
            return allTags;
        });
    }
}
exports.default = CveRegisterSeeder;
