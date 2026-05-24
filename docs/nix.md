# Nix

> [!IMPORTANT]
> 公式ドキュメント: https://nix.dev/manual/nix/latest
> NixOS Wiki: https://wiki.nixos.org/wiki/NixOS_Wiki
> Official NixOS Wiki Flakes: https://wiki.nixos.org/wiki/Flakes/ja
> nix flake: https://nix.dev/manual/nix/latest/command-ref/new-cli/nix3-flake.html
> Nix Packages Search: https://search.nixos.org/packages?channel=unstable

このプロジェクトでは、開発環境の再現性を高めるために **Nix Flakes**を使用しています。  
Nixを使うことで、プロジェクトで使用するNode.js、pnpm、その他の開発用CLIツールをプロジェクト単位で定義できます。  
これにより、開発者ごとにNode.jsやpnpmのバージョンがずれてしまう問題を減らせます。

## Nixを使う理由

通常、開発環境は各開発者のローカル環境に依存します。  
たとえば、次のような差分が発生することがあります。

```text
AさんのNode.jsは v22
BさんのNode.jsは v24
CI環境では別バージョン
```

このような状態だと、ある人の環境では動くのに、別の人の環境では動かないことがあります。  
Nixを使うと、プロジェクトに必要なツールを`flake.nix`に定義できます。

```text
Node.js
pnpm
その他の開発用CLI
```

その結果、チームメンバーやCI環境で、同じような開発環境を再現しやすくなります。

## Nix Flakesとは

Nix Flakesは、Nixの設定をプロジェクト単位で管理する仕組みです。  
このプロジェクトでは、主に次の2つのファイルを使用します。

```text
flake.nix
flake.lock
```

## このプロジェクトでNixが提供するもの

`flake.nix`では、開発に必要なCLIと実行時依存をまとめています。

```text
Node.js
pnpm
OpenSSL
PostgreSQL
Prisma engines
Playwright driver
```

PrismaとPlaywrightはNixOS上で汎用Linux向けバイナリがそのまま動かないことがあるため、`shellHook`で次の環境変数を設定しています。

```bash
PRISMA_SCHEMA_ENGINE_BINARY
PLAYWRIGHT_BROWSERS_PATH
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD
PRISMA_HIDE_UPDATE_MESSAGE
CHECKPOINT_DISABLE
```

これにより、`pnpm db:migrate`や`pnpm test:e2e`をNix環境内で安定して実行できます。

### flake.nix

`flake.nix` は、開発環境の定義ファイルです。  
このプロジェクトで使用するNode.jsやpnpmなどの開発ツールを定義します。  
たとえば、次のような内容を管理します。

```text
どのnixpkgsを使うか
どのNode.jsを使うか
どのpnpmを使うか
devShellに何を入れるか
```

### flake.lock

`flake.lock`は、依存関係のバージョンを固定するためのファイルです。  
`flake.nix`では`nixpkgs-unstable`のように大まかな参照を書くことがありますが、そのままだと参照先が日々変わります。  
そこで、実際に使用する具体的なリビジョンを`flake.lock`に固定します。  
これにより、別の開発者やCI環境でも同じNix環境を再現しやすくなります。

## よく使うコマンド

### 開発環境に入る

direnvを使っていない場合は、次のコマンドでNixの開発環境に入れます。

```bash
nix develop
```

> [!TIP]
> ただし、このプロジェクトではdirenvを使っているため、通常は手動で`nix develop`を実行する必要はありません。
> プロジェクトディレクトリに入るだけで、direnvが自動的にNix環境を読み込みます。

```bash
cd nextjs-template
```

### Flakeの依存関係を更新する

Nix Flakeの依存関係を更新するには、次のコマンドを実行します。

```bash
nix flake update
```

> [!NOTE]
> このコマンドは、`flake.lock`に固定されている依存関係を更新します。
> たとえば、`nixpkgs-unstable`を使用している場合、より新しいnixpkgsのリビジョンに更新されます。
> 更新後は、`flake.lock`に差分が出ます。
