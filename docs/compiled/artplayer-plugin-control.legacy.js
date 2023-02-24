/*!
 * artplayer-plugin-control.js v1.0.0
 * Github: https://github.com/zhw2590582/ArtPlayer
 * (c) 2017-2023 Harvey Zack
 * Released under the MIT License.
 */
!function(t,r,e,o,n){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof a.parcelRequire4dc0&&a.parcelRequire4dc0,i=l.cache||{},p="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(r,e){if(!i[r]){if(!t[r]){var o="function"==typeof a.parcelRequire4dc0&&a.parcelRequire4dc0;if(!e&&o)return o(r,!0);if(l)return l(r,!0);if(p&&"string"==typeof r)return p(r);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}c.resolve=function(e){var o=t[r][1][e];return null!=o?o:e},c.cache={};var s=i[r]=new u.Module(r);t[r][0].call(s.exports,c,s,s.exports,this)}return i[r].exports;function c(t){var r=c.resolve(t);return!1===r?{}:u(r)}}u.isParcelRequire=!0,u.Module=function(t){this.id=t,this.bundle=u,this.exports={}},u.modules=t,u.cache=i,u.parent=l,u.register=function(r,e){t[r]=[function(t,r){r.exports=e},{}]},Object.defineProperty(u,"root",{get:function(){return a.parcelRequire4dc0}}),a.parcelRequire4dc0=u;for(var s=0;s<r.length;s++)u(r[s]);var c=u(e);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd&&define((function(){return c}))}({d3G6W:[function(t,r,e){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(e);var n=t("bundle-text:./style.less"),a=o.interopDefault(n);function l(){return function(t){!function(t){var r=t.constructor,e=r.version,o=r.utils.errorHandle,n=e.split(".").map(Number);o(n[0]+n[1]/100>=4.06,"Artplayer.js@".concat(e," is not compatible the artplayerPluginControl@").concat(l.version,". Please update it to version Artplayer.js@4.6.x"))}(t);var r=t.template,e=r.$bottom,o=r.$player,n=t.constructor.utils,a=n.append,i=n.secondToTime,p=n.addClass,u=n.removeClass,s=n.hasClass;if(!n.isMobile){var c="artplayer-plugin-control";p(o,c);for(var d=a(e,'<div class="apa-control-current"></div>'),f=a(e,'<div class="apa-control-duration"></div>'),g=["video:loadedmetadata","video:timeupdate","video:progress"],b=0;b<g.length;b++)t.on(g[b],(function(){d.innerText=i(t.currentTime),f.innerText=i(t.duration)}));return{name:"artplayerPluginControl",get enable(){return s(o,c)},set enable(t){t?p(o,c):u(o,c)}}}}}if(e.default=l,l.env="production",l.version="1.0.0",l.build="2023-02-24 11:14:29","undefined"!=typeof document&&!document.getElementById("artplayer-plugin-control")){var i=document.createElement("style");i.id="artplayer-plugin-control",i.textContent=a.default,document.head.appendChild(i)}"undefined"!=typeof window&&(window.artplayerPluginControl=l)},{"bundle-text:./style.less":"8jCnX","@parcel/transformer-js/src/esmodule-helpers.js":"47PTV"}],"8jCnX":[function(t,r,e){r.exports=".artplayer-plugin-control .art-bottom{height:68px;min-width:400px;max-width:600px;-webkit-user-select:none;-ms-user-select:none;user-select:none;-webkit-backdrop-filter:saturate(180%)blur(20px);-webkit-backdrop-filter:saturate(180%)blur(20px);-webkit-backdrop-filter:saturate(180%)blur(20px);backdrop-filter:saturate(180%)blur(20px);pointer-events:auto;background-color:rgba(0,0,0,.7);background-image:none;border-radius:10px;flex-direction:column;align-items:center;padding:0;font-size:13px;display:flex;position:absolute;bottom:10px;left:50%;transform:translate(-50%);box-shadow:0 10px 15px -3px rgba(0,0,0,.2),0 4px 6px -4px rgba(0,0,0,.2)}.artplayer-plugin-control .art-bottom .art-progress{width:65%;justify-content:space-between;align-items:center;gap:10px;display:flex}.artplayer-plugin-control .art-bottom .art-progress .art-control-thumbnails{bottom:35px}.artplayer-plugin-control .art-bottom .art-progress .art-control-progress{width:100%}.artplayer-plugin-control .art-bottom .art-progress .art-control-progress .art-control-progress-inner,.artplayer-plugin-control .art-bottom .art-progress .art-control-progress .art-progress-loaded,.artplayer-plugin-control .art-bottom .art-progress .art-control-progress .art-progress-played{border-radius:5px}.artplayer-plugin-control .art-bottom .art-progress .art-progress-tip{top:-40px!important}.artplayer-plugin-control .art-bottom .art-controls{width:100%;height:auto;flex:1;padding:0 5px}.artplayer-plugin-control .art-bottom .art-controls .art-control-time,.artplayer-plugin-control .art-bottom .art-controls .art-controls-center{display:none}.artplayer-plugin-control .art-bottom .art-controls .art-volume-panel{width:60px!important}.artplayer-plugin-control .art-bottom .art-selector-list{background-color:rgba(0,0,0,.8)!important}.artplayer-plugin-control .art-bottom .apa-control-current,.artplayer-plugin-control .art-bottom .apa-control-duration{width:17.5%;justify-content:center;line-height:1;display:flex;position:absolute;top:10px}.artplayer-plugin-control .art-bottom .apa-control-current{left:0}.artplayer-plugin-control .art-bottom .apa-control-duration{right:0}.artplayer-plugin-control .art-settings{bottom:85px}.artplayer-plugin-control.art-control-show .art-subtitle{bottom:80px}.apa-control-current,.apa-control-duration{display:none}"},{}],"47PTV":[function(t,r,e){e.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},e.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.exportAll=function(t,r){return Object.keys(t).forEach((function(e){"default"===e||"__esModule"===e||r.hasOwnProperty(e)||Object.defineProperty(r,e,{enumerable:!0,get:function(){return t[e]}})})),r},e.export=function(t,r,e){Object.defineProperty(t,r,{enumerable:!0,get:e})}},{}]},["d3G6W"],"d3G6W");