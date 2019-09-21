import cote from 'cote';
import ping from 'ping';
import {config} from 'node-config-ts';

const pingConfigs = config.ping;
const serviceName = pingConfigs.name;
const serviceKey = pingConfigs.key;

const geoIpResponder = new cote.Responder({
  name: serviceName,
  key: serviceKey,
  respondsTo: [pingConfigs.requestName]
});

function performPingProbe(domain: string) {
  return ping.promise.probe(domain);
}

geoIpResponder.on(pingConfigs.requestName, (req) => {
  return performPingProbe(req.payload);
});
