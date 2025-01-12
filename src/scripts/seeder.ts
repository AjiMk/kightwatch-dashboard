import { connectDB } from "../utils/db";
import { allSeeders } from "../seeders/allSeeders";

async function run() {

    await connectDB();

    for(const seeder of allSeeders) {
        const seederInstance = new seeder();
        const seederName = seederInstance.getName();

        console.log(`\x1b[33m Seeding: \x1b[0m ${seederName}`);
        await seederInstance.run();
        console.log(`\x1b[32m Seeded:  \x1b[0m ${seederName}`);
    }

    process.exit();

}

run();