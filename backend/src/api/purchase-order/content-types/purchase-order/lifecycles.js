const { Console } = require("console");

module.exports = {
  async beforeCreate(event) {
    let { data } = event.params;

    console.log(data);
    let res = await strapi.db
      .query("api::supplier-transaction.supplier-transaction")
      .create({
        data: {
          date: data.date,
          supplier: data.supplier,
          credit: data.payable,
          remark: `For Invoice ${data.invoiceNo}`,
        },
      });

    data["supplier_transaction"] = res.id;
  },

  async beforeUpdate(event) {
    let { data, where } = event.params;
    console.log(data);

    if (data["supplier_transaction"]) {
      let res = await strapi.db
        .query("api::supplier-transaction.supplier-transaction")
        .update({
          where: {
            id: data["supplier_transaction"],
          },
          data: {
            date: data.date,
            supplier: data.supplier,
            credit: data.payable,
            remark: `For Invoice ${data.invoiceNo}`,
          },
        });
    } else {
      let res = await strapi.db
        .query("api::supplier-transaction.supplier-transaction")
        .create({
          data: {
            date: data.date,
            supplier: data.supplier,
            credit: data.payable,
            remark: `For Invoice ${data.invoiceNo}`,
          },
        });

      data["supplier_transaction"] = res.id;
    }
  },
};
