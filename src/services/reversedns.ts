import cote from 'cote';
import dns from 'dns';
import {config} from 'node-config-ts';

const reverseDnsConfig = config.reverseDns;
const serviceName = reverseDnsConfig.name;
const serviceKey = reverseDnsConfig.key;

const reverseDnsResponder = new cote.Responder({
  name: serviceName,
  key: serviceKey,
  respondsTo: [reverseDnsConfig.requestName]
});

function performReverseLookup(ip: string) {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, hostNames) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(hostNames);
      }
    });
  });
}

reverseDnsResponder.on(reverseDnsConfig.requestName, req => {
  return performReverseLookup(req.payload);
});
