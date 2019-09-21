import cote from 'cote';
import virusTotalApi = require('virustotal-api');
import { config } from 'node-config-ts';

const virusTotalConfig = config.virusTotal;
const virusTotal = new virusTotalApi(virusTotalConfig.apiKey);

const serviceName = virusTotalConfig.name;
const serviceKey = virusTotalConfig.key;

const virusTotalResponder = new cote.Responder({
  name: serviceName,
  key: serviceKey,
  respondsTo: [virusTotalConfig.requestName]
});

function pullUrlReport(domain: string) {
   return virusTotal.urlReport(domain);
}

virusTotalResponder.on(virusTotalConfig.requestName, req => {
  return pullUrlReport(req.payload);
});
