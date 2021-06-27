const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    let NLUInstance = getNLUInstance();
    const analyzeParams = {
        'url': `${req.query.url}`,
        'features': {
            'emotion': {
            }
        }
    };
    NLUInstance.analyze(analyzeParams)
        .then(analysisResults => {
            const result = analysisResults.result.emotion.document
            res.send(result.emotion);
        })
        .catch(err => {
            console.log('error:', err);
            res.send(err);
        });
});

app.get("/url/sentiment", (req, res) => {
    let NLUInstance = getNLUInstance();
    const analyzeParams = {
        'url': `${req.query.url}`,
        'features': {
            'sentiment': {
            }
        }
    };
    NLUInstance.analyze(analyzeParams)
        .then(analysisResults => {
            const result = analysisResults.result.sentiment.document;
            res.send(result.label);
        })
        .catch(err => {
            res.sendStatus(err.code);
        });
});

app.get("/text/emotion", (req, res) => {
    let NLUInstance = getNLUInstance();
    const analyzeParams = {
        'text': `${req.query.text}`,
        'features': {
            'emotion': {
            }
        }
    };
    NLUInstance.analyze(analyzeParams)
        .then(analysisResults => {
            const result = analysisResults.result.emotion.document
            res.send(result.emotion);
        })
        .catch(err => {
            console.log('error:', err);
            res.send(err);
        });
});

app.get("/text/sentiment", (req, res) => {
    let NLUInstance = getNLUInstance();
    const analyzeParams = {
        'text': `${req.query.text}`,
        'features': {
            'sentiment': {
            }
        }
    };
    NLUInstance.analyze(analyzeParams)
        .then(analysisResults => {
            const result = analysisResults.result.sentiment.document;
            res.send(result.label);
        })
        .catch(err => {
            res.sendStatus(err.code);
        });
});

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})