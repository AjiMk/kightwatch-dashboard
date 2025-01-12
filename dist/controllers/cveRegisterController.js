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
const cveRegister_1 = require("../models/cveRegister");
class CveRegisterController {
    /**
     * All incidents table view
     *
     */
    tableView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("pages/cve-registers", {
                title: "All Incidents",
            });
        });
    }
    allRegisters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = req.query.search || "";
            const option = req.query.option || "";
            const filterQuery = { dataType: "CVE_RECORD" };
            if (search) {
                filterQuery["$or"] = [
                    { "cveMetadata.cveId": { $regex: search, $options: "i" } },
                    { tags: { $in: [search] } },
                ];
            }
            const allRegisters = yield cveRegister_1.CVERegisterModel.find(filterQuery)
                .limit(limit)
                .skip(page)
                .sort({ createdAt: -1 });
            return res.render("dataTables/cve-register-table", {
                data: allRegisters,
            });
        });
    }
}
exports.default = CveRegisterController;
