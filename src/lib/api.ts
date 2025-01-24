import {
  DefaultApi as Api,
  Configuration as ApiConfiguration,
} from "@/lib/openapi";

export const apiClient = new Api(
  new ApiConfiguration({
    fetchApi: fetch,
    basePath: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  }),
);
