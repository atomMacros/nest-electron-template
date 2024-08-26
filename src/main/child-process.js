var internetAvailable = require("internet-available");
setImmediate(() => {
    internetAvailable({
        timeout: 5000,
        retries: 5
    }).then(() => {
        console.log("Internet available");
    }).catch(() => {
        console.log("No internet");
    });
});
