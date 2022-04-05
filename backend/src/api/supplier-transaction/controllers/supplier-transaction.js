"use strict";

/**
 *  supplier-transaction controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::supplier-transaction.supplier-transaction",
  ({ strapi }) => ({
    async find(ctx) {
      console.log(ctx);
      // some custom logic here
      ctx.query = { ...ctx.query, local: "en" };

      // Calling the default core action
      const { data, meta } = await super.find(ctx);

      let where = "";

      if (ctx.query.filters && ctx.query.filters.supplier) {
        where = `where stsl.supplier_id=${ctx.query.filters.supplier.id.$eq}`;
      }

      let details = await strapi.db.connection.context.raw(
        `
        select  sum(COALESCE(credit,0)) as credit, sum(COALESCE(debit,0)) as debit,sum(COALESCE(credit,0))-sum(COALESCE(debit,0)) as bal, AVG(stsl.supplier_id) as  supplier from supplier_transactions st
left join supplier_transactions_supplier_links stsl on
st.id = stsl.supplier_transaction_id ` + where
      );

      meta.summary = details;

      return { data, meta };
    },
  })
);
