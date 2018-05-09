const client = require("./client");
const { log } = require("./logger");

(async () => {
  try {
    await client();
  } catch (err) {
    log(err.stack);
  }
})();
