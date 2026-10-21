import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
export default config;
