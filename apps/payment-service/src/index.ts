import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { isAuthenticated } from "./middleware/authMiddleware.js";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestampt: Date.now(),
  });
});

app.get("/test", isAuthenticated, (c) => {
  return c.json({
    message: "Payment service is Authenticated!",
    userId: c.get("userId"),
  });
});

serve(
  {
    fetch: app.fetch,
    port: 8002,
  },
  (info) => {
    console.log(`Payment service is running on PORT 8002`);
  },
);
