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
exports.CVERegisterModel = void 0;
const mongoose_1 = require("mongoose");
const CVERegisterSchema = new mongoose_1.Schema({
    dataType: { type: String },
    dataVersion: { type: String },
    cveMetadata: {
        cveId: { type: String },
        assignerOrgId: { type: String },
        state: { type: String },
        assignerShortName: { type: String },
        dateReserved: { type: Date },
        datePublished: { type: Date },
        dateUpdated: { type: Date },
    },
    containers: {
        cna: {
            providerMetadata: {
                orgId: { type: String },
                shortName: { type: String },
                dateUpdated: { type: Date },
            },
            title: { type: String },
            problemTypes: [
                {
                    descriptions: [
                        {
                            type: { type: String },
                            cweId: { type: String },
                            lang: { type: String },
                            description: { type: String },
                        },
                    ],
                },
            ],
            affected: [
                {
                    vendor: { type: String },
                    product: { type: String },
                    versions: [
                        {
                            version: { type: String },
                            status: { type: String },
                        },
                    ],
                },
            ],
            descriptions: [
                {
                    lang: { type: String },
                    value: { type: String },
                },
            ],
            metrics: [
                {
                    cvssV4_0: {
                        version: { type: String },
                        baseScore: { type: Number },
                        vectorString: { type: String },
                        baseSeverity: { type: String },
                    },
                    cvssV3_1: {
                        version: { type: String },
                        baseScore: { type: Number },
                        vectorString: { type: String },
                        baseSeverity: { type: String },
                    },
                    cvssV3_0: {
                        version: { type: String },
                        baseScore: { type: Number },
                        vectorString: { type: String },
                        baseSeverity: { type: String },
                    },
                    cvssV2_0: {
                        version: { type: String },
                        baseScore: { type: Number },
                        vectorString: { type: String },
                    },
                },
            ],
            timeline: [
                {
                    time: { type: Date },
                    lang: { type: String },
                    value: { type: String },
                },
            ],
            credits: [
                {
                    lang: { type: String },
                    value: { type: String },
                    type: { type: String },
                },
            ],
            references: [
                {
                    url: { type: String },
                    name: { type: String },
                    tags: [{ type: String }],
                },
            ],
        },
    },
    tags: [{ type: String }],
}, { timestamps: true });
CVERegisterSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // await new IncidentChecker(doc).check();
        next();
    });
});
exports.CVERegisterModel = (0, mongoose_1.model)("cve_registers", CVERegisterSchema);
