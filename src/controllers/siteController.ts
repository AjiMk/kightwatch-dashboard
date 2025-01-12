import { Request, Response } from "express";
import Site from "../models/site";

export default class SiteController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  public async allSitePage(req: Request, res: Response) {
    return res.render("pages/all-sites", { title: "All Sites" });
  }

  /**
   * All incidents table view
   *
   */
  public async registerPage(req: Request, res: Response) {
    return res.render("pages/register-site", { title: "Site register" });
  }

  public async serverDataTable(req: Request, res: Response) {
    const page: number = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const search = req.query.search || "";
    const option = req.query.option || "";
    const filterQuery: any = {};

    const allRegisters = await Site.aggregate([
      {
        $lookup: {
          from: "servers", // The collection to join
          localField: "server", // Field from the orders collection
          foreignField: "_id", // Field from the customers collection
          as: "server", // The name of the new array field to add to the orders documents
        },
      },
      {
        $unwind: {
          path: "$server_info",
          preserveNullAndEmptyArrays: true, // This ensures that unmatched orders still appear in the results
        },
      },
    ]).sort({ createdAt: -1 });

    return res.render("dataTables/site-register-table", {
      data: allRegisters,
    });
  }

  public async register(req: Request, res: Response) {
    const { website, url, server, tags } = req.body;
    const insertData = {
      website,
      url,
      server,
      tags,
    };

    const create = await Site.create(insertData);
    return res.json({ status: "ok", data: create });
  }
}
