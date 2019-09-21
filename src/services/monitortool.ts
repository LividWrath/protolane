import cote from 'cote';
import { config } from 'node-config-ts';

const monitoringToolConfig = config.monitoringTool;
cote.MonitoringTool(monitoringToolConfig.port);
