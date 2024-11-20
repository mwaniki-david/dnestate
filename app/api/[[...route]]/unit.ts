import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { getAuth, clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { inserUnitrSchema, unit } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorised" }, 401);
    }
    const data = await db
      .select({
        id: unit.id,
        name: unit.name,
        phoneNo: unit.phoneNo, 
        buildingName: unit.buildingName,
      })
      .from(unit)
      .where(eq(unit.userId, auth.userId));

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
          id: unit.id,
          name: unit.name,
          phoneNo: unit.phoneNo, 
          buildingName: unit.buildingName,
        })
        .from(unit)
        .where(and(eq(unit.userId, auth?.userId), eq(unit.id, id)));

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
      inserUnitrSchema.pick({
        name: true,
        buildingName: true,
        phoneNo: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorised " }, 401);
      }

      const [data] = await db
        .insert(unit)
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
        .delete(unit)
        .where(
          and(
            eq(unit.userId, auth.userId),
            inArray(unit.id, values.ids)
          )
        )
        .returning({
          id: unit.id,
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
      inserUnitrSchema.pick({
        name: true,
        buildingName: true,
        phoneNo: true,
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
        .update(unit)
        .set(values)
        .where(and(eq(unit.userId, auth.userId), eq(unit.id, id)))
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
        .delete(unit)
        .where(and(eq(unit.userId, auth.userId), eq(unit.id, id)))
        .returning({
          id: unit.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;