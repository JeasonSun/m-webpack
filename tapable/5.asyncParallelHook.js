const { AsyncParallelHook } = require("tapable");

const aHook = new AsyncParallelHook(["name", "age"]);

// console.time("hook");
// aHook.tapAsync("hook1", (name, age, callback) => {
//   setTimeout(() => {
//     console.log("hook1", name, age);
//     callback();
//   }, 1000);
// });
// aHook.tapAsync("hook2", (name, age, callback) => {
//   setTimeout(() => {
//     console.log("hook2", name, age);
//     callback();
//   }, 2000);
// });

// aHook.tapAsync("hook3", (name, age, callback) => {
//   setTimeout(() => {
//     console.log("hook3", name, age);
//     callback();
//   }, 3000);
// });

// aHook.callAsync("mojie", 28, () => {
//   console.log("end");
//   console.timeEnd("hook");
// });

console.time("hook");
aHook.tapPromise("hook1", (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("hook1", name, age);
      resolve();
    }, 1000);
  });
});
aHook.tapPromise("hook2", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("hook2", name, age);
      resolve();
    }, 2000);
  });
});

aHook.tapPromise("hook3", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("hook3", name, age);
      resolve();
    }, 3000);
  });
});

aHook.promise("mojie", 28).then(() => {
  console.log("end");
  console.timeEnd("hook");
});
