const http = require('http');
const { URL } = require('url');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }

  return a / b;
}

const operations = {
  '/add': add,
  '/subtract': subtract,
  '/multiply': multiply,
  '/divide': divide,
};

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(body));
}

function parseNumber(value, name) {
  if (value === undefined || value === '') {
    throw new Error(`Missing query parameter: ${name}`);
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`Invalid number for query parameter: ${name}`);
  }

  return number;
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  const url = new URL(req.url, 'http://localhost:9000');

  const operation = operations[url.pathname];

  if (req.method !== 'GET' || !operation) {
    sendJson(res, 404, {
      error: 'Not found. Try GET /add?a=5&b=3',
    });

    return;
  }

  try {
    const a = parseNumber(url.searchParams.get('a'), 'a');
    const b = parseNumber(url.searchParams.get('b'), 'b');

    const result = operation(a, b);

    sendJson(res, 200, {
      result,
      message: 'Deployed automatically by CI/CD!',
    });
    } catch (error) {
    sendJson(res, 400, {
      error: error.message,
    });
  }
});

server.listen(9000, '0.0.0.0', () => {
  console.log('API running on port 9000');
});