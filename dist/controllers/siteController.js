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
const site_1 = __importDefault(require("../models/site"));
class SiteController {
    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    allSitePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render("pages/all-sites", { title: "All Sites" });
        });
    }
    /**
     * All incidents table view
     *
     */
    registerPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render("pages/register-site", { title: "Site register" });
        });
    }
    serverDataTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = req.query.search || "";
            const option = req.query.option || "";
            const filterQuery = {};
            const allRegisters = yield site_1.default.aggregate([
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
            return res.render("dataTables/site-register-table", {
                data: allRegisters,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { website, url, server, tags } = req.body;
            const insertData = {
                website,
                url,
                server,
                tags,
            };
            const create = yield site_1.default.create(insertData);
            return res.json({ status: "ok", data: create });
        });
    }
}
exports.default = SiteController;
