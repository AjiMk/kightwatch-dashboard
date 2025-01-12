import mongoose, { Document, Schema } from "mongoose";

export interface IServerInfo extends Document {
  serverName: string;
  ipAddress: string;
  operatingSystem: string;
}

const ServerInfoSchema: Schema = new Schema(
  {
    serverName: { type: String, required: true },
    ipAddress: { type: String, required: true },
    operatingSystem: { type: String, required: true },
  },
  { timestamps: true }
);

const Server = mongoose.model<IServerInfo>("server", ServerInfoSchema);

export default Server;
