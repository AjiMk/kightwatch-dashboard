import mongoose, { Schema, Document } from "mongoose";

export interface TagCriteria {
  tagName: string;
  tags: string[];
}
// Mongoose schema for TagCriteria
const TagCriteriaSchema: Schema = new Schema({
  tagName: { type: String, required: true, unique: true },
  tags: { type: [String], required: true },
});

export const TagCriteriaModel = mongoose.model<TagCriteria & Document>(
  "tag_criteria",
  TagCriteriaSchema
);
