module.exports = {
  async afterCreate(event) {
    let { data, result } = event.params;
    console.log("create:return-item", data, result);
    await strapi.db.connection.context.raw(
      `update items set stock=stock+${data.qty} where id=${data.item}`
    );
  },
};
