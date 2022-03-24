const core = require('@actions/core');

try {
    const registryUrl = core.getInput('registry_url', {required: false});
    const dockerName = core.getInput('docker_name', {required: true});
    const baseVersion = core.getInput('base_version', {required: true});
    const tag = core.getInput('tag', {required: false});
    const githubRef = core.getInput('tag', {required: true});
    const useLatest = core.getInput('latest', {required: false});

    let fullDockerName = `${registryUrl}/${dockerName}`;
    let baseVersionTag = `${fullDockerName}:${baseVersion}`;
    const fullVersionTag = `${baseVersionTag}.${tag}`;
    if (useLatest === 'true') {
        baseVersionTag = `${fullDockerName}:latest`;
    } else {
        baseVersionTag = `${fullDockerName}:${baseVersion}`;
    }

    let tags = [];
    if (githubRef === 'refs/heads/main' || githubRef === 'refs/heads/master') {
        tags.push(baseVersionTag);
    } else {
        tags.push(baseVersionTag);
        tags.push(fullVersionTag);
    }

    core.setOutput("tags", tags);
} catch (error) {
    core.setFailed(error.message);
}
