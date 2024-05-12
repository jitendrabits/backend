const express = require('express');

const app = express.Router();

const morgan = require('morgan');

const all_pages = require('./app/routes/index');

const db = require('./app/model/db');

const cors = require('cors');

require("./app/config/media-upload");

const bodyParser = require('body-parser');

const baseUrl = "/api";

app.use(bodyParser.json({ limit: "20mb" }));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(express.json());

app.use(morgan('dev'));

const whitelist = ['https://fevoff-admin.netlify.app', 'https://fevoff.netlify.app', 'http://localhost:3000', 'http://localhost:3002', 'https://fevoff.vercel.app', 'https://fevoff-admin.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};


app.use(cors(corsOptions));

const connectionCheck = async () => {

    try {
        const connection = db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("connection established successfully");
        }).catch((err) => {
            console.log(err);
            process.exit();
        });
    } catch (err) {
        console.log("Error: ", err.message);
        throw err;
        return;
    }

};

connectionCheck();

app.use(baseUrl, all_pages);

app.get('/', (req, res) => {

    res.status(200).send({

        message: "API Running Successfully...!",
        status: true,
        data: [],

    });

});

module.exports = app;