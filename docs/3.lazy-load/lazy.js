(window["webpack5"] = window["webpack5"] || []).push([
  ["lazy"],
  {
    "./src/lazy.js": (module, exports, require) => {
      require.r(exports);
      require.d(exports, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = "LAZY_CHUNK";
    },
  },
]);
