// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3H9sA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function artplayerPluginAds(option) {
    return (art)=>{
        const { template: { $player  } , constructor: { utils: { append , setStyles  }  }  } = art;
        let $ads = null;
        let $video = null;
        let $control = null;
        let blobUrl = null;
        function skip() {
            pause();
            art.play();
            setStyles($ads, {
                display: "none"
            });
            art.emit("artplayerPluginAds:skip");
        }
        async function play() {
            setStyles($ads, {
                display: null
            });
            if (art.playing) art.pause();
            try {
                await $video.play();
            } catch (error) {
                $video.muted = true;
                $video.play();
            }
            art.emit("artplayerPluginAds:play");
        }
        function pause() {
            $video.pause();
            art.emit("artplayerPluginAds:pause");
        }
        function update() {
            art.emit("artplayerPluginAds:update", {
                currentTime: $video.currentTime,
                duration: $video.duration
            });
        }
        function createAds() {
            const $ads = append($player, "<div></div>");
            setStyles($ads, {
                position: "absolute",
                zIndex: "150",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "#000"
            });
            return $ads;
        }
        function createVideo($ads) {
            const $video = append($ads, `<video src="${blobUrl || option.url}" poster="${blobUrl ? "" : option.poster}" loop playsInline />`);
            setStyles($video, {
                width: "100%",
                height: "100%",
                objectFit: "contain"
            });
            art.proxy($video, "error", skip);
            art.proxy($video, "canplay", play);
            art.proxy($video, "timeupdate", update);
            art.proxy($video, "click", ()=>art.emit("artplayerPluginAds:click"));
            return $video;
        }
        function createControl($ads) {
            const $control = append($ads, `<div>5</div>`);
            setStyles($control, {
                position: "absolute",
                zIndex: 10,
                right: "0px",
                bottom: "50px",
                lineHeight: 1,
                padding: "5px 8px",
                border: "1px solid #fff",
                backgroundColor: "#000",
                borderRight: "none",
                fontSize: "15px",
                opacity: "0.5"
            });
            art.events.hover($control, ()=>{
                setStyles($control, {
                    opacity: "1"
                });
            }, ()=>{
                setStyles($control, {
                    opacity: "0.5"
                });
            });
            return $control;
        }
        function init() {
            if ($ads || !option.url) return;
            art.pause();
            $ads = createAds();
            $video = createVideo($ads);
            $control = createControl($ads);
            art.emit("artplayerPluginAds:mounted", {
                $ads,
                $video,
                $control
            });
            if (option.mounted) option.mounted.call(art.plugins.artplayerPluginAds, $ads, $video, $control);
        }
        art.on("ready", ()=>{
            art.once("play", init);
            art.once("video:timeupdate", init);
        });
        if (option.preload) (async function preload() {
            const blob = await (await fetch(option.url)).blob();
            blobUrl = URL.createObjectURL(blob);
            art.emit("artplayerPluginAds:preload", blobUrl);
        })();
        return {
            name: "artplayerPluginAds",
            skip,
            pause,
            play,
            get $ads () {
                return $ads;
            },
            get $video () {
                return $video;
            },
            get $control () {
                return $control;
            }
        };
    };
}
exports.default = artplayerPluginAds;
artplayerPluginAds.env = "development";
artplayerPluginAds.version = "2.0.0";
artplayerPluginAds.build = "2023-05-03 15:02:34";
if (typeof window !== "undefined") window["artplayerPluginAds"] = artplayerPluginAds;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5dUr6"}],"5dUr6":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["3H9sA"], "3H9sA", "parcelRequire4dc0")

//# sourceMappingURL=index.js.map
