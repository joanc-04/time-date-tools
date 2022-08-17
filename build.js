const fs = require('fs');
const { build } = require('esbuild');

(async () => {
    const time = Date.now();
    await buildDir('./src');
    console.log(`Compilation loaded in ${Date.now() - time} ms.`);
})();

async function buildDir(path) {
    const files = fs.readdirSync(path);
    for (const file of files) {
        if (file.endsWith('.ts')) {
            build({
                entryPoints: [`${path}/${file}`],
                bundle: false,
                // sourcemap: 'inline',
                // minify: true,
                format: "cjs",
                platform: "node",
                target: ["node18.3.0"],
                outdir: `${path.replace('./src', './dist')}`,
            }).catch(() => process.exit(1));
        } else {
            if (!fs.existsSync(path.replace('./src', './dist') + `/${file}`)) fs.mkdirSync(path.replace('./src', './dist') + `/${file}`);
            await buildDir(path + `/${file}`);
        }
    }
}