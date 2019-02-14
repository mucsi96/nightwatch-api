import nodeFetch from 'node-fetch';

function fail() {
  console.error('WebDriver is still running!');
  process.exitCode = 1;
}

(async () => {
  try {
    await nodeFetch('http://localhost:4444/status');
    fail();
  } catch (err) {
    if (err.code !== 'ECONNREFUSED') {
      fail();
    }
  }
})();
