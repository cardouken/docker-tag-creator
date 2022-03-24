/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 690:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(690);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;