import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';

import { UserBaseRoute } from "./src/helper/constant.js";
import userRoute from "./src/rest-api/user.js";
import productRoute from "./src/rest-api/product.js";
import authRouter from "./src/rest-api/auth.js";
import { schema } from "./src/graphql/schema/schema.js";
import { resolver } from "./src/graphql/resolver/resolver.js";
import jobsRouter from "./src/rest-api/jobs.js";
import movieRouter from "./src/rest-api/movies.js";
import * as env from "dotenv";

env.config();
const PORT=process.env.PORT
const app = express();
app.use(express.json())

//user routes
app.use(UserBaseRoute + '/users', userRoute);

//product routes
app.use(UserBaseRoute + '/products', productRoute)

//jobs routes
app.use(UserBaseRoute+"/jobs",jobsRouter)

//movie routes
app.use(UserBaseRoute+"/movies",movieRouter)

//auth routers
app.use(UserBaseRoute + '/auth', authRouter);

const server = new ApolloServer({typeDefs:schema,resolvers:resolver})

//server start for graphql
server.start().then(()=>{
    return app.use('/graphql',expressMiddleware(server));
})

//server start for rest-Api
app.listen(PORT, () => {
    console.log(`your server is running on port ${PORT}`)
})

