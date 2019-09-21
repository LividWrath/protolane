import fastify from 'fastify';
import http from 'http';
import cote, { Requester } from 'cote';
import sensible from 'fastify-sensible';

import Requesters from './requesters';
import { config } from 'node-config-ts';
import Validators from './validators';

const appConfig = config.app;
const port = appConfig.port;
const server = fastify();
server.register(sensible);
const requesters = new Requesters();
const validators = new Validators();
const opts = {};
server.post('/', opts, (req, reply) => {
  if (validators.isValid(req.body.query)) {
    if (validators.isValidIp(req.body.query)) {
      requesters
        .requestIpData(req.body.query, req.body.services)
        .then(data => {
          reply
            .header('content-type', 'application/json')
            .code(200)
            .send(JSON.stringify(data));
        })
        .catch(err => {
          reply
            .header('content-type', 'application/json')
            .code(500)
            .send(JSON.stringify(err));
        });
    } else {
      requesters
        .requestDomainData(req.body.query, req.body.services)
        .then(data => {
          reply
            .header('content-type', 'application/json')
            .code(200)
            .send(JSON.stringify(data));
        })
        .catch(err => {
          reply
            .header('content-type', 'application/json')
            .code(500)
            .send(JSON.stringify(err));
        });
    }
  } else {
    reply.badRequest('Invalid query string');
  }
});
server.listen(port);
