import { Document, Schema, model } from "mongoose";
import IncidentChecker from "../services/incidentChecker";

interface CVEMetadata {
  cveId: string;
  assignerOrgId: string;
  state: string;
  assignerShortName: string;
  dateReserved: string;
  datePublished: string;
  dateUpdated: string;
}

interface ProviderMetadata {
  orgId: string;
  shortName: string;
  dateUpdated: string;
}

interface Description {
  lang: string;
  value: string;
}

interface ProgramFile {
  version: string;
  lessThan?: string;
  lessThanOrEqual?: string;
  status: string;
  versionType?: string;
}

interface Affected {
  product: string;
  vendor: string;
  defaultStatus: string;
  repo: string;
  programFiles: string[];
  versions: ProgramFile[];
}

interface Reference {
  url: string;
}

interface XGenerator {
  engine: string;
}

interface CNA {
  providerMetadata: ProviderMetadata;
  descriptions: Description[];
  affected: Affected[];
  references: Reference[];
  title: string;
  x_generator: XGenerator;
}

interface Containers {
  cna: CNA;
}

export interface CVERecord {
  dataType: string;
  dataVersion: string;
  cveMetadata: CVEMetadata;
  containers: Containers;
}

export interface CVERegister extends Document {
  dataType?: string;
  dataVersion?: string;
  cveMetadata?: {
    cveId: string;
    assignerOrgId: string;
    state: string;
    assignerShortName: string;
    dateReserved: Date;
    datePublished: Date;
    dateUpdated: Date;
  };
  containers?: {
    cna?: {
      providerMetadata?: {
        orgId: string;
        shortName: string;
        dateUpdated: Date;
      };
      title: string;
      problemTypes?: {
        descriptions: {
          type: string;
          cweId: string;
          lang: string;
          description: string;
        }[];
      }[];
      affected?: {
        vendor: string;
        product: string;
        versions: {
          version: string;
          status: string;
        }[];
      }[];
      descriptions?: {
        lang: string;
        value: string;
      }[];
      metrics?: {
        cvssV4_0?: {
          version: string;
          baseScore: number;
          vectorString: string;
          baseSeverity: string;
        };
        cvssV3_1?: {
          version: string;
          baseScore: number;
          vectorString: string;
          baseSeverity: string;
        };
        cvssV3_0?: {
          version: string;
          baseScore: number;
          vectorString: string;
          baseSeverity: string;
        };
        cvssV2_0?: {
          version: string;
          baseScore: number;
          vectorString: string;
        };
      }[];
      timeline?: {
        time: Date;
        lang: string;
        value: string;
      }[];
      credits?: {
        lang: string;
        value: string;
        type: string;
      }[];
      references?: {
        url: string;
        name: string;
        tags: string[];
      }[];
    };
  };
  tags?: string[];
}

const CVERegisterSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

CVERegisterSchema.post("save", async function (doc: CVERegister, next) {
  // await new IncidentChecker(doc).check();
  next();
});

export const CVERegisterModel = model<CVERegister>(
  "cve_registers",
  CVERegisterSchema
);
