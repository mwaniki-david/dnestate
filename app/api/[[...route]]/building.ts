import { db } from "@/db/drizzle";
import { building, insertBuildingSchema } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { getAuth, clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorised" }, 401);
    }
    const data = await db
      .select({
        id: building.id,
        name: building.name,
        floors: building.floors,
        ownersName: building.ownersName,
        ownersPhoneNo: building.ownersPhoneNo,
        location: building.location,
        buildingUnits: building.buildingUnits,
        // name: tenant.name,
        // phoneNo: tenant.phoneNo,
        // rentalAmount: tenant.rentalAmount,
        // unitType: tenant.unitType,
        // buildingName: tenant.buildingName,
      })
      .from(building)
      .where(eq(building.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
      if (!id) {
        return c.json({ error: "Unauthorised" }, 401);
      }
      const [data] = await db
        .select({
          id: building.id,
          name: building.name,
          floors: building.floors,
          ownersName: building.ownersName,
          ownersPhoneNo: building.ownersPhoneNo,
          location: building.location,
          buildingUnits: building.buildingUnits,
        })
        .from(building)
        .where(and(eq(building.userId, auth?.userId), eq(building.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 401);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertBuildingSchema.pick({
        name: true,
        floors: true,
        ownersName: true,
        ownersPhoneNo: true,
        location: true,
        buildingUnits: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorised " }, 401);
      }

      const [data] = await db
        .insert(building)
        .values({
          id: createId(), // Auto-generate the ID
          userId: auth.userId,
          ...values,
          // name: values.name, // The tenant name
          // userId: auth.userId, // The user ID
          // floors: building.floors,
          // ownersName: building.ownersName,
          // ownersPhoneNo: building.ownersPhoneNo,
          // location: building.location,
          // buildingUnits: building.buildingUnits,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }

      const data = await db
        .delete(building)
        .where(
          and(
            eq(building.userId, auth.userId),
            inArray(building.id, values.ids)
          )
        )
        .returning({
          id: building.id,
        });
      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertBuildingSchema.pick({
        name: true,
        floors: true,
        ownersName: true,
        ownersPhoneNo: true,
        location: true,
        buildingUnits: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }

      const [data] = await db
        .update(building)
        .set(values)
        .where(and(eq(building.userId, auth.userId), eq(building.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }

      const [data] = await db
        .delete(building)
        .where(and(eq(building.userId, auth.userId), eq(building.id, id)))
        .returning({
          id: building.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;

// import { db } from "@/db/drizzle";
// import { tenant, insertTenantSchema } from "@/db/schema";
// import { createId } from "@paralleldrive/cuid2";
// import { getAuth, clerkMiddleware } from "@hono/clerk-auth";
// import { zValidator } from "@hono/zod-validator";
// import { and, eq, inArray } from "drizzle-orm";
// import { Hono } from "hono";
// import { z } from "zod";

// const app = new Hono();

// // GET route to fetch tenants for the authenticated user
// app.get("/", clerkMiddleware(), async (c) => {
//   const auth = getAuth(c);

//   if (!auth?.userId) {
//     return c.json({ error: "Unauthorized" }, 401);
//   }

//   const data = await db
//     .select({
//       id: tenant.id,
//       name: tenant.name,
//     })
//     .from(tenant)
//     .where(eq(tenant.userId, auth.userId));

//   return c.json({ data });
// });

// // POST route to create a new tenant
// app.post(
//   "/",
//   clerkMiddleware(),
//   zValidator("json", insertTenantSchema.pick({
//     name: true,
//   })),
//   async (c) => {
//     const auth = getAuth(c);
//     const values = c.req.valid("json");

//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const [data] = await db.insert(tenant).values({
//       id: createId(),           // Auto-generate the ID
//       name: values.name,        // Use the validated tenant name
//       userId: auth.userId,      // The user ID
//       floorNo:  3,  // Default or passed number of floors
//       phoneNo: '123-456-7890', // Default or passed phone number
//       plaidId: null, // Optional field
//     }).returning();

//     return c.json({ data });
//   }
// );

// // POST route to bulk delete tenants
// app.post(
//   "/bulk-delete",
//   clerkMiddleware(),
//   zValidator(
//     "json",
//     z.object({
//       ids: z.array(z.string()).nonempty(), // Ensure there's at least one ID
//     }),
//   ),
//   async (c) => {
//     const auth = getAuth(c);
//     const values = c.req.valid("json");

//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const data = await db
//       .delete(tenant)
//       .where(
//         and(
//           eq(tenant.userId, auth.userId),
//           inArray(tenant.id, values.ids)
//         )
//       )
//       .returning({
//         id: tenant.id,
//       });

//     return c.json({ data });
//   }
// );

// export default app;
