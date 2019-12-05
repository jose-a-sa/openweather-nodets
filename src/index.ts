import express from "express";

const app: express.Application = express();
const port: number = 8000; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world! from Typescript");
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
