const path = require("path");

// module.exports = ({ env }) => ({
//   connection: {
//     client: "mysql",
//     connection: {
//       host: env("DATABASE_HOST", "localhost"),
//       port: env("DATABASE_PORT", 3306),
//       database: env("DATABASE_NAME", "shop"),
//       user: env("DATABASE_USERNAME", "root"),
//       password: env("DATABASE_PASSWORD", "root"),
//     },
//     useNullAsDefault: true,
//   },
// });

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(
        __dirname,
        "..",
        env("DATABASE_FILENAME", ".tmp/data.db")
      ),
    },
    useNullAsDefault: true,
  },
});
// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "mysql",
//       settings: {
//         client: "mysql",
//         host: env("DATABASE_HOST", "localhost"),
//         port: env("DATABASE_PORT", 3306),
//         database: env("DATABASE_NAME", "shop"),
//         username: env("DATABASE_USERNAME", "root"),
//         password: env("DATABASE_PASSWORD", "root"),
//       },
//       options: {
//         useNullAsDefault: true,
//       },
//     },
//   },
// });
