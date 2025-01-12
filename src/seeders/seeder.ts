export default abstract class Seeder {

    /**
     * Get seeder name
     * 
     */
    abstract getName(): string;

    /**
     * Get seeder data
     * 
     * @return {Promise<any[]>}
     */
    abstract getData(): Promise<any[]>;

    /**
     * Seed data
     * 
     * @param {any[]} insertData
     * @returns {Promise<boolean>}
     */
    abstract seed(insertData: any[]): Promise<boolean>;

    /**
     * Run seeder
     * 
     * @return {Promise<boolean>}
     */
    async run(): Promise<boolean> {
        const data = await this.getData();
        await this.seed(data);

        return true;
    }
}