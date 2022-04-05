"use strict";

/**
 * return-item service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::return-item.return-item");
