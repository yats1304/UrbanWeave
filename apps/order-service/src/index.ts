import { clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify";
import { isAuthenticated } from "./middleware/authMiddleware.js";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestampt: Date.now(),
  });
});

fastify.get("/test", { preHandler: isAuthenticated }, (request, reply) => {
  return reply.send({
    message: "Order service is Authenticated!",
    userId: request.userId,
  });
});

fastify.listen({ port: 8001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Order service is running on PORT 8001`);
});
