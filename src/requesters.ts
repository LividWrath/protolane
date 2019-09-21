import cote, { Requester } from 'cote';
import { config } from 'node-config-ts';

export default class Requesters {
  geoIpRequester: Requester;
  pingRequester: Requester;
  reverseDnsRequester: Requester;
  whoisRequester: Requester;
  virusTotalRequester: Requester;
  constructor() {
    this.geoIpRequester = new Requester({
      name: `${config.geoIp.name}_requester`,
      key: config.geoIp.key,
      requests: [config.geoIp.requestName]
    });
    this.pingRequester = new Requester({
      name: `${config.ping.name}_requester`,
      key: config.ping.key,
      requests: [config.ping.requestName]
    });
    this.reverseDnsRequester = new Requester({
      name: `${config.reverseDns.name}_requester`,
      key: config.reverseDns.key,
      requests: [config.reverseDns.requestName]
    });
    this.whoisRequester = new Requester({
      name: `${config.whois.name}_requester`,
      key: config.whois.key,
      requests: [config.whois.requestName]
    });
    this.virusTotalRequester = new Requester({
      name: `${config.virusTotal.name}_requester`,
      key: config.virusTotal.key,
      requests: [config.virusTotal.requestName]
    });
  }

  makeGeoIpRequest(payload: string) {
    return this.geoIpRequester.send({ type: config.geoIp.requestName, payload });
  }

  makePingRequest(payload: string) {
    return this.pingRequester.send({ type: config.ping.requestName, payload });
  }

  makeReverseDnsRequest(payload: string) {
    return this.reverseDnsRequester.send({ type: config.reverseDns.requestName, payload });
  }

  makeWhoisRequest(payload: string) {
    return this.whoisRequester.send({ type: config.whois.requestName, payload });
  }

  makeVirusTotalRequest(payload: string) {
    return this.virusTotalRequester.send({ type: config.virusTotal.requestName, payload });
  }
  requestDomainData(domain: string, options: string[] = config.app.domainDefaults) {
    const promises = this.generatePromiseArray(domain, options);
    return Promise.all(promises.map(p => p.catch(err => err)));
  }
  requestIpData(ip: string, options: string[] = config.app.ipDefaults) {
     const promises = this.generatePromiseArray(ip, options);
     return Promise.all(promises.map(p => p.catch(err => err.message)));
  }
  requestAllData(payload: string, options: string[] = config.app.allFeatures) {
    const promises = this.generatePromiseArray(payload, options);
    return Promise.all(promises.map(p => p.catch(err => err)));
  }

  generatePromiseArray(payload: string, options: string[]) {
    const promises = new Array<Promise<any>>();
    if (options.includes('geoip')) {
      promises.push(this.makeGeoIpRequest(payload));
    }
    if (options.includes('ping')) {
      promises.push(this.makePingRequest(payload));
    }
    if (options.includes('virustotal')) {
      promises.push(this.makeVirusTotalRequest(payload));
    }
    if (options.includes('whois')) {
      promises.push(this.makeWhoisRequest(payload));
    }
    if (options.includes('reversedns')) {
      promises.push(this.makeReverseDnsRequest(payload));
    }
    return promises;
  }
}
