/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";const perf=require("./vs/base/common/performance"),lp=require("./vs/base/node/languagePacks");perf.mark("main:started");const path=require("path"),fs=require("fs"),os=require("os"),bootstrap=require("./bootstrap"),bootstrapNode=require("./bootstrap-node"),paths=require("./paths"),product=require("../product.json"),{app:app,protocol:protocol,crashReporter:crashReporter}=require("electron");app.allowRendererProcessReuse=!1;const portable=bootstrapNode.configurePortable(product);bootstrap.enableASARSupport(void 0);const args=parseCLIArgs(),userDataPath=getUserDataPath(args);app.setPath("userData",userDataPath);const argvConfig=configureCommandlineSwitchesSync(args);let crashReporterDirectory=args["crash-reporter-directory"],submitURL="";if(crashReporterDirectory){if(crashReporterDirectory=path.normalize(crashReporterDirectory),path.isAbsolute(crashReporterDirectory)||(console.error(`The path '${crashReporterDirectory}' specified for --crash-reporter-directory must be absolute.`),app.exit(1)),
!fs.existsSync(crashReporterDirectory))try{fs.mkdirSync(crashReporterDirectory)}catch(e){console.error(`The path '${crashReporterDirectory}' specified for --crash-reporter-directory does not seem to exist or cannot be created.`),app.exit(1)}console.log(`Found --crash-reporter-directory argument. Setting crashDumps directory to be '${crashReporterDirectory}'`),app.setPath("crashDumps",crashReporterDirectory)}else{const e=product.appCenter;if(e&&argvConfig["enable-crash-reporter"]&&!args["disable-crash-reporter"]){const r="win32"===process.platform,o="linux"===process.platform,t=argvConfig["crash-reporter-id"];if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(t)){submitURL=(submitURL=r?e["ia32"===process.arch?"win32-ia32":"win32-x64"]:o?e["linux-x64"]:e.darwin).concat("&uid=",t,"&iid=",t,"&sid=",t);const a=process.argv,s=a.indexOf("--");-1===s?a.push("--crash-reporter-id",t):a.splice(s,0,"--crash-reporter-id",t)}}}
const productName=(product.crashReporter?product.crashReporter.productName:void 0)||product.nameShort,companyName=(product.crashReporter?product.crashReporter.companyName:void 0)||"Microsoft";crashReporter.start({companyName:companyName,productName:process.env.VSCODE_DEV?`${productName} Dev`:productName,submitURL:submitURL,uploadToServer:!crashReporterDirectory}),portable&&portable.isPortable&&app.setAppLogsPath(path.join(userDataPath,"logs")),setCurrentWorkingDirectory(),protocol.registerSchemesAsPrivileged([{scheme:"vscode-webview",privileges:{standard:!0,secure:!0,supportFetchAPI:!0,corsEnabled:!0}},{scheme:"vscode-webview-resource",privileges:{secure:!0,standard:!0,supportFetchAPI:!0,corsEnabled:!0}},{scheme:"vscode-file",privileges:{secure:!0,standard:!0,supportFetchAPI:!0,corsEnabled:!0}}]),registerListeners();const nodeCachedDataDir=getNodeCachedDir();let nlsConfigurationPromise=void 0;const metaDataFile=path.join(__dirname,"nls.metadata.json"),locale=getUserDefinedLocale(argvConfig)
;function startup(e,r){r._languagePackSupport=!0,process.env.VSCODE_NLS_CONFIG=JSON.stringify(r),process.env.VSCODE_NODE_CACHED_DATA_DIR=e||"",perf.mark("willLoadMainBundle"),require("./bootstrap-amd").load("vs/code/electron-main/main",()=>{perf.mark("didLoadMainBundle")})}async function onReady(){perf.mark("main:appReady");try{const[e,r]=await Promise.all([nodeCachedDataDir.ensureExists(),resolveNlsConfiguration()]);startup(e,r)}catch(e){console.error(e)}}function configureCommandlineSwitchesSync(e){const r=["disable-hardware-acceleration","disable-color-correct-rendering","force-color-profile"];"linux"===process.platform&&r.push("force-renderer-accessibility");const o=["enable-proposed-api"],t=readArgvConfigSync();Object.keys(t).forEach(e=>{const a=t[e]
;-1!==r.indexOf(e)?"force-color-profile"===e?a&&app.commandLine.appendSwitch(e,a):!0!==a&&"true"!==a||("disable-hardware-acceleration"===e?app.disableHardwareAcceleration():app.commandLine.appendSwitch(e)):-1!==o.indexOf(e)&&"enable-proposed-api"===e&&(Array.isArray(a)?a.forEach(e=>e&&"string"==typeof e&&process.argv.push("--enable-proposed-api",e)):console.error("Unexpected value for `enable-proposed-api` in argv.json. Expected array of extension ids."))});const a=getJSFlags(e);return a&&app.commandLine.appendSwitch("js-flags",a),t}function readArgvConfigSync(){const e=getArgvConfigPath();let r;try{r=JSON.parse(stripComments(fs.readFileSync(e).toString()))}catch(r){r&&"ENOENT"===r.code?createDefaultArgvConfigSync(e):console.warn(`Unable to read argv.json configuration file in ${e}, falling back to defaults (${r})`)}return r||(r={"disable-color-correct-rendering":!0}),r}function createDefaultArgvConfigSync(e){try{const r=path.dirname(e);fs.existsSync(r)||fs.mkdirSync(r)
;const o=["// This configuration file allows you to pass permanent command line arguments to VS Code.","// Only a subset of arguments is currently supported to reduce the likelihood of breaking","// the installation.","//","// PLEASE DO NOT CHANGE WITHOUT UNDERSTANDING THE IMPACT","//","// NOTE: Changing this file requires a restart of VS Code.","{","\t// Use software rendering instead of hardware accelerated rendering.","\t// This can help in cases where you see rendering issues in VS Code.",'\t// "disable-hardware-acceleration": true,',"","\t// Enabled by default by VS Code to resolve color issues in the renderer","\t// See https://github.com/microsoft/vscode/issues/51791 for details",'\t"disable-color-correct-rendering": true',"}"];fs.writeFileSync(e,o.join("\n"))}catch(r){console.error(`Unable to create argv.json configuration file in ${e}, falling back to defaults (${r})`)}}function getArgvConfigPath(){const e=process.env.VSCODE_PORTABLE;if(e)return path.join(e,"argv.json");let r=product.dataFolderName
;return process.env.VSCODE_DEV&&(r=`${r}-dev`),path.join(os.homedir(),r,"argv.json")}function getJSFlags(e){const r=[];return e["js-flags"]&&r.push(e["js-flags"]),e["max-memory"]&&!/max_old_space_size=(\d+)/g.exec(e["js-flags"])&&r.push(`--max_old_space_size=${e["max-memory"]}`),r.length>0?r.join(" "):null}function getUserDataPath(e){return portable.isPortable?path.join(portable.portableDataPath,"user-data"):path.resolve(e["user-data-dir"]||paths.getDefaultUserDataPath())}function parseCLIArgs(){return require("minimist")(process.argv,{string:["user-data-dir","locale","js-flags","max-memory","crash-reporter-directory"]})}function setCurrentWorkingDirectory(){try{"win32"===process.platform?(process.env.VSCODE_CWD=process.cwd(),process.chdir(path.dirname(app.getPath("exe")))):process.env.VSCODE_CWD&&process.chdir(process.env.VSCODE_CWD)}catch(e){console.error(e)}}function registerListeners(){const e=[];global.macOpenFiles=e,app.on("open-file",(function(r,o){e.push(o)}));const r=[],o=function(e,o){
e.preventDefault(),r.push(o)};app.on("will-finish-launching",(function(){app.on("open-url",o)})),global.getOpenUrls=function(){return app.removeListener("open-url",o),r}}function getNodeCachedDir(){return new class{constructor(){this.value=this._compute()}async ensureExists(){if("string"==typeof this.value)try{return await mkdirp(this.value),this.value}catch(e){}}_compute(){if(process.argv.indexOf("--no-cached-data")>0)return;if(process.env.VSCODE_DEV)return;const e=product.commit;return e?path.join(userDataPath,"CachedData",e):void 0}}}function mkdirp(e){const r=require("fs");return new Promise((o,t)=>{r.mkdir(e,{recursive:!0},r=>r&&"EEXIST"!==r.code?t(r):o(e))})}async function resolveNlsConfiguration(){let e=nlsConfigurationPromise?await nlsConfigurationPromise:void 0;if(!e){let r=app.getLocale();r?(r=r.toLowerCase(),(e=await lp.getNLSConfiguration(product.commit,userDataPath,metaDataFile,r))||(e={locale:r,availableLanguages:{}})):e={locale:"en",availableLanguages:{}}}return e}function stripComments(e){
return e.replace(/("(?:[^\\"]*(?:\\.)?)*")|('(?:[^\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g,(function(e,r,o,t,a){if(t)return"";if(a){const e=a.length;return e>2&&"\n"===a[e-1]?"\r"===a[e-2]?"\r\n":"\n":""}return e}))}function getUserDefinedLocale(e){const r=args.locale;return r?r.toLowerCase():e.locale&&"string"==typeof e.locale?e.locale.toLowerCase():void 0}locale&&(nlsConfigurationPromise=lp.getNLSConfiguration(product.commit,userDataPath,metaDataFile,locale)),app.once("ready",(function(){if(args.trace){const e=require("electron").contentTracing,r={categoryFilter:args["trace-category-filter"]||"*",traceOptions:args["trace-options"]||"record-until-full,enable-sampling"};e.startRecording(r).finally(()=>onReady())}else onReady()}));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/940b5f4bb5fa47866a54529ed759d95d09ee80be/core/main.js.map
