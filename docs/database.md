# PostgreSQL

このプロジェクトでは、ローカル開発用DBとしてNixで提供されるPostgreSQLを使います。  
データディレクトリはプロジェクトルートの`.postgres/`です。生成物なのでGit管理しません。

## 接続情報

```text
host: 127.0.0.1
port: 54321
user: postgres
password: postgres
database: nextjs_template
schema: public
```

アプリケーションの接続URL:

```text
postgresql://postgres:postgres@127.0.0.1:54321/nextjs_template?schema=public
```

## 初回作成

```bash
pnpm db:init
pnpm db:start
pnpm db:create
pnpm db:migrate
pnpm db:seed
```

`pnpm db:init`は`.postgres/`を作成します。すでに`.postgres/`がある場合は再実行しません。

## 日常的な起動と停止

起動:

```bash
pnpm db:start
```

停止:

```bash
pnpm db:stop
```

状態確認:

```bash
pg_ctl -D .postgres status
```

## psql

PostgreSQLの中身を直接見る場合は、次のコマンドで接続します。

```bash
psql "postgresql://postgres:postgres@127.0.0.1:54321/nextjs_template"
```

direnvを使っていない場合:

```bash
nix develop -c psql "postgresql://postgres:postgres@127.0.0.1:54321/nextjs_template"
```

psql内での確認例:

```sql
\conninfo
\dt
\d users
select id, name, email, "createdAt", "updatedAt" from users order by id;
\q
```

## テーブル

現在は`users`テーブルを作成しています。

| カラム | 型 | 説明 |
|---|---|---|
| `id` | `integer` | 主キー、自動採番 |
| `name` | `varchar(80)` | ユーザー名 |
| `email` | `varchar(255)` | メールアドレス、一意 |
| `createdAt` | `timestamp` | 作成日時 |
| `updatedAt` | `timestamp` | 更新日時 |

## よくあるエラー

`Connection refused`が出る場合はPostgreSQLが起動していません。

```bash
pnpm db:start
```

`database "nextjs_template" does not exist`が出る場合はDBが未作成です。

```bash
pnpm db:create
```

テーブルがない場合はmigrationを適用します。

```bash
pnpm db:migrate
```
