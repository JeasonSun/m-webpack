const { SyncLoopHook } = require("tapable");

// 回调的返回值不是undefined，直接从头开始循环
const aHook = new SyncLoopHook(["name", "age"]);

let count1 = 0;
let count2 = 0;
let count3 = 0;
aHook.tap("hook1", (name, age) => {
  console.log("hook1", name, age);
  if (++count1 === 1) {
    count1 = 0;
    return;
  }
  return true;
});

aHook.tap("hook2", (name, age) => {
  console.log("hook2", name, age);
  if (++count2 === 2) {
    count2 = 0;
    return;
  }
  return true;
});

aHook.tap("hook3", (name, age) => {
  console.log("hook3", name, age);
  if (++count3 === 3) {
    count3 = 0;
    return;
  }
  return true;
});

aHook.call("mojie", 28);
