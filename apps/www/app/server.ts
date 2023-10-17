import { createApp } from 'sonik/default'
import { serveStatic } from 'hono/cloudflare-pages'

const app = createApp()
app.use('/static/*', serveStatic())

app.showRoutes()

export default app
