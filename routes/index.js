var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.useragent.isMobile) {
    return res.render('mobile/index');
  }
  res.render('desktop/index', { title: 'Express' });
});

module.exports = router;
