/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com', protocol: 'https', port: '' },
      { hostname: 'images.unsplash.com', protocol: 'https', port: '' },
    ],
  },
};

module.exports = nextConfig;
