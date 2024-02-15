var express = require('express');
var router = express.Router();
const {ObjectId} = require("mongoose").Types
require('../models/connection');
const Hashtag = require('../models/hashtags');



router.get('/:hashtagName', (req, res) => {
    Hashtag.findOne({ hashtagName: req.params.hashtagName })
    .populate('tweets')
    .then(data => {
      if (data) {
        res.json({ result: true, hashtagName:data});
      } else {
        res.json({ result: false, error: 'Hashtag not found' });
      }
    });
  });

  router.post('/', (req, res) => {
    Hashtag.findOne({ hashtagName: req.body.hashtagName })
    .populate('tweets')
    .then(data => {
      if (data) {
        Hashtag.updateOne(
            {hashtagName: req.body.hashtagName},
            {$addToSet: { tweets: req.body.tweetsId }})
        .populate('tweets')
        res.json({ result: true, hashtag:data});
      } else {
        const newHashtag = new Hashtag({
            hashtagName: req.body.hashtagName,
            tweets: [req.body.tweetsId]
            
          });
    
          newHashtag.save().then(newDoc => {
            res.json({ result: true, hashtag: newDoc });
          });
      }
    });
  });


  module.exports = router