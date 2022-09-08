
- trilium
  - api
  - ui

```json
{
    // base name
    name: 'trilium',
    // service or app
    type: 'service', 
    // enable or disable the service
    enable: true,
    // developer who published such service
    maintainer: 'David <david@cryptic.dev> Mydlarz',
    // docker image information
    supportedVersion: {
        // internal name
		name: 'trilium',
        // external identifier name
		fancyName: 'Trilium Notes',
        // base docker image uri
		baseImage: 'zadam/trilium',
        // dependency images
		images: [],
        // supported version
		versions: ['latest'],
        // version end-user should use
		recommendedVersion: 'latest',
        // listening ports
		ports: {
			main: 8080
		}
    }
}
```