import express, { Application } from "express";
import session from "express-session";
import connectMongo from "connect-mongo";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./utils/db";
import path from "path";
import IncidentReportController from "./controllers/incidentReportController";
import CveRegisterController from "./controllers/cveRegisterController";
import SiteController from "./controllers/siteController";
import ServerController from "./controllers/serverController";
import TagController from "./controllers/tagController";
import MetadataController from "./controllers/metadataController";

const app: Application = express();
const incidentReportController = new IncidentReportController();
const cveRegisterController = new CveRegisterController();
const siteController = new SiteController();
const serverController = new ServerController();
const tagController = new TagController();
const metaDataController = new MetadataController();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Routes
app.use("/api/users", userRoutes);

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
app.get(
  "/all-incidents-report-table-view",
  incidentReportController.incidentDataTable
);

app.get("/failed-events", (req, res) => {
  res.render("pages/failed-events", { title: "Failed events" });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact" });
});

app.get("/", (req, res) => {
  return res.send("hello world!!")
  // res.render("pages/index", { title: "Home" });
});

// Connect to database
connectDB();

export default app;
