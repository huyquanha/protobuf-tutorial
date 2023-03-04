{ sources ? import ./nix/sources.nix
, pkgs ? import sources.nixpkgs {}
}:

pkgs.mkShell {
  buildInputs = [
    # Nix dependency management (including nixpkgs) with niv.
    pkgs.niv
    pkgs.nodejs
    pkgs.yarn
    pkgs.bazel_5
    pkgs.buf
    # This has to be installed via Nix because it's not available on npm.
    # Other protoc plugins can be installed through NPM.
    pkgs.protoc-gen-grpc-web
    # Includes buildifier, buildozer, and unused_deps
    pkgs.bazel-buildtools
    # Envoy is not yet supported on x86_64-darwin (MacOS), so we comment this out for now.
    # pkgs.envoy
  ];
}
