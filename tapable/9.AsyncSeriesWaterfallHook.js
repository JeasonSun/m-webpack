const { AsyncSeriesWaterfallHook } = require("tapable");

const aHook = new AsyncSeriesWaterfallHook(["name", "age"]);

console.time("hook");
aHook.tapAsync("hook1", (name, age, callback) => {
  setTimeout(() => {
    console.log("hook1", name, age);
    callback(null, 'hook1');
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
    callback(null, 'hook3');
  }, 3000);
});

aHook.callAsync("mojie", 28, (err, data) => {
  console.log("end", err, data);
  console.timeEnd("hook");
});
