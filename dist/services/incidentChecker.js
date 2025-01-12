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
const incidentReport_1 = __importDefault(require("../models/incidentReport"));
const axios_1 = __importDefault(require("axios"));
class IncidentChecker {
    constructor(cveRegister) {
        this.cveRegister = cveRegister;
    }
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const sites = yield site_1.default.find({ tags: this.cveRegister.tags });
            for (let i = 0; i < sites.length; i++) {
                const site = sites[i];
                const insertData = {
                    website: site.website,
                    server: site.server,
                    cve_id: (_a = this.cveRegister.cveMetadata) === null || _a === void 0 ? void 0 : _a.cveId,
                    tags: this.cveRegister.tags,
                };
                yield incidentReport_1.default.create(insertData);
            }
            const siteDetails = sites.map((site, index) => {
                return `
  #### ${index + 1}. **Website Name:** ${site.website}

  - **URL:** [${site.url}](${site.url})
  - **Tags:** ${site.tags.join(", ")}
      `;
            });
            const message = `
      # ⚠️ CVE Alert Notification ⚠️

  ## Attention Required: Website Security Checkup Needed

  Hello,

  Our system has detected that the following websites need to be checked against the latest CVE (Common Vulnerabilities and Exposures) updates to ensure they are secure and up-to-date.

  ### Websites Requiring Attention
${siteDetails}

  ### Recommended Actions

  1. **Review Latest CVEs:** Check the latest CVE entries related to your server and software.
  2. **Update Software:** Ensure all server software is up-to-date with the latest security patches.
  3. **Perform Security Audit:** Conduct a comprehensive security audit to identify and mitigate potential vulnerabilities.
  4. **Monitor Regularly:** Set up regular monitoring and alerts for new CVE entries affecting your servers and applications.

  ### How to Get Started

  - **Review CVEs:** Use the CVE Alert Bot to fetch the latest CVE details by typing \`latest\`.
  - **Search Specific CVEs:** Look up specific CVE IDs using \`search [CVE-ID]\`.
  - **Get Help:** If you need assistance, type \`help\` to learn more about using the bot's features.

  Keeping your websites secure is crucial to protect your data and users. Please prioritize these actions to maintain the integrity of your systems.

  If you have any questions or need further assistance, feel free to reach out.

  Stay safe and secure,
  **CVE Alert Bot Team**`;
            const url = "http://localhost:3978/api/notify";
            yield axios_1.default.post(url, {
                message: message,
            });
        });
    }
}
exports.default = IncidentChecker;
