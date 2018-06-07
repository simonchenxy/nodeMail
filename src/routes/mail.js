const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mail";

const imapAccount = require('../config/imap');

router
    .use((req, res, next) => {
        console.log('------------------------');
        next();
    })
    .all('/', (req, res) => {

        new Promise((resolve, reject) => {
            resolve(imapAccount('user', 'password', 'imap-mail.outlook.com'));
        }).then(() => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                const dbase = db.db('mail');
                dbase.collection('data').find({}).toArray((err, result) => {
                    if (err) throw err;
                    return res.send(result);
                    db.close();
                })
            })
        })
    })

module.exports = router