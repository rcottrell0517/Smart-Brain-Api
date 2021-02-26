const { json } = require('body-parser');
const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '75f1789e9169419baf036d504992c557'
   });

   const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
   }



const handleImage = (req, res, db) => {
    const { id } = req.body;

   db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        // console.log(entries);
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}
