import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import * as cors from "cors";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://platform-demo-9e004.firebaseio.com",
});

const app = express();
const port = 8083;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookies
// app.use(cookieParser());

// cross origin resource sharing
app.use(cors());

// define a route handler for the default home page
app.get("/", async (req: any, res: any) => {
    try {
        const db = admin.firestore();
        // const { query } = req;

        const carsQuery = db.collection("cars");

        const carsResult = await carsQuery.get();

        const cars: object[] = [];

        carsResult.forEach(doc => {
            cars.push(doc.data());
        });

        res.json({ cars });
    } catch (err) {
        res.status(500).send(err);
    }
});


if (process.env.NODE_ENV === 'development') {
    app.listen(port, () => {
        console.info('listening at %s', port);
    });
} else {
    exports.app = functions.https.onRequest(app);
}
