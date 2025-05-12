import express, { Request, Response } from 'express'
import routes from './routes/index'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const domain = process.env.DOMAIN || 'http://localhost'
const port = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`Port env:${process.env.PORT}`)
  console.log(`Server running at ${domain}:${port}`)
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})
