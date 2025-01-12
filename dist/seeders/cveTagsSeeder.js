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
const tagCriteria_1 = require("../models/tagCriteria");
class CveTagsSeeder extends seeder_1.default {
    /**
     * All tags
     *
     * @returns
     */
    allTags() {
        return {
            // Programming Languages
            JavaScript: ["node.js", "react", "angular", "javascript"],
            Python: ["python", "django", "flask"],
            PHP: ["php", "laravel", "wordpress"],
            Java: ["java", "spring", "hibernate"],
            "C#": ["c#", ".net", "asp.net"],
            "C++": ["c++", "cpp"],
            Ruby: ["ruby", "rails"],
            Go: ["go", "golang"],
            Swift: ["swift"],
            Kotlin: ["kotlin"],
            R: ["r"],
            TypeScript: ["typescript", "ts"],
            SQL: ["sql"],
            // Frameworks
            Spring: ["spring"],
            Hibernate: ["hibernate"],
            React: ["react"],
            Angular: ["angular"],
            Vue: ["vue"],
            Django: ["django"],
            Flask: ["flask"],
            Express: ["express"],
            Rails: ["rails"],
            "ASP.NET": ["asp.net", ".net"],
            Laravel: ["laravel"],
            WordPress: ["wordpress"],
            // Operating Systems
            Windows: ["windows"],
            Linux: ["linux", "ubuntu", "debian", "centos", "redhat"],
            macOS: ["macos", "osx"],
            Android: ["android"],
            iOS: ["ios"],
            // Vulnerability Types
            "SQL Injection": ["sql injection", "sql"],
            XSS: ["cross site scripting", "xss"],
            CSRF: ["cross site request forgery", "csrf"],
            RCE: ["remote code execution", "rce"],
            LFI: ["local file inclusion", "lfi"],
            RFI: ["remote file inclusion", "rfi"],
            XXE: ["xml external entity", "xxe"],
            "Privilege Escalation": ["privilege escalation"],
            "Directory Traversal": ["directory traversal"],
            "Buffer Overflow": ["buffer overflow"],
        };
    }
    /**
     * Seeder name
     *
     * @returns
     */
    getName() {
        return __filename;
    }
    /**
     *
     *
     * @returns {Promise<TagCriteria[]>}
     */
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const allInsertData = [];
            const allTags = this.allTags();
            const allKeyWords = Object.keys(allTags);
            for (let i = 0; i < allKeyWords.length; i++) {
                const keyword = allKeyWords[i];
                const tags = allTags[keyword];
                const insertData = {
                    tagName: keyword,
                    tags: tags,
                };
                allInsertData.push(insertData);
            }
            return allInsertData;
        });
    }
    /**
     *
     * @param {TagCriteria[]} insertData
     * @return {Promise<boolean>}
     */
    seed(insertData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tagCriteria_1.TagCriteriaModel.create(insertData);
            return true;
        });
    }
}
exports.default = CveTagsSeeder;
