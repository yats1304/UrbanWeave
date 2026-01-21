import Fastify from "fastify"

const fastify = Fastify()

fastify.get("/health", (request, reply)=>{
    return reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestampt: Date.now(),
    })
})

fastify.listen({ port: 8001 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Order service is running on PORT 8001`)
})