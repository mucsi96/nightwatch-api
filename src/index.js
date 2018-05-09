const client = require('./client');

(async () => {
    try {
        await client();
    } catch (err) {
        console.log(err.stack);
    }
})();