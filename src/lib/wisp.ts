import { buildWispClient } from "@wisp-cms/client";

const blogId = process.env.NEXT_PUBLIC_WISP_BLOG_ID;


export const wisp = buildWispClient({
    blogId: blogId || "339ec5f8-58b4-43e3-bec7-ac0cbde5d202", // Fallback to your ID if missing in dev
});
