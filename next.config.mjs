export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**', // Specify the path if needed
      },
    ],
  },
};
