const fs = require('fs');
const path = require('path');

const apiKey = process.env.FIREBASE_ENV_VARIABLES;

const envPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

const content = `
export const environment = {
  production: true,
  firebase: ${apiKey},
};
`;

fs.writeFileSync(envPath, content);
