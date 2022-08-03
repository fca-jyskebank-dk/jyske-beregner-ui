const fs = require('fs-extra');
const path = require('path');
const concat = require('concat');
const mergeFiles = require('merge-files');

concatenate = async () => {
  const app = process.argv[2];
  const appSrcPath = path.join('./apps', app, '/src');
  const srcPath = path.join('./dist/apps/', app);
  const destPath = path.join('./dist/apps/deploy/', app);

  const srcAssetsPath = path.join(srcPath, 'assets/');
  const destAssetsPath = path.join(destPath, 'assets/');

  const srcAssetsIconsPath = path.join(srcPath, 'assets/kirby/icons/svg/');
  const destAssetsIconsPath = path.join(destPath, 'assets/kirby/icons/svg/');

  const tempBuild = srcPath + '/temp.js';

  async function merge() {
    const filesToMerge = fs
      .readdirSync(srcPath)
      .filter((f) => /([0-9]).js$/.test(f))
      .map((filename) => path.join(srcPath, filename));

    filesToMerge.push(tempBuild);

    await mergeFiles(filesToMerge, tempBuild);
  }

  await merge();

  const files = [
    path.join(srcPath, '/runtime.js'),
    path.join(srcPath, '/polyfills.js'),
    path.join(srcPath, '/temp.js'),
    path.join(srcPath, '/common.js'),
    path.join(srcPath, '/main.js'),
  ];

  await fs.rmdir(destPath, { recursive: true });

  await fs.ensureDir(destPath);
  await fs.ensureDir(destAssetsPath);
  await concat(files, path.join(destPath, '/' + app + '.js'));

  fs.copyFile(
    path.join(srcPath, '/favicon.ico'),
    path.join(destPath, '/favicon.ico'),
    () => {}
  );

  fs.copyFile(
    path.join(appSrcPath, '/index_build.html'),
    path.join(destPath, '/index.html'),
    () => {}
  );

  fs.copyFile(
    path.join(srcPath, '/styles.css'),
    path.join(destPath, '/' + app + '.css'),
    () => {}
  );

  fs.copyFile(
    path.join(__dirname, '/web.config'),
    path.join(destPath, '/web.config'),
    () => {}
  );

  // Assets
  if (fs.existsSync(path.join(srcAssetsPath, 'icons'))) {
    fs.copySync(
      path.join(srcAssetsPath, 'icons'),
      path.join(destAssetsPath, 'icons')
    );
  }

  if (fs.existsSync(path.join(srcAssetsPath, 'images'))) {
    fs.copySync(
      path.join(srcAssetsPath, 'images'),
      path.join(destAssetsPath, 'images')
    );
  }

  fs.copySync(
    path.join(srcAssetsPath, 'mocks'),
    path.join(destAssetsPath, 'mocks')
  );

  const filterFuncSvg = (srcAssetsIconsPath) => {
    const stats = fs.statSync(srcAssetsIconsPath);

    return (
      !stats.isFile() ||
      srcAssetsIconsPath.includes('arrow-down.svg') ||
      srcAssetsIconsPath.includes('arrow-up.svg') ||
      srcAssetsIconsPath.includes('checkmark-selected.svg') ||
      srcAssetsIconsPath.includes('close.svg') ||
      srcAssetsIconsPath.includes('home.svg') ||
      srcAssetsIconsPath.includes('verify.svg')
    );
  };

  fs.copySync(srcAssetsIconsPath, destAssetsIconsPath, {
    filter: filterFuncSvg,
  });

  const filterFuncFonts = (srcPath) => {
    const stats = fs.statSync(srcPath);

    return (
      !stats.isFile() ||
      srcPath.includes('roboto-all') ||
      srcPath.includes('roboto-latin-300') ||
      srcPath.includes('roboto-latin-400') ||
      srcPath.includes('roboto-latin-700') ||
      srcPath.includes('roboto-latin-900')
    );
  };

  fs.copySync(srcPath, destPath, { filter: filterFuncFonts });

  // Hack
  fs.removeSync(destPath + '/kirby');
  fs.removeSync(destPath + '/svg');
};

concatenate();
