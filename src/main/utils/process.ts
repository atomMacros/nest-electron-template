// import Store from 'electron-store';
// export const store = new Store();
// export const store = require('electron-store');

process.parentPort.on("message", (e) => {
  const port = e.ports[0];

  process.parentPort.postMessage({ data: "Ready" });
  console.log("I m coming,do you find me？");

  port.on("message", (e) => {
    console.info("why not print it？", e.data);
    setTimeout(() => {
      port.postMessage(`I receive your message:${e.data}`);
    }, 2000);
  });
  port.start();
  port.postMessage({ data: "Ready" });
});
