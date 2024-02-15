const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');
var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    if (!checkBody(req.body, ['content', 'user'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

        const newTweet = new Tweet({
            content: req.body.content,
            date: req.body.date,
            likes: req.body.likes,
            user: req.body.user,
            hashtags: [req.body.hashtags]
        });
  
        newTweet.save().then(newDoc => {
          res.json({ result: true, content: newDoc.content });
        });
     
    });
  

module.exports = router;