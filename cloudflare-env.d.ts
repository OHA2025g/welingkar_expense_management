declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    /** Set to "1" for Docker / local wrangler cookie-based mock sign-in. */
    LOCAL_MOCK_AUTH?: string;
  }
}
