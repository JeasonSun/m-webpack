const { SyncBailHook } = require("tapable");

// 只要有一个回调返回 !== undefined 直接熔断，不往下走
const aHook = new SyncBailHook(["name", "age"]);

aHook.tap("hook1", (name, age) => {
  console.log("hook1", name, age);
});

aHook.tap("hook2", (name, age) => {
  console.log("hook2", name, age);
  return 'hook2'
});

aHook.tap("hook3", (name, age) => {
  console.log("hook3", name, age);
});

aHook.call("mojie", 28);
