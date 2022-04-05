async function modifyData({ data }) {
  console.log("Modify Data", data);

  // set the stock to puchase quantity
  if (!data.stock) {
    data["stock"] = data.purchaseQty;
  }
  // if purchase order and product Exists
  if (data.purchase_order && data.product) {
    console.log("here");
    let res = await strapi.db
      .query("api::purchase-order.purchase-order")
      .findOne({
        id: data.purchase_order,

        populate: ["supplier"],
      });

    console.log("purchaseOrderData", res);

    let dt = new Date(res.date);

    let res2 = await strapi.db.query("api::product.product").findOne({
      where: {
        id: data.product,
      },
    });

    console.log("productData", res2);
    let y = dt.getYear();
    let m = (+dt.getMonth() + 1).toString().padStart(2, 0);

    if (!data.barcode) {
      let random = (Math.floor(Math.random() * 1000) + 1)
        .toString()
        .padStart(4, 0);

      data.barcode =
        m +
        "A" +
        random +
        "X" +
        y +
        res2.id.toString().padStart(4, 0) +
        "S" +
        (res.supplier ? res.supplier.id : "N");
    }

    data.name = res2.name;

    data.searchName = `${res2.name} D:${m}-${y} P:${data.price}`;
  } else {
    //   throw new Error("Required");
    console.error("Data Not modified");
  }
}

module.exports = {
  async beforeCreate(event) {
    await modifyData(event.params);
  },
  async beforeUpdate(event) {
    await modifyData(event.params);
  },
};
