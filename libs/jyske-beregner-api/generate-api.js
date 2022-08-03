/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs-extra');
const process = require('process');
const { execSync } = require('child_process');

const run = () => {
  console.log('Slet mapper og filer der autogeneres af Open API Generator CLI');

  try {
    const files = fs.readdirSync(__dirname + '/src/lib');

    files.forEach((file) => {
      const filename = __dirname + '/src/lib/' + file;
      const checkIfFile = fs.statSync(filename);

      if (
        checkIfFile.isFile() &&
        file !== 'jyske-beregner-api.module.ts'
      ) {
        fs.unlinkSync(filename);
      } else if (
        !checkIfFile.isFile() &&
        file !== 'proxies' &&
        file !== 'services'
      ) {
        fs.removeSync(filename);
      }
    });

    console.log('Generer Open API client');

    process.chdir(__dirname + '/openapi');
    execSync('npx openapi-generator-cli generate');
    // TODO FCA
    // Hold øje med ny version af openapi-generator som fixer anyType-problemet.
    // Følgende er et hack.
    // dan any-type.ts i models
  } catch (e) {
    console.log(e);
  }
};

run();
