// import { Hono } from 'hono';
// import { handle } from 'hono/vercel';
// import tenant from './tenant';
// import building from './building';
// import buildingOwner from './buildingOwner';
// import  houses from './houses';
// import  unit from './unit';



// export const runtime = 'edge';
//  const app = new Hono().basePath('/api');

// export const  routes = app
// .route("/tenants", tenant )
// .route("/building", building )
// .route("/buildingOwner", buildingOwner )
// .route("/houses",houses )
// .route("/unit", unit)



// export const GET = handle(app);
// export const POST = handle(app);
// export const PATCH = handle(app);
// export const DELETE = handle(app);

// export type AppType = typeof routes;

// import { Hono } from 'hono';
// import { handle } from 'hono/vercel';
// import tenant from './tenant';
// import building from './building';
// import buildingOwner from './buildingOwner';
// import houses from './houses';
// import unit from './unit';

// export const runtime = 'edge';

// // Initialize the Hono app
// const app = new Hono().basePath('/api');

// // Define individual routes
// app.route("/tenants", tenant);
// app.route("/building", building);
// app.route("/buildingOwner", buildingOwner);
// app.route("/houses", houses);
// app.route("/unit", unit);

// // Export the method handlers for Next.js
// export const GET = handle(app);
// export const POST = handle(app);
// export const PATCH = handle(app);
// export const DELETE = handle(app);


import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import tenant from './tenant';
import building from './building';
import buildingOwner from './buildingOwner';
import houses from './houses';
import unit from './unit';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

// Define routes
app
  .route('/tenants', tenant)
  .route('/building', building)
  .route('/buildingOwner', buildingOwner)
  .route('/houses', houses)
  .route('/unit', unit);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// Use `app` directly for type inference
export type AppType = typeof app;

