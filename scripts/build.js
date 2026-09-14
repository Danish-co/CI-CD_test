/**
 * Tiny build script: copies src/ into dist/.
 * No bundler — just enough to practice a "build" step in CI/CD.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

function copyDir(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });

  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  }
}

// Start fresh each build so dist/ always matches src/
fs.rmSync(distDir, { recursive: true, force: true });
copyDir(srcDir, distDir);

console.log('Build complete: src/ copied to dist/');
