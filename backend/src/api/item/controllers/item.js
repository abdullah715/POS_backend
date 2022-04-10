"use strict";

/**
 *  item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::item.item", ({ strapi }) => ({
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    console.log(ctx.query);

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    let where = "";

    let summary = ctx.query.summary ? {} : null;
    if (ctx.query.summary) {
      if (ctx.query.filters && ctx.query.filters.searchName) {
        let arr = ctx.query.filters.searchName.$containsi;
        arr = !Array.isArray(arr) ? [arr] : arr;
        where = `where search_name like '%${arr.join(
          "%' or search_name like '%"
        )}%'`;
      }
      summary.billSummary = await strapi.db.connection.context.raw(`
          select sum(purchase_qty*(taxed_cost_price+expense-deduction)) as purchaseWorth,
          sum(stock*(taxed_cost_price+expense-deduction)) as stockWorth from items ${where}
              `);

      summary.OutOfStock = await strapi.db.connection.context.raw(
        `select * from (
          select name,SUM(stock) stock,ipl.product_id from items_product_links ipl 
          left join items i on
          ipl.item_id = i.id
          GROUP  by product_id 
          ) where stock = 0`
      );
    }

    // some more custom logic
    meta.summary = summary;

    // console.log("out of stock", OutOfStock);

    return { data, meta };
  },
}));
