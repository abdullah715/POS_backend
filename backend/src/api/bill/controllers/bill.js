"use strict";

/**
 *  bill controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::bill.bill", ({ strapi }) => ({
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    let billSummary = {};
    let returnsSummary = {};
    if (ctx.query.filters.createdAt) {
      let { $between } = ctx.query.filters.createdAt;
      $between = $between.map((_) => new Date(_).getTime());
      console.log($between);
      billSummary = await strapi.db
        .connection("bills")
        .sum({
          total: "total",
          costTotal: "cost_total",
          subTotal: "sub_total",
          discount: "discount",
        })
        .whereBetween("created_at", $between);

      returnsSummary = await strapi.db
        .connection("returns")
        .sum({
          total: "total",
          discount: "discount",
        })
        .whereBetween("created_at", $between);
    } else {
      billSummary = await strapi.db.connection("bills").sum({
        total: "total",
        costTotal: "cost_total",
        subTotal: "sub_total",
        discount: "discount",
      });

      returnsSummary = await strapi.db.connection("returns").sum({
        total: "total",
      });
    }
    console.log(ctx.query);
    // some more custom logic
    meta.summary = {
      billSummary,
      returnsSummary,
    };

    return { data, meta };
  },
}));
