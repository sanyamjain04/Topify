/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains : ["rb.gy",
    "avatars.githubusercontent.com",
    "media.discordapp.net",
    "is1-ssl.mzstatic.com",
    "is2-ssl.mzstatic.com",
    "is3-ssl.mzstatic.com",
    "is4-ssl.mzstatic.com",
    "is5-ssl.mzstatic.com"
  ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
