"use strict";

let view = `CREATE VIEW if not exists item_transaction as
select created_at,item_id,"bills" ,null as 'in', (qty*rate) as 'out'  from bill_items_item_links bilink
left join bill_items bi on
bilink.bill_item_id = bi.id
UNION ALL
select created_at,item_id ,"returns",(qty*rate) as 'in',null  from return_items_item_links rilink
left join return_items ri on
rilink.return_item_id = ri.id
union all
select created_at,id as item_id,"purchase",purchase_qty*(taxed_cost_price+expense-deduction) as 'in', null from items i ;`;
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap() {},
};
