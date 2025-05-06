/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely disable static optimization
  output: 'standalone',
  
  // Ignore linting and type errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable image optimization to avoid potential issues
  images: {
    unoptimized: true,
  }
}

export default nextConfig
