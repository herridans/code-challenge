import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import egql from "express-graphql";
import errorHandler from "./configs/error-handler.js";
import productRouter from "./routes/product.js";
import productSchema from "./graphql/schemas/product.js";
import resolvers from "./graphql/resolvers/index.js";

let server = express();

//Server setup
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

//Routes
server.use("/api/product", productRouter);

//Route for graphiql
server.use("/graphiql", egql.graphqlHTTP((request) => {
    return {
        graphiql: true,
        schema: productSchema,
        rootValue: resolvers
    }
}));

//Error handler
server.use(errorHandler);

export default server;