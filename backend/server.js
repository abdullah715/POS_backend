const strapi = require("@strapi/strapi");

strapi({
  dir: __dirname + "/", ///<==== add this
}).start();
