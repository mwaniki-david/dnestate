import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import tenant from './tenant';
import building from './building';
import buildingOwner from './buildingOwner';
import  houses from './houses';
import  unit from './unit';



export const runtime = 'edge';
export const app = new Hono().basePath('/api');

export const  routes = app
.route("/tenants", tenant )
.route("/building", building )
.route("/buildingOwner", buildingOwner )
.route("/houses",houses )
.route("/unit", unit)



export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;


// import { Hono } from 'hono';
// import { handle } from 'hono/vercel';
// import tenant from './tenant';

// export const runtime = 'edge';  // Define runtime for Vercel's Edge functions

// // Create a Hono instance with base path
// export const app = new Hono().basePath('/api');

// // Define the routes by mounting the 'tenant' module at the '/tenants' path
// const routes = app
// .route("/tenants", tenant);

// // Export handlers for GET and POST requests using the handle function
// export const GET = handle(app);
// export const POST = handle(app);

// // Export the type for the entire app, not just routes
// export type AppType = typeof app;
