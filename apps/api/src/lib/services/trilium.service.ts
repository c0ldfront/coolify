import { ComposeFile, createDirectories, defaultComposeConfiguration, encrypt, errorHandler, generatePassword, getServiceFromDB, getServiceImage, getServiceMainPort, makeLabelForServices, persistentVolumes, prisma } from '../common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ServiceStartStop } from '../../routes/api/v1/services/types';
import fs from 'fs/promises';
import yaml from 'js-yaml';
import { startServiceContainers } from './handlers';

class TriliumService {

    private _config: JSON;
    private _running: boolean;

    public async configure({ id, type }: { id: string; type: string; }): Promise<void> {
        await prisma.service.update({
            where: { id },
            data: {
                type
            }
        });
    }

    public async start(request: FastifyRequest<ServiceStartStop>) {
        try {
            const { id } = request.params;
            const teamId = request.user.teamId;
            const service = await getServiceFromDB({ id, teamId });
            const { type, version, destinationDockerId, destinationDocker, serviceSecret, exposePort, persistentStorage } = service;
            const network = destinationDockerId && destinationDocker.network;
            const port = getServiceMainPort('trilium');

            const { workdir } = await createDirectories({ repository: type, buildId: id });
            const image = getServiceImage(type);

            const config = {
                trilium: {
                    image: `${image}:${version}`,
                    volumes: [`${id}-trilium:/home/node/trilium-data`],
                    environmentVariables: {}
                }
            };

            if (serviceSecret.length > 0) {
                serviceSecret.forEach((secret) => {
                    config.trilium.environmentVariables[secret.name] = secret.value;
                });
            }

            const { volumeMounts } = persistentVolumes(id, persistentStorage, config)
            const composeFile: ComposeFile = {
                version: '3.8',
                services: {
                    [id]: {
                        container_name: id,
                        image: config.trilium.image,
                        volumes: config.trilium.volumes,
                        environment: config.trilium.environmentVariables,
                        ...(exposePort ? { ports: [`${exposePort}:${port}`] } : {}),
                        labels: makeLabelForServices('trilium'),
                        ...defaultComposeConfiguration(network),
                    }
                },
                networks: {
                    [network]: {
                        external: true
                    }
                },
                volumes: volumeMounts
            };
            const composeFileDestination = `${workdir}/docker-compose.yaml`;
            await fs.writeFile(composeFileDestination, yaml.dump(composeFile));
            await startServiceContainers(destinationDocker.id, composeFileDestination)
            return {}
        } catch ({ status, message }) {
            return errorHandler({ status, message })
        }
    }

    public stop() {

    }

}