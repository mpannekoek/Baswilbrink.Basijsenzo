export function getSecurityHeaders(isDevelopment: boolean): Array<{ key: string; value: string }> {
  const scriptSrc = isDevelopment
    ? "script-src 'self' 'unsafe-eval';"
    : "script-src 'self';";

  return [
    {
      key: "Content-Security-Policy",
      // Next.js font rendering still relies on inline style tags for generated font CSS.
      value: `default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; ${scriptSrc} connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`,
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
