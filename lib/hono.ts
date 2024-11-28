import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

// export const client =hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const client: any = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);


// import { hc } from "hono/client";
// import { AppType } from "@/app/api/[[...route]]/route";

// export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
