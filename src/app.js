import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import { setupSwagger } from "./config/swagger.js";

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN
}))


setupSwagger(app);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// All routes

app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/comments',commentRouter)

app.use(errorHandler);


export {app}