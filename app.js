import express from 'express';
import userRouter from './routes/auth.routes.js';
import authRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

import {ARCJET_KEY, PORT} from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewere/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewere/arcjet.middleware.js';
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware)
// Routes
app.use('/api/v1/auth',userRouter)
app.use('/api/v1/users',authRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)
// Error handling middleware
app.use(errorMiddleware);
// console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);


app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Arcjet Key:", ARCJET_KEY);
  await connectToDatabase();
});
export default app;
