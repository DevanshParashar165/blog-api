import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// All routes

app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)

export {app}