## SETUP

https://docs.bazel.build/versions/5.1.1/build-javascript.html

- Bazelisk is a wrapper for Bazel, it automatically picks a good version of Bazel given your current
working directory, downloads it from the official server and passes through command line arguments to the
real Bazel binary. You can call it just like you would call Bazel. Currently we haven't installed this yet.
- iBazel is for hot-reloading
```
yarn global add @bazel/ibazel
```

We need a couple plugins installed to generate stubs from .proto files as well
- `grpc-tools` (providing `protoc-gen-ts`) and `grpc_tools_node_protoc_ts` for the backend.
- `protoc-gen-grpc-web` for the frontend.

Normally, these would have to be installed globally, or manually put inside `usr/local/bin` like in the case of `protoc-gen-grpc-web` for `buf generate` to be able to pick it up from PATH, but thanks to Nix and yarn, we can avoid this (so we can achieve a completely reproducible evnironment)
  - We install `grpc-tools` and `grpc_tools_node_protoc_ts` as devDependencies, and we wrap `buf generate` inside a `protogen.sh`
  script and call that via a yarn command `protogen`. This ensures that any development dependencies binaries are available to us when running this command with yarn, and so they will be available to `buf generate` as well.
  - `protoc-gen-grpc-web` is not available as an npm package, but it's available as a Nix package, so that's how we are going
  to manage it. 

A nice thing with `buf generate` is it will automatically generate any directories on the path of the generated files
that doesn't already exist. So if you want to generate code inside `server2_client` directory, and that directory doesn't exist
yet, it will create that for you.

## Building Server
To build the server we need to compile all typescripts with `ts_project` like so
```
ts_project(
  name = "server",
  srcs = glob(["src/**/*.ts", "proto/**/*.ts"]),
  deps = [
    "@npm//protobufjs",
  ]
)
```
However, because `protobufjs` is not directly declared in `package.json` (https://github.com/bazelbuild/rules_nodejs/issues/2110), it has restricted visibility i.e other targets
cannot easily depends on it. So we need to explicitly install it


## Why 0.0.0.0 but not 127.0.0.1
See this [link](https://stackoverflow.com/questions/20778771/what-is-the-difference-between-0-0-0-0-127-0-0-1-and-localhost)

## Envoy Proxy
- Install: `brew install envoy`
- 

# Create the client directory for FE code.
- To create react app with yarn, run `yarn create react-app --template typescript client`.

## Understanding Bazel directory structure
- **outputRoot** directory is `/private/var/tmp` on MacOS
- Bazel user's build state is located beneath `outputRoot/_bazel_$USER`. This is called **outputUserRoot**.
- Beneath `outputUserRoot` there's an **outputBase** directory whose name is the MD5 hash of the path name of the workspace
directory i.e if the workspace is at `/Users/kevinha/learn/protobuf-tutorial` then `outputBase = /private/var/tmp/_bazel_kevinha/${md5Hash("/Users/kevinha/learn/protobuf-tutorial")}`
  - `${outputBase}/execroot/protobuf-tutorial`: This is called the **execRoot** of the project. This is what `bazel-protobuf-tutorial|dist/protobuf-tutorial` under our workspace directory symlinks to (the dist is if we use `build --symlink_prefix=dist/` in `.bazelrc`)
    - `${execRoot}/bazel-out`: This is what the `bazel-out|dist/out` directory under our project symlinks to. It's called the **outputPath** by Bazel and it houses all the actual output of the build.
      - Our actual build is platform-dependent, so it's nested under `${outputPath}/darwin-fastbuild/bin`. This is what `bazel-bin|dist/bin` symlinks to. If we have a `client` directory inside our project, it would be housed under `${outputPath}/darwin-fastbuild/bin/client`.
        - **execpath** denotes the path beneath the execroot, so if you have a file `protobuf-tutorial/client/chdir.js` then `$(execpath chdir.js)` would refer to `bazel-out/darwin-fastbuild/bin/client/chdir.js`.
        - **rootpath** is the same as `execpath`, but stripping the output prefixes => an `execpath` of `bazel-out/darwin-fastbuild/bin/client/chdir.js` would have `rootpath = client/chdir.js`. Rootpath denotes the runfiles path that a built binary can use to find its dependencies at runtime, so maybe that's why the `bazel-out...bin` bit is not necessary.

There's a weird error when running `bazel build //client:build`: `[Eslint] plugin "react" conflicted between...`. (somewhat similar to this https://github.com/facebook/create-react-app/issues/11825)
It seems like it's because we have 2 versions of `eslint-config-react-app`, and then they have 2 dependencies on `eslint-plugin-react`, and eslint can't choose which plugin it should use (even though these 2 plugins seem to have the same version). Interestingly, the issue does not occur when running `react-scripts build` directly without Bazel

=> At the end, it's just too painful to come up with a fix so I just followed this [link](https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba) to re-setup eslint entirely.
  - There are some issues with this setup, for example eslint-airbnb does not support typescript out of the box. We have to follow this [answer](https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions) (the 2nd one, not the accepted one) to install `eslint-config-airbnb-typescript`. That solves most of the issues, the rest can be fixed following the first Medium article. 

## Hot-reloading with CRA
- Currently, even if you run the client with `ibazel`, hot reloading doesn't seem to work. See [issue](https://github.com/bazelbuild/rules_nodejs/issues/2521)
- Commenting out `"ibazel_notify_changes"` under the tags section in `BUILD.bazel` seems to fix this.

## Hack to get Jest testing withiin Bazel to work
- The [issue](https://github.com/facebook/jest/pull/9351#issuecomment-811763535). TL;DR is within Bazel sandbox environment
which uses symlinks, Jest's file crawler, which doesn't support symlinks, is unable to find the test files to match the pattern => no tests were found.
- The [fix](https://github.com/facebook/jest/pull/11264) is now in to support symlinks, as well as an option to switching to NodeFileSystemAPI instead of shelling out
to `find`, which presumably is much faster.
- However, we are unable to utilise this fix, because CRA does not support configuring Jest's `haste.forceNodeFilesystemAPI/enableSymLinks` options through `package.json`.
- What we ended up doing is creating a patch file with `patch-package` (see instructions [here](https://dev.to/roshangm1/make-changes-to-nodemodule-files-with-patch-package-30h4)), where we just override these to `true`
```
// Hack because we can't enable these options through create-react-app.
  const forceNodeFilesystemAPIOverride = true;
  const enableSymlinksOverride = true;
```
  - Then we can run `yarn patch-package jest-haste-map` and that will automatically output a patch file under `/patches` directory, which we can then include in the `data` section in `yarn_install` rule in `WORKSPACE.bazel`.
  - We also need to add a `postinstall` command to `package.json` to run `patch-package` after installation, which my guess is it will look at the patch file and applying it.


## Quirk when using typescript project references and Bazel output directories
- [Typescript project reference](https://www.typescriptlang.org/docs/handbook/project-references.html)
  - When using this, you have to turn on `composite` and `declaration`.
- You need to ensure that the relative imports in your ouput `.js` file is correct.
- This presents a challenge, for example in `server/src/index.ts` we want to import a utility method defined in `utils/calculator/src/index.ts`, we would write the import like so:
```typescript
import { add } from '../../utils/calculator/src';
```
- Now when we compile `server`, as `utils/calculator` is a dependency it will be compiled together, and the output for each is written
to `bazel-out/darwin-fastbuild/bin/server` and `bazel-out/darwin-fastbuild/bin/utils/calculator`. But depending on how `rootDir` and `outDir` are set for these 2 `ts_prject` rule, it could cause issues:
  - If `server` `rootDir` and `outDir` are both not set, we would encountere this [issue](https://github.com/bazelbuild/rules_nodejs/issues/2281), because we have some `.d.ts` files in our server project. Basically, typescript compiler doesn't understand we are trying to ouput to a completely different output directory (under `/bazel-out/...`), so it thought that our `.d.ts` file is both an input and an output and it doesn't like that.
```
Error in _ts_project: rule 'main' has file 'src/proto/com/kevinh/server/v1/hello_service_grpc_pb.d.ts' as both an input and an output
```
  - If `server` `rootDir = "src"` and `outDir` not set, then it will output `index.js` right underneath `bazel-out/darwin-fastbuild/bin/server`. This will break the import statement, because we no longer have to go up 2 directories to reach `utils`, we just need to go up one now.

=> SOLUTION: We have to set `outDir` to something i.e `build`, and so the output (including `index.js`) would be written to `bazel-out/darwin-fastbuild/bin/server/build` and the import statement is still correct

To be consistent, we might do the same for `utils/calculator`, however the problem here is the import from `server` looks like this
```
import { add } from '../../utils/calculator/src';
```
Which means, you cannot specify a different `outDir` like `build` because then this import will fail, as it's looking for the `.d.ts` files inside `src` folder.

=> SOLUTION: for `utils/calculator`, we have to leave `root_dir` as `.`, so the whole `src` folder is copied over to bazel-out. This however, will only work if `/utils/calculator/src` doesn't have any `.d.ts` files already, because if it does, we would have the same
issue as above with `.d.ts` being both input and output.

This will be a problem, because later we would extract the proto generated files into a `-client` directory to be consumed by other microservices, something like `server-client/src/proto/...` and then let `server2` import it.

## Using Typescript Path Mapping to make imports look nicer

Unfortunately, this is challenging, because of this [issue](https://stackoverflow.com/questions/69669729/typescript-4-4-4-tsconfig-paths-not-resolving-as-expected). This is a problem with Typescript unabling to rewrite your module paths.

Let's give up for now.

# Using Nix for reproducible development environments
- Install Nix: https://nixos.org/download.html#nix-install-macos
- Pinning nixpkgs using this guide: https://nixos.org/guides/towards-reproducibility-pinning-nixpkgs.html#pinning-nixpkgs
  - This will always download nixpkgs from a tarball for some version. We choose `nixos-unstable` to get access to the latest versions of packages, for example `buf-v1.7.0` (the stable release only has `buf-v1.4.0`)
  - We also use `niv` to do dependency management for us when we want to bump dependencies.
```
# Initialise niv
nix-shell -p niv --run "niv init"

# Show which version niv is tracking
nix-shell -p niv --run "niv show"

# Change the tracking branch to the one you want
nix-shell -p niv --run "niv modify nixpkgs --branch nixos-unstable

# After changing the branch, update the dependencies
nix-shell -p niv --run "niv update"
```

- Follow this [guide](https://nixos.org/guides/declarative-and-reproducible-developer-environments.html#declarative-reproducible-envs) to install and configure `direnv`, so that whenever you enter the directory of your project, your changes in `shell.nix` is reloaded automatically without having to manually enter `nix-shell`.
