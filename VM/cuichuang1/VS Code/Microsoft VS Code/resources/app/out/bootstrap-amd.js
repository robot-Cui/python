/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";const loader=require("./vs/loader"),bootstrap=require("./bootstrap"),nlsConfig=bootstrap.setupNLS();loader.config({baseUrl:bootstrap.fileUriFromPath(__dirname,{isWindows:"win32"===process.platform}),catchError:!0,nodeRequire:require,nodeMain:__filename,"vs/nls":nlsConfig,amdModulesPattern:/^vs\//,recordStats:!0}),(process.env.ELECTRON_RUN_AS_NODE||process.versions.electron)&&loader.define("fs",["original-fs"],(function(o){return o})),nlsConfig&&nlsConfig.pseudo&&loader(["vs/nls"],(function(o){o.setPseudoTranslation(nlsConfig.pseudo)})),exports.load=function(o,e,s){o&&(process.env.VSCODE_NODE_CACHED_DATA_DIR&&loader.config({nodeCachedData:{path:process.env.VSCODE_NODE_CACHED_DATA_DIR,seed:o}}),loader([o],e=e||function(){},s=s||function(o){console.error(o)}))};
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/940b5f4bb5fa47866a54529ed759d95d09ee80be/core/bootstrap-amd.js.map