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
const server_1 = __importDefault(require("../models/server"));
class ServerController {
    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    allServerPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render("pages/all-servers", {
                title: "All Servers",
            });
        });
    }
    /**
     * All incidents table view
     *
     */
    registerPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render("pages/register-server", { title: "Server register" });
        });
    }
    serverDataTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = req.query.search || "";
            const option = req.query.option || "";
            const filterQuery = {};
            const allRegisters = yield server_1.default.find(filterQuery).sort({ createdAt: -1 });
            return res.render("dataTables/server-register-table", {
                data: allRegisters,
            });
        });
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allServers = yield server_1.default.find({});
            return res.json({ status: "ok", data: allServers });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serverName, ipAddress, operatingSystem } = req.body;
            const insertData = {
                serverName,
                ipAddress,
                operatingSystem,
            };
            const create = yield server_1.default.create(insertData);
            return res.json({ status: "ok", data: create });
        });
    }
}
exports.default = ServerController;
