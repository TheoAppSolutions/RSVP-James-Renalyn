/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [{ source: "/template-3", destination: "/", permanent: true }];
  },
};
