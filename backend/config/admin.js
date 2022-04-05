module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd5961474c5634e598351f8a4ea9a4654'),
  },
});
