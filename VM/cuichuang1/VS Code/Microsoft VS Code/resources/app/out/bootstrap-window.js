/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";!function(e,o){"object"==typeof exports?module.exports=o():e.MonacoBootstrapWindow=o()}(this,(function(){const e=window.MonacoBootstrap,o=d(),n=o.context.sandbox,t=o.webFrame,r=o.process,a=function(){const e=(window.location.search||"").split(/[?&]/).filter((function(e){return!!e})).map((function(e){return e.split("=")})).filter((function(e){return 2===e.length})).reduce((function(e,o){return e[o[0]]=decodeURIComponent(o[1]),e}),{});return JSON.parse(e.config||"{}")||{}}(),i=r.resolveEnv(a.userEnv);function s(e,n){if(n){o.ipcRenderer.send("vscode:openDevTools")}console.error(`[uncaught exception]: ${e}`),e&&"string"!=typeof e&&e.stack&&console.error(e.stack)}function d(){return window.vscode}function c(){return globalThis.MonacoPerformanceMarks=globalThis.MonacoPerformanceMarks||[],{mark(e){globalThis.MonacoPerformanceMarks.push(e,Date.now()),performance.mark(e)}}}return{load:function(d,l,u){const m=a.zoomLevel;"number"==typeof m&&0!==m&&t.setZoomLevel(m),r.on("uncaughtException",(function(e){
s(e,f)}));const f=(r.env.VSCODE_DEV||!!a.extensionDevelopmentPath)&&!a.extensionTestsPath;let p;(f||u&&u.forceEnableDeveloperKeybindings)&&(p=function(e){const n=o.ipcRenderer,t="darwin"===r.platform?"meta-alt-73":"ctrl-shift-73",a="darwin"===r.platform?"meta-82":"ctrl-82";let i=function(o){const r=function(e){return[e.ctrlKey?"ctrl-":"",e.metaKey?"meta-":"",e.altKey?"alt-":"",e.shiftKey?"shift-":"",e.keyCode].join("")}(o);r===t||"123"===r?n.send("vscode:toggleDevTools"):r!==a||e||n.send("vscode:reloadWindow")};return window.addEventListener("keydown",i),function(){i&&(window.removeEventListener("keydown",i),i=void 0)}}(u&&u.disallowReloadKeybinding)),globalThis.MonacoBootstrap.enableASARSupport(a.appRoot),u&&"function"==typeof u.canModifyDOM&&u.canModifyDOM(a);const h=globalThis.MonacoBootstrap.setupNLS();let v=h.availableLanguages["*"]||"en";"zh-tw"===v?v="zh-Hant":"zh-cn"===v&&(v="zh-Hans"),window.document.documentElement.setAttribute("lang",v),n||(window.define=void 0),
n||require.define("fs",["original-fs"],(function(e){return e})),window.MonacoEnvironment={};const w={baseUrl:n?`${e.fileUriFromPath(a.appRoot,{isWindows:"win32"===r.platform,scheme:"vscode-file",fallbackAuthority:"vscode-app"})}/out`:`${e.fileUriFromPath(a.appRoot,{isWindows:"win32"===r.platform})}/out`,"vs/nls":h,preferScriptTags:n};n?w.paths={"vscode-textmate":"../node_modules/vscode-textmate/release/main","vscode-oniguruma":"../node_modules/vscode-oniguruma/release/main",xterm:"../node_modules/xterm/lib/xterm.js","xterm-addon-search":"../node_modules/xterm-addon-search/lib/xterm-addon-search.js","xterm-addon-unicode11":"../node_modules/xterm-addon-unicode11/lib/xterm-addon-unicode11.js","xterm-addon-webgl":"../node_modules/xterm-addon-webgl/lib/xterm-addon-webgl.js","iconv-lite-umd":"../node_modules/iconv-lite-umd/lib/iconv-lite-umd.js",jschardet:"../node_modules/jschardet/dist/jschardet.min.js"}:w.amdModulesPattern=/^vs\//,a.nodeCachedDataDir&&(w.nodeCachedData={path:a.nodeCachedDataDir,seed:d.join("")}),
u&&"function"==typeof u.beforeLoaderConfig&&u.beforeLoaderConfig(a,w),require.config(w),h.pseudo&&require(["vs/nls"],(function(e){e.setPseudoTranslation(h.pseudo)})),u&&"function"==typeof u.beforeRequire&&u.beforeRequire(),require(d,async e=>{try{const o=c();o.mark("willWaitForShellEnv"),await i,o.mark("didWaitForShellEnv");const n=l(e,a);n instanceof Promise&&(await n,p&&u&&u.removeDeveloperKeybindingsAfterLoad&&p())}catch(e){s(e,f)}},s)},globals:d,perfLib:c}}));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/940b5f4bb5fa47866a54529ed759d95d09ee80be/core/bootstrap-window.js.map
