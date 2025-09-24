import express from "express";
import type { Request,Response } from "express";
import { ApolloServer  } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express4'
import { isNoSubstitutionTemplateLiteral } from "typescript";

async function init() {
    const app = express();
    const PORT = Number(process.env.port) || 8000;
    
    app.use(express.json());
    //Create GraphQL server
    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query {
                hello : String
            }
        `,
        resolvers : {
            Query : {
                hello : () => `Hey there I am graphql server`,
            },
        }

    });
    //Start the gql server
    await gqlServer.start();
    
    app.get("/",(req:Request,res:Response) => {
    
        res.json("App is listening.")
    
    })

    app.use("/graphql",expressMiddleware(gqlServer)); 
    
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
      
}

init();