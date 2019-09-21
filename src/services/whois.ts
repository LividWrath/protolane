import cote from 'cote';
import whois from 'whois';
import parser from 'parse-whois';
import { config } from 'node-config-ts';

const whoisConfig = config.whois;
const serviceName = whoisConfig.name;
const serviceKey = whoisConfig.key;

const whoisResponder = new cote.Responder({
  name: serviceName,
  key: serviceKey,
  respondsTo: [whoisConfig.requestName]
});

function performWhoisLookup(domain: string) {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(parser.parseWhoIsData(data));
      }
    });
  });
}

whoisResponder.on(whoisConfig.requestName, req => {
  return performWhoisLookup(req.payload);
});
