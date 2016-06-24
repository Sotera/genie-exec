'use strict';
module.exports = function (server) {
  let path = require('path');
  let pathToViews = path.join(__dirname, '../views');
  server.set('view engine', 'jade');
  server.set('views', pathToViews);

  server.get(
    ['/test/:view'], function (req, res) {
/*    ['/modules/:module/views/:view',
      '/modules/:module/views/:elements/:view'], function (req, res) {
      let module = req.params.module;
      let view = req.params.view;
      let elements = req.params.elements
        ? '/' + req.params.elements + '/'
        : '/';
      let url = module + '/views' + elements + view;*/
      let url = req.params.view || 'index';
      if(/html$/i.test(url)){
        res.sendFile(url, {root: pathToViews});
      }else{
        res.render(url, {title: 'Genie-Exec'});
      }
    });
};
