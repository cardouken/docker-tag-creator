const core = require('@actions/core');

async function run() {
    try {
        const registryUrl = core.getInput('registry_url', {required: false});
        const dockerName = core.getInput('docker_name', {required: false});
        const baseVersion = core.getInput('base_version', {required: false});
        const tag = core.getInput('tag', {required: false});
        const githubRef = core.getInput('tag', {required: false});
        const useLatest = core.getInput('latest', {required: false});
        const customTags = await getInputList('custom_tags') || `\n`;

        if (customTags.length > 0) {
            core.setOutput('tags', customTags.join('\n'));
            return;
        }

        let tags = [];
        let fullDockerName = `${registryUrl}/${dockerName}`;
        let baseVersionTag = `${fullDockerName}:${baseVersion}`;

        const fullVersionTag = `${baseVersionTag}.${tag}`;
        if (useLatest === 'true') {
            baseVersionTag = `${fullDockerName}:latest`;
        }
        if (githubRef === 'refs/heads/main' || githubRef === 'refs/heads/master') {
            tags.push(baseVersionTag);
        } else {
            tags.push(baseVersionTag);
            tags.push(fullVersionTag);
        }

        core.setOutput('tags', tags.join('\n'));
    } catch (error) {
        core.setFailed(error.message);
    }
}

function getInputList(name) {
    const res = [];
    const items = core.getInput(name, {required: false});
    if (items === '') {
        return res;
    }

    const list = items.split(',');
    for (const item of list) {
        res.push(item.trim());
    }

    return res.filter(item => item).map(pat => pat.trim());
}

run().then(r => console.log(r)).catch(e => console.error(e));