# 初期セットアップ

## 1. Nixのインストール

> [!IMPORTANT]
> 公式ドキュメント: https://nixos.org/download

#### 1-1. Linuxの場合はこちら

マルチユーザーインストール（推奨）

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --daemon
```

シングルユーザーインストール

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
```

---

#### 1-1. Macの場合はこちら

マルチユーザーインストール（推奨）

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install)
```

---

#### 1-1. Windows（WSL2）の場合はこちら

> [!TIP]
> WindowsはNixを直接サポートしていないため、WSL2（Windows Subsystem for Linux）経由で使用します

マルチユーザーインストール（systemdが有効になっているWSLが必要）

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --daemon
```

シングルユーザーインストール

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
```

#### 1-2. インストール完了後、一度ターミナルを再起動

#### 1-3. 正しくコマンドが動作することを確認

```bash
nix --version
```

## 2. direnvのインストール

> [!IMPORTANT]
> 公式ドキュメント: https://direnv.net

#### 2-1. direnvとは？

direnvはシェル用の拡張機能です。  
既存のシェルに、現在のディレクトリに応じて環境変数をロードおよびアンロードできる新機能を追加します。

#### direnv導入前

これらを毎回手動で設定するのは面倒です。

```bash
$ nix develop
$ pnpm install
$ export SOME_ENV=...
```

#### direnv導入後

`.envrc`にコマンドを書いておくと、プロジェクトのディレクトリに入ったタイミングで自動的に行われます。

```bash
$ cd nextjs-template
```

> [!TIP]
> `.envrc`はユーザーが許可した場合だけ実行されるため、勝手に任意のスクリプトが動かないようになっています。
> プロジェクトのルートディレクトリ直下で`direnv allow`を1度実行することで、以降は自動的に行われます。

---

#### Nixとdirenvの関係

```text
Nix
  → Node.jsやpnpmなど固定した開発環境を作る

direnv
  → その開発環境をディレクトリ移動時に自動で読み込む
```

`.envrc`には、次のように書かれています。  
「現在のディレクトリにあるflake.nixを使って、Nixの開発環境を読み込む」という意味です。

```bash
# .envrc
use flake .
```

#### 2-2. direnvのインストール

direnvはほとんどのディストリビューションに既に同梱されています。  
下記のコマンドを実行して、バージョンが確認できたらインストールは不要です。

```bash
direnv version
```

> [!TIP]
> もしインストール済みでない場合は、以下を参照下さい。
> https://direnv.net/docs/installation.html

#### 2-3. direnvのセットアップ

direnvが正しく動作するためには、シェルに組み込む必要があります。  
各シェルには独自の拡張メカニズムがあります。  
フックの設定が完了したら、direnvを有効にするためにシェルを再読み込み、または再起動してください。

#### Bashの場合

```bash
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
exec bash
```

#### Zshの場合

```zsh
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
exec zsh
```

> [!TIP]
> その他のシェルのセットアップについては、以下を参照ください。
> https://direnv.net/docs/hook.html

#### 2-4. プロジェクトへの適用

プロジェクトのルートディレクトリ直下で、以下のコマンドを実行してください。  
1度だけ実行することで、.envrcの実行が許可されます。  
以降はプロジェクトディレクトリに入るだけで、Nixの開発環境が自動的に有効になります。

```bash
direnv allow
```

#### 2-5. 正しく開発環境が整っていることを確認

開発環境が整えば以下のコマンドが正しく動作するはずです。

```bash
pnpm --version
node --version
```
