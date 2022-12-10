const { SyncWaterfallHook } = require("tapable");

// 回调的返回值会成为下一个回调的第一个参数
const aHook = new SyncWaterfallHook(["name", "age"]);

aHook.tap("hook1", (name, age) => {
  console.log("hook1", name, age);
  return "hook1";
});

aHook.tap("hook2", (name, age) => {
  console.log("hook2", name, age);
});

aHook.tap("hook3", (name, age) => {
  console.log("hook3", name, age);
});

aHook.call("mojie", 28);
