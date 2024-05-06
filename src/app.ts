import express from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/NotFound'
import globalErrorHandler from './app/middlewares/GlobalErrorHandler'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('server is running')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app
