import express, { Request, Response } from 'express'
import appartementRouter from './routes/apartment'

const app = express()
const domain = process.env.DOMAIN || 'http://localhost'
const port = process.env.PORT || 3000

app.use(express.json())
app.use(appartementRouter)

app.listen(port, () => {
  console.log(`Server running at ${domain}:${port}`)
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})
