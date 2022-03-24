# Albums Docker tags creator

Creates tags for use with docker/build-push-action@v2 depending on git refs.

 ---

### Inputs

Following inputs can be used as `step.with` keys

| Name           | Type    | Description                                                                                                                             |
|----------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `registry_url` | String  | Registry url (e.g. `ghcr.io`). Default `ghcr.io`                                                                                        |
| `docker_name`  | String  | Repository and name (e.g. `fedora/http`)                                                                                                |  
| `base_version` | String  | Base version (e.g. `3`)                                                                                                                 |
| `github_ref`   | String  | `{{ github.GITHUB_REF }}` - if `refs/heads/main` or `refs/heads/master`, only one tag with `:latest` or `:base_version` will be created |
| `tag`          | String  | Tag (e.g. `latest` or any other value such as `${{ github.RUN_ID }}`                                                                    |
| `latest`       | Boolean | true/false, if true, main/master tags will be appended with `latest`. Default `false`                                                   |
| `custom_tags`  | List    | Passes tags through as-is and returns the input. Ignores every other input. Use newlines to pass tags.                                  |

### Outputs

Following outputs are available

| Name       | Type   | Description            |
|------------|--------|------------------------|
| `tags`     | String | List of generated tags |

 ---

### 1. Example usage with ref `main` with `GITHUB_REF` being `15`

```yaml
steps:
  - name: Create Docker tags
    id: create-tags
    uses: actions/docker-tag-creator@main
    with:
      registry_url: 'ghcr.io'
      docker_name: 'fedora/http'
      base_version: '3'
      github_ref: {{ github.GITHUB_REF }}
      latest: true
````

#### Output:

````
ghcr.io/fedora/http:latest, ghcr.io/fedora/http:3.15
````

 ---

### 2. Example usage with from PR with `tag` run number value being `15`

```yaml
steps:
  - name: Create Docker tags
    id: create-tags
    uses: actions/docker-tag-creator@main
    with:
      registry_url: 'ghcr.io'
      docker_name: 'fedora/http'
      base_version: '3'
      tag: {{ github.RUN_NUMBER }}
```

#### Output:

````
ghcr.io/fedora/http:3.15
````

 ---

### 3. Example usage with from PR with `tag` run number value being `15` and `latest` being `false`

```yaml
steps:
  - name: Create Docker tags
    id: create-tags
    uses: actions/docker-tag-creator@main
    with:
      registry_url: 'ghcr.io'
      docker_name: 'fedora/http'
      base_version: '3'
      tag: {{ github.RUN_NUMBER }}
      latest: false
```

#### Output example:

````
ghcr.io/fedora/http:3, ghcr.io/fedora/http:3.15
````

 ---

### 4. Example usage with custom tags

```yaml
steps:
  - name: Create Docker tags
    id: create-tags
    uses: actions/docker-tag-creator@main
    with:
      custom_tags: |
       ghcr.io/fedora/http:1.0.0
       ghcr.io/fedora/http:latest
       fedora/http
```

#### Output example:

````
ghcr.io/fedora/http:1.0.0
ghcr.io/fedora/http:latest
fedora/http
````