/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/user/manage-menu',
            destination: '/user/manage-menu/menuCategory',
            permanent: true, // Permanent redirect
          },
          {
            source: '/',
            destination: '/login',
            permanent: true,
          }
        ];
      },
};



export default nextConfig;
