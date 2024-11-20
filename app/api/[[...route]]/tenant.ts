import { db } from "@/db/drizzle";
import { tenant, insertTenantSchema } from "@/db/schema";
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
        id: tenant.id,
        name: tenant.name,
        phoneNo: tenant.phoneNo,
        rentalAmount: tenant.rentalAmount,
        unitType: tenant.unitType,
        buildingName: tenant.buildingName,
      })
      .from(tenant)
      .where(eq(tenant.userId, auth.userId));

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
          id: tenant.id,
          name: tenant.name,
          phoneNo: tenant.phoneNo,
          rentalAmount: tenant.rentalAmount,
          unitType: tenant.unitType,
          buildingName: tenant.buildingName,
          unitName: tenant.unitName,
        })
        .from(tenant)
        .where(and(eq(tenant.userId, auth?.userId), eq(tenant.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 401);
      }

      return c.json({ data });
    }
  )
  // .post(
  //   "/",
  //   clerkMiddleware(),
  //   zValidator(
  //     "json",
  //     insertTenantSchema.pick({
  //       name: true,
  //       phoneNo: true,
  //       rentalAmount: true,
  //       unitType: true,
  //       buildingName: true,
  //       unitName: true,
  //     })
  //   ),
  //   async (c) => {
  //     const auth = getAuth(c);
  //     const values = c.req.valid("json");
  
  //     if (!auth?.userId) {
  //       return c.json({ error: "Unauthorized" }, 401);
  //     }
  
  //     try {
  //       // Step 1: Check if the building already exists
  //       const existingBuilding = await db
  //         .select({
  //           id: building.id,          // Select specific columns
  //           name: building.name,
  //         }) 
  //         .from(building)
  //         .where(eq(building.name, values.buildingName))
  //         .limit(1);
  
  //       let buildingId;
  //       if (existingBuilding.length === 0) {
  //         // Step 2: Insert the building if it doesn't exist
  //         const [newBuilding] = await db
  //           .insert(building)
  //           .values({
  //             id: createId(),           // Generate a unique ID for the building
  //             name: values.buildingName, // Building name from tenant data
  //             userId: auth.userId,       // Set userId as the current user
  //             ownersPhoneNo: values.phoneNo, // Example: using tenant's phone for owner phone
  //             buildingUnits: 1,          // Default value or necessary count
  //             floors: 1,
  //             ownersName:'Unknown',
  //             location:'Unknown',
  //           })
  //           .returning({
  //             id: building.id,
  //           });
  //         buildingId = newBuilding.id;
  //       } else {
  //         // If the building exists, use its ID
  //         buildingId = existingBuilding[0].id;
  //       }
  
  //       // Step 3: Insert tenant data
  //       const [tenantData] = await db
  //         .insert(tenant)
  //         .values({
  //           id: createId(),           // Auto-generate the tenant ID
  //           name: values.name,         // Tenant's name
  //           userId: auth.userId,       // Authenticated user ID
  //           unitType: values.unitType, // Unit type
  //           rentalAmount: values.rentalAmount,
  //           buildingName: values.buildingName,
  //           unitName: values.unitName,
  //           phoneNo: values.phoneNo,   // Tenant's phone number
  //         })
  //         .returning();
  
  //       return c.json({ tenant: tenantData, buildingId });
  //     } catch (error) {
  //       console.error("Error adding tenant and building:", error);
  //       return c.json({ error: "An error occurred while adding tenant and building" }, 500);
  //     }
  //   }
  // )
  
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
        .delete(tenant)
        .where(
          and(eq(tenant.userId, auth.userId), inArray(tenant.id, values.ids))
        )
        .returning({
          id: tenant.id,
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
      insertTenantSchema.pick({
        name: true,
        phoneNo: true,
        rentalAmount: true,
        unitType: true,
        buildingName: true,
        unitName: true,
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
        .update(tenant)
        .set(values)
        .where(and(eq(tenant.userId, auth.userId), eq(tenant.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  )

  // app.post(
  //   '/api/pay-rent',
  //   clerkMiddleware(),
  //   zValidator('json', z.object({
  //     phoneNumber: z.string().min(10).max(13),
  //     amount: z.number().positive(),
  //     accountReference: z.string(),
  //   })),
  //   async (c) => {
  //     const auth = getAuth(c);
  //     const { phoneNumber, amount, accountReference } = c.req.valid('json');
  
  //     if (!auth?.userId) {
  //       return c.json({ error: 'Unauthorised' }, 401);
  //     }
  
  //     try {
  //       const response = await initiateSTKPush(phoneNumber, amount, accountReference);
  //       return c.json({ message: 'STK Push initiated', data: response });
  //     } catch (error) {
  //       console.error('Error initiating STK Push:', error);
  //       return c.json({ error: 'Failed to initiate payment' }, 500);
  //     }
  //   }
  // )

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
        .delete(tenant)
        .where(and(eq(tenant.userId, auth.userId), eq(tenant.id, id)))
        .returning({
          id: tenant.id,
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
