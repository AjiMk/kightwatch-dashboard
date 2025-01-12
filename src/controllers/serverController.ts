import { Request, Response } from "express";
import Server from "../models/server";

export default class ServerController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  public async allServerPage(req: Request, res: Response) {
    return res.render("pages/all-servers", {
      title: "All Servers",
    });
  }

  /**
   * All incidents table view
   *
   */
  public async registerPage(req: Request, res: Response) {
    return res.render("pages/register-server", { title: "Server register" });
  }

  public async serverDataTable(req: Request, res: Response) {
    const page: number = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const search = req.query.search || "";
    const option = req.query.option || "";
    const filterQuery: any = {};
    const allRegisters = await Server.find(filterQuery).sort({ createdAt: -1 });

    return res.render("dataTables/server-register-table", {
      data: allRegisters,
    });
  }

  public async all(req: Request, res: Response) {
    const allServers = await Server.find({});
    return res.json({ status: "ok", data: allServers });
  }

  public async register(req: Request, res: Response) {
    const { serverName, ipAddress, operatingSystem } = req.body;
    const insertData = {
      serverName,
      ipAddress,
      operatingSystem,
    };

    const create = await Server.create(insertData);
    return res.json({ status: "ok", data: create });
  }
}
