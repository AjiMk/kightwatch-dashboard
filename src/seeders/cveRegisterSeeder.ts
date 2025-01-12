import Seeder from "./seeder";
import { readdir, stat, readFile } from "fs/promises";
import { CVERecord, CVERegister, CVERegisterModel } from "../models/cveRegister";
import { TagCriteriaModel } from "../models/tagCriteria";


export default class CveRegisterSeeder extends Seeder {

    /**
     * Get file name
     * 
     * @returns {string}
     */
    getName(): string {
        return __filename;
    }

    /**
     * Get seed data
     * 
     * @returns {Promise<CVERegister[]>}
     */
    async getData(): Promise<CVERegister[]> {
        return this.getAllCveRecords();
    }

    /**
     * Seed data to db
     * 
     * @returns {Promise<boolean>}
     */
    async seed(cveRegisters: CVERegister[]): Promise<boolean> {
        const chunkSize = 5000;

        for (let i = 0; i < cveRegisters.length; i += chunkSize) {
            const chunk = cveRegisters.slice(i, i + chunkSize);
            try {
              const docs = await CVERegisterModel.insertMany(chunk);
            } catch (err) {
              console.error('Batch insert error:', err);
            }
        }

        return true;
    }

    /**
     * All cve records
     * 
     * @returns {Promise<CVERegister>}
     */
    private async getAllCveRecords(): Promise<CVERegister[]> {
        const path = process.env.CVE_DB_PATH;
        const queue = [path];
        const allKeywords = await this.allTagKeywords();
        const allRegisters:CVERegister[] = [];
      
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
                const tags = this.getCveRecordTags(jsonData, allKeywords);
                /**
                 * Insert data
                 *
                 */
                const insertData: CVERegister = { ...jsonData };
                insertData.tags = tags;

                allRegisters.push(insertData)
      
              } else {
                console.log(`some other files: ${fullPath}`);
              }
            } catch (e) {
              console.log(e);
              break;
            }
          }
        }

        return allRegisters;
    }

    /**
     * Get all CVE record tags
     * 
     * @param {CVERecord} cveData 
     * @param {string[]} keywords 
     * @returns {string[]}
     */
    private getCveRecordTags(cveData: CVERecord, keywords: string[]): string[] {
        const tags: string[] = [];
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

    /**
     * Get all tag keywords
     * 
     * @returns {Promise<string[]>} 
     */
    private async allTagKeywords(): Promise<string[]> {
        const tagCriterias = await TagCriteriaModel.find().select("tags");
        let allTags: any = [];
      
        for (let i = 0; i < tagCriterias.length; i++) {
          const tagCriteria = tagCriterias[i].tags;
          allTags = allTags.concat(tagCriteria);
        }
      
        return allTags;
      }
}