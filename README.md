# Albums Docker tags creator

Creates tags for use with docker/build-push-action@v2.

### Inputs

Following inputs can be used as `step.with` keys

| Name           | Type    | Description                                                                                                              | Required |
|----------------|---------|--------------------------------------------------------------------------------------------------------------------------|----------|
| `registry_url` | String  | Registry url (e.g. `ghcr.io`). Default `ghcr.io`                                                                         | No       |
| `docker_name`  | String  | Repository and name (e.g. `albums/base-jdk`)                                                                             | Yes      |  
| `base_version` | String  | Base version (e.g. `17`)                                                                                                 | Yes      |
| `github_ref`   | String  | `{{ github.GITHUB_REF }}` - if heads/main or heads/master, the output will only be one tag without the full version/tag) | Yes      |
| `tag`          | String  | 'Tag (e.g. `latest` or any other value such as `${{ gi thub.RUN_ID }}`'                                                  | No       |
| `latest`       | Boolean | true/false, if true, main/master tags will be appended with `latest`. Default `false`                                    | No       |

### outputs

Following outputs are available

| Name       | Type   | Description            |
|------------|--------|------------------------|
| `tags`     | List   | List of generated tags |

### Example usage with ref `main` with `GITHUB_REF` being `15`

```yaml
steps:
  - name: Create Docker tags
    id: create-tags
    uses: actions/docker-tag-creator@main
    with:
      registry_url: 'ghcr.io'
      docker_name: 'albums/base-jdk'
      base_version: '17'
      github_ref: { { github.GITHUB_REF } }
      latest: true
````

### Output example:

````
ghcr.io/albums/base-jdk:latest
ghcr.io/albums/base-jdk:17.15
````

### Example usage with from PR with `tag` run number value being `15`

```yaml
steps:
  - name: Create Docker tags
    id: create-tags
    uses: actions/docker-tag-creator@main
    with:
      registry_url: 'ghcr.io'
      docker_name: 'albums/base-jdk'
      base_version: '17'
      tag: { { github.RUN_NUMBER } }
```

### Output example:

````
ghcr.io/albums/base-jdk:17.15
