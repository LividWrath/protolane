import cote from 'cote';
import GeoIP from 'simple-geoip';
import {config} from 'node-config-ts';

const geoIPConfigs = config.geoIp;

const apiKey = geoIPConfigs.apiKey;
const serviceName = geoIPConfigs.name;
const serviceKey = geoIPConfigs.key;
const geoIP = new GeoIP(apiKey);

const geoIpResponder = new cote.Responder({
  name: serviceName,
  key: serviceKey,
  respondsTo: [geoIPConfigs.requestName]
});

function performGeoIPLookUp(iP: string) {
  return new Promise((resolve, reject) => {
    geoIP.lookup(iP, (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
}

geoIpResponder.on(geoIPConfigs.requestName, (req => {
  return performGeoIPLookUp(req.payload);
}));
