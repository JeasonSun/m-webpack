const { AsyncParallelBailHook } = require("tapable");

const aHook = new AsyncParallelBailHook(["name", "age"]);

console.time("hook");
aHook.tapAsync("hook1", (name, age, callback) => {
  setTimeout(() => {
    console.log("hook1", name, age);
    callback();
  }, 1000);
});
aHook.tapAsync("hook2", (name, age, callback) => {
  setTimeout(() => {
    console.log("hook2", name, age);
    callback(null, 'AsyncParallelBailHook');
  }, 2000);
});

aHook.tapAsync("hook3", (name, age, callback) => {
  setTimeout(() => {
    console.log("hook3", name, age);
    callback();
  }, 3000);
});

aHook.callAsync("mojie", 28, () => {
  console.log("end");
  console.timeEnd("hook");
});
