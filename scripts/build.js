#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Set NODE_OPTIONS if not already set (for local builds)
if (!process.env.NODE_OPTIONS) {
  process.env.NODE_OPTIONS = '--openssl-legacy-provider';
  console.log('Setting NODE_OPTIONS for local build...');
}

console.log('Starting React build...');

// Run react-scripts build
const reactScripts = spawn('npx', ['react-scripts', 'build'], {
  stdio: 'inherit',
  env: process.env,
  shell: true
});

reactScripts.on('close', (code) => {
  if (code !== 0) {
    console.error(`react-scripts build failed with code ${code}`);
    process.exit(code);
  }
  
  console.log('Build completed successfully. Creating _redirects file...');
  
  // Create the _redirects file (only if netlify.toml redirects don't work)
  const buildDir = path.join(process.cwd(), 'build');
  const redirectsPath = path.join(buildDir, '_redirects');
  
  try {
    if (!fs.existsSync(redirectsPath)) {
      fs.writeFileSync(redirectsPath, '/* /  200\n');
      console.log('_redirects file created successfully.');
    } else {
      console.log('_redirects file already exists.');
    }
  } catch (error) {
    console.error('Error creating _redirects file:', error);
    process.exit(1);
  }
});

reactScripts.on('error', (error) => {
  console.error('Error running react-scripts build:', error);
  process.exit(1);
});