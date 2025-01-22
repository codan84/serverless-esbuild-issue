# Serverless issues

When using the [build config](https://www.serverless.com/framework/docs/providers/aws/guide/building) some packages are bundled badly.  
An example here is the [pino](https://www.npmjs.com/package/pino) logger.
Bundled file will throw a runtime error:
```
{
    "timestamp": "2025-01-22T21:18:37.441Z",
    "level": "ERROR",
    "message": {
        "errorType": "Error",
        "errorMessage": "Dynamic require of \"node:os\" is not supported",
        "stackTrace": [
            "Error: Dynamic require of \"node:os\" is not supported",
            "    at file:///var/task/src/index.js:11:9",
            "    at node_modules/pino/pino.js (/node_modules/pino/pino.js:3:12)",
            "    at __require2 (file:///var/task/src/index.js:14:50)",
            "    at <anonymous> (/src/index.ts:1:22)",
            "    at ModuleJob.run (node:internal/modules/esm/module_job:268:25)",
            "    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)",
            "    at async _tryAwaitImport (file:///var/runtime/index.mjs:1008:16)",
            "    at async _tryRequire (file:///var/runtime/index.mjs:1057:37)",
            "    at async _loadUserApp (file:///var/runtime/index.mjs:1081:16)",
            "    at async UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1119:21)"
        ]
    }
}
```

## Deploy

1. Comment & uncomment appropriate sections in `serverless.yml` (as described there)
2. `npm ci`
3. `serverless deploy`

## Bundling with latest esbuild manually

1. Comment & uncomment appropriate sections in `serverless.yml` (as described there)
2. `npm ci`
3. `npm run package:manual`
4. Upload the zip to lambda manually via AWS console

It all works!

### Problem 2

Whilst we are on it, this repo helps replicate another serverless problem!  
According to [docs here](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml#package) I should be able to specify manually created artifact to deploy, thus skipping the default packaging/building/bundling behaviour.  
So why is Serverless not using the produced `artifacts/lambda.zip` and still does its own bundling?
