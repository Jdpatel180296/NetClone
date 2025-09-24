import express from "express";
import type { Request, Response } from "express";
import { expressMiddleware } from '@as-integrations/express4'
import createApolloGraphqlServer from './graphql';


async function init() {
    const app = express();
    const PORT = Number(process.env.port) || 8000;

    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {

        res.json("App is listening.")

    })

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })

}

init();
