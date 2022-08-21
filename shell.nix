{ sources ? import ./nix/sources.nix
, pkgs ? import sources.nixpkgs {}
}:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.yarn
    pkgs.bazel_5
    pkgs.buf
    # This has to be installed via Nix because it's not available on npm.
    # Other protoc plugins can be installed through NPM.
    pkgs.protoc-gen-grpc-web
  ];
}
