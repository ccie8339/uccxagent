process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser'), xmlparser = require('express-xml-bodyparser');
const axios = require('axios');
// const { request } = require('express');
const cors = require('cors');


const SERVER_PORT = process.env.SERVER_PORT || 8081

app.use(cors());
app.use(xmlparser());

app.use('/', async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.status(401).json({ message: 'Missing Authorization Header' });
    } else {
        const uccx_uri = `${process.env.UCCX_FINNESSE_FQDN}${req.path}`
        try {

            let response;
            let headers = req.headers;
            delete headers.origin;
            delete headers.referer;
            delete headers.host;
            switch (req.method) {
                case "PUT":
                    response = await axios.put(uccx_uri, req.rawBody, {
                        headers: headers
                    })
                    break;
                case "GET":
                    response = await axios.get(uccx_uri, {
                        headers: headers
                    })
            }
            res.status(response.status).send(response.data);
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    res.status(401).send("User Not Authorized");
                    break;
                default:
                    // console.log(error.response);
                    res.status(500).send(error.response.data);
            }
        }
    }
})




app.listen(SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});