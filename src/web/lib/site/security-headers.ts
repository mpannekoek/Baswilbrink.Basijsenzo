export function getSecurityHeaders(isDevelopment: boolean): Array<{ key: string; value: string }> {
  const scriptSrc = isDevelopment
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
    : "script-src 'self' 'unsafe-inline';";

  const connectSrc = isDevelopment
    ? "connect-src 'self' ws: wss: https://login.microsoftonline.com https://graph.microsoft.com;"
    : "connect-src 'self' https://login.microsoftonline.com https://graph.microsoft.com;";

  return [
    {
      key: "Content-Security-Policy",
      // Next.js injects inline runtime scripts for App Router hydration. Without nonces/hashes,
      // allowing inline scripts is the smallest workable policy that keeps the app functional.
      value: `default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; ${scriptSrc} ${connectSrc} frame-ancestors 'none'; base-uri 'self'; form-action 'self';`,
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
  ];
}
