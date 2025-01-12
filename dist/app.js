"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = require("./utils/db");
const path_1 = __importDefault(require("path"));
const incidentReportController_1 = __importDefault(require("./controllers/incidentReportController"));
const cveRegisterController_1 = __importDefault(require("./controllers/cveRegisterController"));
const siteController_1 = __importDefault(require("./controllers/siteController"));
const serverController_1 = __importDefault(require("./controllers/serverController"));
const tagController_1 = __importDefault(require("./controllers/tagController"));
const metadataController_1 = __importDefault(require("./controllers/metadataController"));
const app = (0, express_1.default)();
const incidentReportController = new incidentReportController_1.default();
const cveRegisterController = new cveRegisterController_1.default();
const siteController = new siteController_1.default();
const serverController = new serverController_1.default();
const tagController = new tagController_1.default();
const metaDataController = new metadataController_1.default();
// Middleware
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
// Routes
app.use("/api/users", userRoutes_1.default);
/**
 * Get meta data
 *
 */
app.get("/api/meta", metaDataController.getMetadata);
/**
 * CVE register routes
 *
 */
app.get("/all-cve-registers", cveRegisterController.tableView);
app.get("/all-cve-registers-table-view", cveRegisterController.allRegisters);
/**
 * Site routes
 *
 */
app.get("/all-sites", siteController.allSitePage);
app.get("/all-sites-table-view", siteController.serverDataTable);
app.get("/site-register", siteController.registerPage);
app.post("/api/site/reigster", siteController.register);
/**
 * Server routes
 *
 */
app.get("/all-servers", serverController.allServerPage);
app.get("/all-servers-table-view", serverController.serverDataTable);
app.get("/server-register", serverController.registerPage);
app.post("/api/server/reigster", serverController.register);
app.get("/api/all-servers", serverController.all);
/**
 * All tags
 *
 */
app.get("/api/all-tags", tagController.all);
app.get("/all-incidents", incidentReportController.tableView);
app.get("/all-incidents-report-table-view", incidentReportController.incidentDataTable);
app.get("/failed-events", (req, res) => {
    res.render("pages/failed-events", { title: "Failed events" });
});
app.get("/contact", (req, res) => {
    res.render("pages/contact", { title: "Contact" });
});
app.get("/", (req, res) => {
    return res.send("hello world!!");
    // res.render("pages/index", { title: "Home" });
});
// Connect to database
(0, db_1.connectDB)();
exports.default = app;
