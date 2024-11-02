/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/manage-menu',
            destination: '/manage-menu/menuCategory',
            permanent: true, // Permanent redirect
          },
        ];
      },
};



export default nextConfig;
