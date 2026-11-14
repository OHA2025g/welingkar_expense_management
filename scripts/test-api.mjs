import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
await build({entryPoints:['tests/api.test.ts'],bundle:true,platform:'node',format:'esm',outfile:'.sites-runtime/api.test.mjs',alias:{'cloudflare:workers':'./tests/runtime.ts'},define:{'import.meta.env.DEV':'true'},external:['node:sqlite']});
const result=spawnSync(process.execPath,['.sites-runtime/api.test.mjs'],{stdio:'inherit'});process.exit(result.status??1);
