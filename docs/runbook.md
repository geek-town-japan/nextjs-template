# 起動・停止手順

このページは、ローカル開発で使うプロセスの起動、停止、確認コマンドをまとめた運用手順です。  
direnvを有効にしていない場合は、各コマンドの前に`nix develop -c`を付けて実行してください。

## 初回セットアップ

依存パッケージをインストールします。

```bash
pnpm i
```

PostgreSQLのデータディレクトリを作り、DBを起動して、DB作成、migration、seedを順に実行します。

```bash
pnpm db:init
pnpm db:start
pnpm db:create
pnpm db:migrate
pnpm db:seed
```

## PostgreSQL

### 起動

```bash
pnpm db:start
```

### 停止

```bash
pnpm db:stop
```

### 起動状態の確認

```bash
pg_ctl -D .postgres status
```

direnvを使っていない場合:

```bash
nix develop -c pg_ctl -D .postgres status
```

### ログ確認

```bash
tail -f .postgres/server.log
```

## psqlでDBを見る

PostgreSQLを起動した状態で、次のコマンドを実行します。

```bash
psql "postgresql://postgres:postgres@127.0.0.1:54321/nextjs_template"
```

direnvを使っていない場合:

```bash
nix develop -c psql "postgresql://postgres:postgres@127.0.0.1:54321/nextjs_template"
```

psql内でよく使う確認コマンド:

```sql
\conninfo
\dt
\d users
select id, name, email, "createdAt", "updatedAt" from users order by id;
\q
```

## Next.js開発サーバー

### 起動

```bash
pnpm dev
```

ブラウザで開くURL:

```text
http://localhost:3000
```

### 停止

起動しているターミナルで`Ctrl+C`を押します。

## Storybook

### 起動

```bash
pnpm storybook
```

ブラウザで開くURL:

```text
http://localhost:6006
```

### 停止

起動しているターミナルで`Ctrl+C`を押します。

### 静的ビルド

```bash
pnpm storybook:build
```

出力先は`storybook-static/`です。このディレクトリは生成物なのでGit管理しません。

## Prisma Studio

### 起動

PostgreSQLを起動した状態で実行します。

```bash
pnpm db:studio
```

表示されたURLをブラウザで開きます。

### 停止

起動しているターミナルで`Ctrl+C`を押します。

## 本番ビルドのローカル確認

### ビルド

```bash
pnpm build
```

### 起動

```bash
pnpm start
```

ブラウザで開くURL:

```text
http://localhost:3000
```

### 停止

起動しているターミナルで`Ctrl+C`を押します。

## テスト

### 単体・コンポーネント・結合テスト

```bash
pnpm test
```

### E2Eテスト

PostgreSQLを起動し、migrationが適用された状態で実行します。

```bash
pnpm test:e2e
```

### まとめて実行

```bash
pnpm test:all
```
