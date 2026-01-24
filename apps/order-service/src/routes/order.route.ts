import { FastifyInstance } from "fastify";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";

export const orderRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "/user-orders",
    { preHandler: isAuthenticated },
    async (request, reply) => {
      const orders = await Order.find({
        userId: request.userId,
      });
      return reply.send(orders);
    },
  );
  fastify.get("/orders", { preHandler: isAdmin }, async (request, reply) => {
    const orders = await Order.find();
    return reply.send(orders);
  });
};
