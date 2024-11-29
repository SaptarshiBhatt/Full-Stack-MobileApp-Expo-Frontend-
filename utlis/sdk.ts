import { authentication, createDirectus, rest } from "@directus/sdk";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
export const sdk = createDirectus("http://192.168.29.103:8055")
  .with(authentication("cookie", { credentials: "include" }))
  .with(rest({ credentials: "include" }));
