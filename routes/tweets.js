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
            date: new Date(),
            likes: req.body.likes,
            user: req.body.user,
            hashtags: [req.body.hashtags]
        });
  
        newTweet.save().then(newDoc => {
          res.json({ result: true, content: newDoc.content });
        });
     
    });
  


    router.get('/', (req, res) => {
        Tweet.find().populate('user').then(data => {
          if (data.length > 0) {
            res.json({ result: true, tweets: data });
          } else {
            res.json({ result: false, error: 'No tweet found'});
          }
        });
    });

    router.delete('/', (req, res) => {
        Tweet.deleteMany().then(() => {
 
            return res.json({result: true, report: data});
           
           });
    });
    

module.exports = router;