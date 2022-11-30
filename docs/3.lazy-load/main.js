(() => {
  var modules = {};
  var cache = {};

  function require(moduleId) {
    var cachedModule = cache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (cache[moduleId] = {
      exports: {},
    });
    modules[moduleId](module, module.exports, require);
    return module.exports;
  }
  require.m = modules;

  require.d = (exports, definition) => {
    for (var key in definition) {
      if (require.o(definition, key) && !require.o(exports, key)) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        });
      }
    }
  };

  require.r = (exports) => {
    if (typeof Symbol !== undefined && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };

  require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  var installedChunks = {
    main: 0,
  };
  require.p = ""; // publicPath
  require.u = (chunkId) => {
    return "" + chunkId + ".js";
  };

  require.f = {};
  require.f.j = (chunkId, promises) => {
    debugger;
    var installedChunkData = require.o(installedChunks, chunkId)
      ? installedChunks[chunkId]
      : undefined;
    if (installedChunkData !== 0) {
      if (installedChunkData === undefined) {
        var promise = new Promise((resolve, reject) => {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(promise);
        // 在存储好promise之后，开始jsonp调用异步文件
        var url = require.p + require.u(chunkId);
        console.log("异步加载url", url);
        require.l(url);
      } else {
        // 已经存了 [resolve, reject]
      }
    }
  };

  // 使用jsonp加载异步资源
  require.l = (url) => {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
  };
  // 异步加载
  require.e = (chunkId) => {
    var promises = [];
    // 其实就是在调用require.f.j
    Object.keys(require.f).reduce((promises, key) => {
      require.f[key](chunkId, promises);
      return promises;
    }, promises);
    return Promise.all(promises);
  };

  function webpackJsonpCallback([chunkIds, moreModules]) {
    console.log("jsonP 的回调", chunkIds, moreModules);

    var resolves = chunkIds.map((chunkId) => {
      var resolve = installedChunks[chunkId][0];
      installedChunks[chunkId] = 0;
      return resolve;
    });
    // 合并modules
    Object.keys(moreModules).reduce((modules, moduleId) => {
      modules[moduleId] = moreModules[moduleId];
    }, modules);
    resolves.forEach((resolve) => {
      resolve();
    });
  }

  var chunkLoadingGlobal = (window["webpack5"] = window["webpack5"] || []);

  chunkLoadingGlobal.push = webpackJsonpCallback;

  require
    .e("lazy")
    .then(require.bind(require, "./src/lazy.js"))
    .then(({ default: data }) => {
      console.log(data);
    });
})();
