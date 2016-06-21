import {LoopbackComponentExplorer} from "loopback-component-explorer";
const loopback:()=>any = require('loopback');
const boot = require('loopback-boot');
let server = module.exports = loopback();
server.start = function () {
  // start the web server
  return server.listen(function () {
    server.emit('started');
    let baseUrl = server.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    let loopbackComponentExplorer:LoopbackComponentExplorer = server.get('loopback-component-explorer');
    if (loopbackComponentExplorer) {
      let explorerPath = loopbackComponentExplorer.mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(server, __dirname, function (err) {
  if (err) {
    throw err;
  }
  // start the server if `$ node server.js`
  if (require.main === module) {
    server.start();
  }
});
