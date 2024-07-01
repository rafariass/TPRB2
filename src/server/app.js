import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { APIv1 } from './routers/index.js'

const app = express()
const PORT = process.env.PORT ?? 3_000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1', APIv1)
app.all('*', (_, res) => res.status(404).json({ status: false, code: 404, message: 'Page not found.' }))

app.listen(PORT, () => console.log('Server UP!!'))

export default app
