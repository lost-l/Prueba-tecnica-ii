import express = require("express");
import cors = require("cors");
import { DBConnection } from "../database/config";
import { router as routerProd } from "../routes/product.router";
import { router as routerUser } from "../routes/user.router";
import { router as routerAuth } from "../routes/auth.router";
import { router as routerPurchase } from "../routes/purchase.router";

export class Server {
    readonly app = express();
    readonly port = process.env.PORT;

    constructor() {
        this.connectDB();
        this.routes();
        this.middlewares();
    }

    async connectDB() {
        await DBConnection();
    }

    middlewares() {
        this.app.use(cors());
    }

    routes() {
        this.app.use("/api/auth/login", routerAuth);
        this.app.use("/api/user", routerUser);
        this.app.use("/api/products", routerProd);
        this.app.use("/api/purchase", routerPurchase);
        this.app.use("*", (req: express.Request, res: express.Response) => {
            res.status(404).json({
                error: "Endpoint not found"
            })
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on http://localhost:${this.port}`)
        })
    }
}
