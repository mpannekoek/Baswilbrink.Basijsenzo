import type { NextConfig } from "next";

import { getSecurityHeaders } from "./src/lib/site/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    const securityHeaders = getSecurityHeaders(process.env.NODE_ENV !== "production");

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
