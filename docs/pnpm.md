# pnpm

> [!IMPORTANT]
> 公式サイト: https://pnpm.io
> 公式ドキュメント: https://pnpm.io/motivation
> Installation: https://pnpm.io/installation
> pnpm install: https://pnpm.io/cli/install
> pnpm update: https://pnpm.io/cli/update
> pnpm outdated: https://pnpm.io/cli/outdated
> pnpm Settings: https://pnpm.io/settings
> pnpm approve-builds: https://pnpm.io/cli/approve-builds

このプロジェクトでは、Node.jsのパッケージマネージャーとして**pnpm**を使用しています。  
pnpmは、依存パッケージのインストール、更新、ロックファイル管理を行うためのツールです。

> [!TIP]
> このプロジェクトでは、pnpm自体のバージョンはNixで管理します。
> そのため、通常はpnpmをグローバルインストールしたり、手元の環境で個別にアップデートしたりする必要はありません。

## pnpmを使う理由

通常のNode.jsプロジェクトでは、依存パッケージの管理にnpm、Yarn、pnpmなどを使います。  
このプロジェクトでは、次の理由からpnpmを使用します。

```text
依存関係の解決結果をpnpm-lock.yamlに固定できる
node_modulesの構造が厳格で、暗黙的な依存に気づきやすい
インストールが高速
ディスク使用量を抑えやすい
workspace構成に対応している
```

特に重要なのは、`pnpm-lock.yaml`です。  
このファイルにより、別の開発者やCI環境でも同じ依存関係を再現しやすくなります。

## 主に使うファイル

このプロジェクトでは、pnpmに関連して主に次のファイルを使用します。

```text
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
```

### package.json

`package.json`は、プロジェクトの依存パッケージやスクリプトを管理するファイルです。  
たとえば、次のような内容を管理します。

```text
dependencies
devDependencies
scripts
packageManager
```

### pnpm-lock.yaml

`pnpm-lock.yaml`は、実際に解決された依存パッケージのバージョンを固定するファイルです。  
`package.json`では、次のようにバージョン範囲を書くことがあります。

```json
{
  "dependencies": {
    "react": "^19.0.0"
  }
}
```

この場合、`^19.0.0`に一致する範囲で新しいバージョンが入る可能性があります。  
`pnpm-lock.yaml`は、実際にインストールされた具体的なバージョンを記録します。

そのため、`pnpm-lock.yaml`は必ずGitで管理します。

### pnpm-workspace.yaml

`pnpm-workspace.yaml`は、pnpmのプロジェクト設定を管理するファイルです。  
workspace構成だけでなく、サプライチェーン対策用の設定もここに書きます。

## サプライチェーン対策

npmパッケージの世界では、依存パッケージが侵害されたり、悪意のあるバージョンが公開されたりする可能性があります。  
pnpmでは、そのリスクを下げるための設定を`pnpm-workspace.yaml`に書けます。

### 新しすぎるパッケージをすぐに入れない

```yaml
minimumReleaseAge: 10080
minimumReleaseAgeStrict: true
```

`minimumReleaseAge`は、公開されてから一定時間が経過していないパッケージをインストールしないための設定です。  
`10080`は分単位なので、7日を意味します。

これにより、公開直後に混入した悪意あるバージョンをすぐに取り込むリスクを下げられます。  
この設定は、直接依存だけでなく推移依存にも適用されます。

`minimumReleaseAgeStrict: true`を設定すると、条件を満たすバージョンがない場合に、pnpmがより厳格に失敗します。

緊急対応などで特定パッケージだけ例外にしたい場合は、次のようにします。

```yaml
minimumReleaseAge: 10080
minimumReleaseAgeStrict: true
minimumReleaseAgeExclude:
  - react
  - next
```

> [!WARNING]
> `minimumReleaseAgeExclude`は例外設定です。
> 基本的には空にしておき、必要な場合だけ理由を明確にして追加してください。

## よく使うコマンド

### 依存パッケージをインストールする

```bash
pnpm install
```

省略形も使えます。

```bash
pnpm i
```

### CIで依存パッケージをインストールする

CIでは、ロックファイルを更新せずにインストールします。

```bash
pnpm install --frozen-lockfile
```

> [!NOTE]
> CIでは、`package.json`と`pnpm-lock.yaml`に不整合がある場合、インストールを失敗させるのが安全です。
> CI上で勝手にロックファイルを更新しないようにします。

### 古いパッケージを確認する

```bash
pnpm outdated
```

`dependencies`だけ確認したい場合は、次のようにします。

```bash
pnpm outdated --prod
```

`devDependencies`だけ確認したい場合は、次のようにします。

```bash
pnpm outdated --dev
```

## パッケージのアップデート手順

### 古いパッケージを確認する

```bash
pnpm outdated
```

まず、更新可能なパッケージを確認します。  
いきなり全更新するのではなく、影響範囲を確認してから更新します。

### 現在のバージョン範囲内で更新する

```bash
pnpm update
```

このコマンドは、`package.json`に書かれているバージョン範囲を守って更新します。  
たとえば、`^1.2.3`の範囲内で更新可能なバージョンがあれば更新されます。

特定のパッケージだけ更新する場合は、次のようにします。

```bash
pnpm update next
```

スコープ単位で更新することもできます。

```bash
pnpm update "@types/*"
```

### メジャーバージョンも含めて更新する

メジャーバージョンを含めて最新に上げる場合は、次のコマンドを使います。

```bash
pnpm update --latest
```

特定のパッケージだけ最新にする場合は、次のようにします。

```bash
pnpm update next --latest
```

> [!WARNING]
> `--latest`は、`package.json`のバージョン範囲を超えて更新することがあります。
> 破壊的変更が含まれる可能性があるため、基本的には個別に確認しながら実行してください。

> [!WARNING]
> Nixでpnpmを管理している場合、`pnpm self-update`や`npm install -g pnpm`は使わないでください。
> プロジェクトで定義したpnpmのバージョンと、ローカルに入れたpnpmのバージョンがずれる原因になります。

## このプロジェクトの主要スクリプト

| コマンド | 説明 |
|---|---|
| `pnpm dev` | Prisma Client生成後にNext.js開発サーバーを起動 |
| `pnpm build` | Prisma Client生成後にNext.js本番ビルド |
| `pnpm start` | 本番ビルド済みアプリを起動 |
| `pnpm lint` | ESLintを実行 |
| `pnpm test` | Vitestの単体・コンポーネント・結合テストを実行 |
| `pnpm test:e2e` | Playwright E2Eを実行 |
| `pnpm storybook` | Storybookを起動 |
| `pnpm storybook:build` | Storybookを静的ビルド |
| `pnpm db:start` | ローカルPostgreSQLを起動 |
| `pnpm db:stop` | ローカルPostgreSQLを停止 |
| `pnpm db:migrate` | Prisma migrationを実行 |
| `pnpm db:seed` | seedを投入 |
