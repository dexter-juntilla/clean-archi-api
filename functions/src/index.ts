import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from './routes';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://platform-demo-9e004.firebaseio.com",
});

const app = express();
const firestore = admin.firestore();
const port = 8083;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookies
// app.use(cookieParser());

// cross origin resource sharing
app.use(cors());

routes(app, admin, firestore);

if (process.env.NODE_ENV === 'development') {
    app.listen(port, () => {
        console.info('listening at %s', port);
    });
} else {
    exports.app = functions.https.onRequest(app);
}
