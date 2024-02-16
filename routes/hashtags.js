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
      if (data && data.tweets.includes(req.body.tweetsId)) {
        Hashtag.updateOne(
            {hashtagName: req.body.hashtagName},
            {$push: { tweets: req.body.tweetsId }})
        .populate('tweets')
        .then((data) => {
          return res.json({ result: true, hashtag: data});})
        
      } else if (data === null) {
        const newHashtag = new Hashtag({
            hashtagName: req.body.hashtagName,
            tweets: [req.body._id]
            
          });
    
          newHashtag.save().then(newDoc => {
            res.json({ result: true, hashtag: newDoc });
          });
      } else {
        return res.json({ result: false, error: 'tweet already added'});
      }
    });
  });

  router.delete('/', (req, res) => {
    Hashtag.deleteOne({hashtagName:req.body.hashtagName}).then((data) => {
        return res.json({ result: true, hashtag: data });
       }).then(() => {});
  });

  module.exports = router