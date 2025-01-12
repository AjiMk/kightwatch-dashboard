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
const incidentReport_1 = __importDefault(require("../models/incidentReport"));
class IncidentReportController {
    incidentDataTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allIncidents = yield incidentReport_1.default.aggregate([
                {
                    $lookup: {
                        from: "servers", // The collection to join
                        localField: "server", // Field from the orders collection
                        foreignField: "_id", // Field from the customers collection
                        as: "server", // The name of the new array field to add to the orders documents
                    },
                },
                {
                    $unwind: {
                        path: "$server_info",
                        preserveNullAndEmptyArrays: true, // This ensures that unmatched orders still appear in the results
                    },
                },
            ]).sort({ createdAt: -1 });
            return res.render("dataTables/incidents-report-table", {
                data: allIncidents,
            });
        });
    }
    /**
     * All incidents table view
     *
     */
    tableView(req, res) {
        res.render("pages/incidens-table", { title: "All Incidents", test: "aaa" });
    }
}
exports.default = IncidentReportController;
