import express from 'express';
import userRouter from './routes/auth.routes.js';
import authRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();
import {PORT} from './config/env.js';
import connectToDatabase from './database/mongodb.js';
app.use(express.json());
app.use('/api/v1/auth',userRouter)
app.use('/api/v1/users',authRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)
// console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});
export default app;
