import config from "../config/config";
import mongoose from "mongoose";
import { TagCriteriaModel } from "../models/tagCriteria";
import { CVERegisterModel, CVERegister } from "../models/cveRegister";
import { readdir, stat, readFile } from "fs/promises";

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

async function allTagKeywords() {
  const tagCriterias = await TagCriteriaModel.find().select("tags");
  let allTags: any = [];

  for (let i = 0; i < tagCriterias.length; i++) {
    const tagCriteria = tagCriterias[i].tags;
    allTags = allTags.concat(tagCriteria);
  }

  return allTags;
}

function applyTags(cveData: CVERecord, keywords: string[]) {
  const tags = [];
  const allDescriptions = cveData.containers?.cna?.descriptions || [];

  const descriptionText = allDescriptions
    .map((desc) => desc.value.toLowerCase())
    .join(" ");

  for (const keyword of keywords) {
    if (descriptionText.includes(keyword.toLowerCase())) {
      tags.push(keyword);
    }
  }

  return tags;
}

//   return tags;
// }

async function registerAllCveRecords(path: string, allKeywords: string[]) {
  const queue = [path];

  while (queue.length > 0) {
    const currentPath: any = queue.shift();

    const files = await readdir(currentPath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fullPath = currentPath + "/" + file;
      const fileExtension = fullPath.split(".")[1];
      const statResult = await stat(fullPath);

      try {
        if (statResult.isDirectory()) {
          queue.push(fullPath);
        } else if (fileExtension === "json") {
          const content = await readFile(fullPath, { encoding: "utf-8" });
          const jsonData = JSON.parse(content);
          const tags = applyTags(jsonData, allKeywords);

          /**
           * Insert data
           *
           */
          const insertData: CVERegister = { ...jsonData };
          insertData.tags = tags;

          await CVERegisterModel.create(insertData);
        } else {
          console.log(`some other files: ${fullPath}`);
        }
      } catch (e) {
        console.log(e);
        break;
      }
    }
  }
}

async function register() {
  await mongoose.connect(config.dbURI, {});
  const filePath = `C:\\Users\\AJAY\\Downloads\\phases-hackathon\\cvelistV5\\cves`;
  const allKeywords = await allTagKeywords();

  await registerAllCveRecords(filePath, allKeywords);

  console.log("completed");
}

register();
