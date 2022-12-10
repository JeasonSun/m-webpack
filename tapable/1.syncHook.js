const { SyncHook } = require("tapable");

const aHook = new SyncHook(["name", "age"]);

aHook.tap("hook1", (name, age) => {
  console.log("hook1", name, age);
});

aHook.tap("hook2", (name, age) => {
  console.log("hook2", name, age);
});

aHook.tap("hook3", (name, age) => {
  console.log("hook3", name, age);
});

aHook.call("mojie", 28);
