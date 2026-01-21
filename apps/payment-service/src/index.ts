import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestampt: Date.now(),
  })
})

serve({
  fetch: app.fetch,
  port: 8002
}, (info) => {
  console.log(`Payment service is running on PORT 8002`)
})
