import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true
}))
app.use(helmet())
app.use(morgan('dev'))


app.get('/', (request: express.Request, response: express.Response) => {
	const userAgent = request.headers['user-agent']
	response.send(`Welcome to the backend server! Your user agent is: ${userAgent}`)
})


export default app
