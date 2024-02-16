var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
require('../models/connection');
const {ObjectId} = require("mongoose").Types
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

    if (!checkBody(req.body, ['hashtagName', 'tweetsId'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    Hashtag.findOne({ hashtagName: req.body.hashtagName })
    //.populate('tweets')
    .then(data => {
      if (data /*&& !data.tweets.includes(new ObjectId(String(req.body.tweetsId)))*/) {
        Hashtag.updateOne(
            {hashtagName: req.body.hashtagName},
            {$addToSet: { tweets: req.body.tweetsId }})
        //.populate('tweets')
        .then((data) => {
          return res.json({ result: data.modifiedCount, hashtag: data});
        })
        
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

  router.delete('/', (req, res) => {
    Hashtag.deleteOne({hashtagName:req.body.hashtagName}).then((data) => {
        return res.json({ result: true, hashtag: data });
       }).then(() => {});
  });

  module.exports = router