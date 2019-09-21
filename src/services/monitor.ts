import cote from 'cote';
import { config } from 'node-config-ts';
new cote.Monitor({ name: config.monitor.name });
