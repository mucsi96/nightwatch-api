import fetch from 'node-fetch';
import assert from 'assert';

function fail() {
  console.error('WebDriver is still running!');
  process.exitCode = 1;
}

(async () => {
  try {
    await fetch('http://localhost:4444/status');
    fail();
  } catch (err) {
    if (err.code !== 'ECONNREFUSED') {
      fail();
    }
  }
})();
