process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser'), xmlparser = require('express-xml-bodyparser');
const axios = require('axios');
const { request } = require('express');
const cors = require('cors');
// const apiRoutes = require('./routes/api');

const SERVER_PORT = process.env.SERVER_PORT || 8081

app.use(cors());
app.use(xmlparser());

app.use('/', async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.status(401).json({ message: 'Missing Authorization Header' });
    } else {
        console.log(req.headers.authorization)
        const uccx_uri = `${process.env.UCCX_FINNESSE_FQDN}${req.path}`
        try {
            const response = await axios.get(uccx_uri, {
                headers: {
                    Authorization: req.headers.authorization,
                }
            })

            // const response = await axios.get(uccx_uri, {
            //     headers: {
            //         Authorization: req.headers.authorization,
            //         "Content-Type": "application/xml",
            //         accept: '*/*'
            //     }
            // })
            console.log(response.headers);
            // res.send("Got It");
            res.send(response.data);
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        // console.log(uccx_uri)
        // console.log(req.path)
        // res.send(req.rawBody)
    }
    //res.status(404).send("<h1>404 File Not Found</h1>");
    // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})




app.listen(SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});