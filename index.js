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

        core.info("custom tags length" + customTags.length.toString());
        if (customTags.length > 0) {
            core.setOutput('tags', customTags.join('\n'));
            return;
        }

        const fullDockerName = `${registryUrl}/${dockerName}`;
        let baseVersionTag = `${fullDockerName}:${baseVersion}`;
        const fullVersionTag = `${baseVersionTag}.${tag}`;

        const tags = [];
        switch (githubRef) {
            case 'refs/heads/main':
            case 'refs/heads/master':
                if (useLatest === 'true') {
                    baseVersionTag = `${fullDockerName}:latest`;
                }
                break;
            default:
                tags.push(fullVersionTag);
                break;
        }

        tags.push(baseVersionTag);
        core.info("items in tags array:" + tags);

        core.setOutput('tags', tags.join('\n'));
    } catch (error) {
        core.setFailed(error.message);
    }
}

function getInputList(name) {
    const res = [];
    const items = core.getInput(name, {required: false});
    core.info("items from input:" + items);
    if (items === '') {
        return res;
    }

    const list = items.split(',');
    core.info("items in list after split:" + list);
    for (const item of list) {
        core.info("item in loop:" + item);
        res.push(item.trim());
    }

    return res.filter(item => item).map(v => v.trim());
}

run().then(r => console.log(r)).catch(e => console.error(e));