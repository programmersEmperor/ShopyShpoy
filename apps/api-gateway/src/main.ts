/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
// import axios from 'axios';
import cookieParser from 'cookie-parser';

const app = express();

// CORS CONFIG
app.use(
  cors({
    origin: ['http://localhost:3000'], 
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  })
)

// LOGS CONFIG
app.use(morgan("dev"))

// MAX UPLOAD SIZE CONFIG
app.use(express.json({limit: "100mb"}))
app.use(express.urlencoded({limit: "100mb", extended: true}))

// COOKIE CONFIG
app.use(cookieParser())

app.set("trust proxy", 1)

const limiter = rateLimit({
  // 15 minutes * 60 seconds * 1000 milliseconds
  windowMs: 15 * 60 * 1000,
  limit: (req: any) => (req.user ? 1000 : 100),
  message: { 
    error: 'too many requests, please try again later!'
  },
  standardHeaders: true,
  legacyHeaders: true,

  keyGenerator: (req: any) => ipKeyGenerator(req.ip),
})

app.use(limiter)


app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/', proxy('http://localhost:6001'))

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/gateway-health`);
});
server.on('error', console.error);
