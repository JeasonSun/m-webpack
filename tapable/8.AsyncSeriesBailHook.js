const { AsyncSeriesBailHook } = require("tapable");

const aHook = new AsyncSeriesBailHook(["name", "age"]);

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
//     callback(null, 'AsyncParallelBailHook');
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hook1", name, age);
      resolve();
    }, 1000);
  });
});
aHook.tapPromise("hook2", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hook2", name, age);
      resolve('hook2 resolve');
    }, 2000);
  });
});
aHook.tapPromise("hook3", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hook3", name, age);
      resolve();
    }, 3000);
  });
});

aHook.promise("mojie", 28).then((data) => {
  console.log("end", data);
  console.timeEnd("hook");
});
