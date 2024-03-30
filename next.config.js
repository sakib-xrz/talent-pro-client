/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   images: {
//     domains: ["res.cloudinary.com"],
//     minimumCacheTTL: 120,
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
    minimumCacheTTL: 120,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
});
