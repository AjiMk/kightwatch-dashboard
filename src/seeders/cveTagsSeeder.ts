import Seeder from "./seeder";
import { TagCriteria, TagCriteriaModel } from "../models/tagCriteria";

export default class CveTagsSeeder extends Seeder {

    /**
     * All tags
     * 
     * @returns 
     */
    private allTags() {
        return {
            // Programming Languages
            JavaScript: ["node.js", "react", "angular", "javascript"],
            Python: ["python", "django", "flask"],
            PHP: ["php", "laravel", "wordpress"],
            Java: ["java", "spring", "hibernate"],
            "C#": ["c#", ".net", "asp.net"],
            "C++": ["c++", "cpp"],
            Ruby: ["ruby", "rails"],
            Go: ["go", "golang"],
            Swift: ["swift"],
            Kotlin: ["kotlin"],
            R: ["r"],
            TypeScript: ["typescript", "ts"],
            SQL: ["sql"],
            
            // Frameworks
            Spring: ["spring"],
            Hibernate: ["hibernate"],
            React: ["react"],
            Angular: ["angular"],
            Vue: ["vue"],
            Django: ["django"],
            Flask: ["flask"],
            Express: ["express"],
            Rails: ["rails"],
            "ASP.NET": ["asp.net", ".net"],
            Laravel: ["laravel"],
            WordPress: ["wordpress"],
            
            // Operating Systems
            Windows: ["windows"],
            Linux: ["linux", "ubuntu", "debian", "centos", "redhat"],
            macOS: ["macos", "osx"],
            Android: ["android"],
            iOS: ["ios"],
            
            // Vulnerability Types
            "SQL Injection": ["sql injection", "sql"],
            XSS: ["cross site scripting", "xss"],
            CSRF: ["cross site request forgery", "csrf"],
            RCE: ["remote code execution", "rce"],
            LFI: ["local file inclusion", "lfi"],
            RFI: ["remote file inclusion", "rfi"],
            XXE: ["xml external entity", "xxe"],
            "Privilege Escalation": ["privilege escalation"],
            "Directory Traversal": ["directory traversal"],
            "Buffer Overflow": ["buffer overflow"],
        };
    }

    /**
     * Seeder name
     * 
     * @returns 
     */
    getName(): string {
        return __filename;
    }

    /**
     * 
     * 
     * @returns {Promise<TagCriteria[]>} 
     */
    async getData(): Promise<TagCriteria[]> {
        const allInsertData: TagCriteria[] = [];

        const allTags: any = this.allTags();
        const allKeyWords = Object.keys(allTags);
        for (let i = 0; i < allKeyWords.length; i++) {
            const keyword = allKeyWords[i];
            const tags = allTags[keyword];

            const insertData: TagCriteria = {
                tagName: keyword,
                tags: tags,
            };

            allInsertData.push(insertData)
        }

        return allInsertData;
    }

    /**
     * 
     * @param {TagCriteria[]} insertData
     * @return {Promise<boolean>} 
     */
    async seed(insertData: TagCriteria[]): Promise<boolean> {
        await TagCriteriaModel.create(insertData);

        return true;
    }
}