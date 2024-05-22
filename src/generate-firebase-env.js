// const fs = require('fs');
// const path = require('path');
//
// const apiKey = process.env.FIREBASE_ENV_VARIABLES;
//
// const envPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
//
// const content = `
// export const environment = {
//   production: true,
//   firebase: ${apiKey},
// };
// `;
//
// fs.writeFileSync(envPath, content);
const fs = require('fs');
const path = require('path');
const apiKey = process.env.FIREBASE_ENV_VARIABLES;


// Example environment configuration
const envConfig = {
  firebase: apiKey,
  production: false,
};

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

fs.writeFileSync(targetPath, `export const environment = ${JSON.stringify(envConfig)};`);
console.log(`Generated environment.ts at ${targetPath}`);
