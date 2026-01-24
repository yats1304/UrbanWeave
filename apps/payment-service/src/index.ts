import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { isAuthenticated } from "./middleware/authMiddleware.js";
import stripe from "./utils/stripe.js";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestampt: Date.now(),
  });
});

// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     id: "1234",
//     name: "Test Product",
//     default_price_data: {
//       currency: "inr",
//       unit_amount: 10 * 100,
//     },
//   });
//   return c.json(res);
// });

// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });
//   return c.json(res);
// });

serve(
  {
    fetch: app.fetch,
    port: 8002,
  },
  (info) => {
    console.log(`Payment service is running on PORT 8002`);
  },
);
