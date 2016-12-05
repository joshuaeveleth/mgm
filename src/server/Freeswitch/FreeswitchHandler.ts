
import * as express from 'express';

import { Freeswitch } from './Freeswitch';

export function FreeswitchHandler(fs: Freeswitch): express.Router {
  let router = express.Router();

  router.get('/', (req,res) => {
    console.log('get: /fsapi')
    //res.send(fs.config());
    let freeswitchIP = "XXXX";

    let xml = '<config>' +
      '<Realm>' + freeswitchIP + '</Realm>' +
      '<SIPProxy>' + freeswitchIP+":5060" + '</SIPProxy>' +
      '<AttemptUseSTUN>' + 'false' + '</AttemptUseSTUN>' +
      '<EchoServer>' + freeswitchIP + '</EchoServer>' +
      '<EchoPort>' + 50505 + '</EchoPort>' +
      '<DefaultWellKnownIP>' + freeswitchIP + '</DefaultWellKnownIP>' +
      '<DefaultTimeout>' + 5000 + '</DefaultTimeout>' +
      '<Context>' + 'default' + '</Context>' +
      '<APIPrefix>' + '/fsapi' + '</APIPrefix>' +
      '</config>';

    res.send(xml);
  });

  /*router.post('/freeswitch-config', (req, res) => {
    let remoteIP: string = req.ip.split(':').pop();
    console.log('post: /fsapi/freeswitch-config from ' + remoteIP);
    let section = req.body.section;

    switch (section) {
      case 'directory':
        console.log('/freeswitch-config: directory');
        return res.send(fs.directory(req.body));
      case 'dialplan':
        console.log('/freeswitch-config: dialplan');
        return res.send(fs.dialplan(req.body));
      default:
        console.log('unknown freeswitch config section: ' + section);
    }
    res.send('');
  });

  router.post('/viv_get_prelogin.php', (req, res) => {
    let remoteIP: string = req.ip.split(':').pop();
    console.log('post: /fsapi/viv_get_prelogin.php from ' + remoteIP);
    let result = fs.config();
    console.log(result);
    return res.send(result);
  });

  router.post('/viv_signin.php', (req, res) => {
    let remoteIP: string = req.ip.split(':').pop();
    console.log('post: /fsapi/viv_signin.php from ' + remoteIP);
    let result = fs.signin(req.body);
    console.log(result);
    return res.send(result);
  });*/

  //region-config
  // fs.getConfig

  router.all('*', (req, res, next) => {
    console.log('voice: ' + req.method + ': ' + req.originalUrl);
    next();
  });

  return router;
}
