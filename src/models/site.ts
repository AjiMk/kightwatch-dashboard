import mongoose, { Document, Schema, Types } from "mongoose";

// Define the interface for the document
export interface ISiteInfo extends Document {
  website: string;
  url: string;
  server: Types.ObjectId;
  tags: string[];
}

// Create the schema corresponding to the document interface
const SiteInfoSchema: Schema = new Schema(
  {
    website: { type: String, required: true },
    url: { type: String, required: true },
    server: { type: Types.ObjectId, required: true },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);

// Create the Mongoose model
const Site = mongoose.model<ISiteInfo>("site", SiteInfoSchema);

export default Site;
