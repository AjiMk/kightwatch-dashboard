import IncidentChecker from "../services/incidentChecker";
import { Types } from "mongoose";
import { CVERegisterModel } from "../models/cveRegister";
import mongoose from "mongoose";
import config from "../config/config";

async function main() {
  await mongoose.connect(config.dbURI, {});

  const registerId = new Types.ObjectId("6679919fe1172000965f4edb");
  const cveRecord = await CVERegisterModel.findById(registerId).orFail();

  await new IncidentChecker(cveRecord).check();
}

main();
