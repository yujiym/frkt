/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '/_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });
    if (!isServer) {
      config.resolve.fallback = {
        "fs": false,
        "net": false,
        "tls": false
      }
    }
    return config
  }
}

module.exports = nextConfig