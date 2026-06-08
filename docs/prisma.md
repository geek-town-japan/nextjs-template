# Prisma

> [!IMPORTANT]
> 公式サイト: https://www.prisma.io
> 公式ドキュメント: https://www.prisma.io/docs
> Prisma ORM: https://www.prisma.io/docs/orm
> Prisma Migrate: https://www.prisma.io/docs/orm/prisma-migrate
> Prisma Studio: https://www.prisma.io/docs/studio
> Seeding: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

このプロジェクトでは、ORM/DBクライアントとして**Prisma ORM**を使用しています。
DBはPostgreSQLを前提にし、Prisma Clientは`generated/prisma`へ生成します。

## 主に使うファイル

Prisma関連のファイルは以下の役割で管理します。

| パス                   | 役割                                    |
| ---------------------- | --------------------------------------- |
| `prisma/schema.prisma` | DB schema、model、relation、indexを定義 |
| `prisma/migrations`    | Prisma Migrateが生成するmigration履歴   |
| `prisma.config.ts`     | Prisma CLIのschema/migration/env設定    |
| `generated/prisma`     | `prisma generate`で生成されるClient     |
| `src/lib/prisma.ts`    | アプリケーションから使うPrisma Client   |
| `.env`                 | `DATABASE_URL`などの環境変数            |

`.env`はプロジェクトルートに置きます。
`src/`配下に移動してPrisma/tsxコマンドを実行すると、ルートの`.env`が読まれないことがあります。
DB操作、seed、単発scriptはプロジェクトルートから実行してください。

## 初期導入

このプロジェクトではPrisma導入済みです。
新規に同じ構成を入れる場合は以下を使います。

```bash
pnpm add @prisma/client @prisma/adapter-pg dotenv
pnpm add -D prisma
pnpm exec prisma init --output ../generated/prisma
```

導入後は`prisma/schema.prisma`の`generator client`と`datasource db`を確認します。

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

PostgreSQLへの接続URLは`.env`の`DATABASE_URL`に設定します。

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=verify-full"
```

## NixOSでの注意

NixOSではPrisma CLIがNixOS用のprebuilt engineを取得できないことがあります。
そのため、`flake.nix`で`prisma-engines_7`を入れ、`PRISMA_SCHEMA_ENGINE_BINARY`を設定します。

```nix
packages = with pkgs; [
  nodejs_25
  pnpm
  openssl
  prisma-engines_7
];

shellHook = ''
  export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines_7}/bin/schema-engine"
'';
```

`prisma` CLI本体はnpm/pnpm側の`devDependencies`で管理し、Prisma engineはNix側から渡します。

## よく使うコマンド

このプロジェクトでは`package.json`にPrisma用scriptを用意しています。

| package script                 | Prisma CLI                                 | 内容                                  |
| ------------------------------ | ------------------------------------------ | ------------------------------------- |
| `pnpm prisma-generate`         | `pnpm exec prisma generate`                | Prisma Clientを生成                   |
| `pnpm prisma-validate`         | `pnpm exec prisma validate`                | Prisma schemaを検証                   |
| `pnpm prisma-format`           | `pnpm exec prisma format`                  | Prisma schemaを整形                   |
| `pnpm prisma-migrate-dev init` | `pnpm exec prisma migrate dev --name init` | 開発DBへmigrationを作成・適用         |
| `pnpm prisma-migrate-status`   | `pnpm exec prisma migrate status`          | migration適用状況を確認               |
| `pnpm prisma-migrate-deploy`   | `pnpm exec prisma migrate deploy`          | 本番/CI環境で未適用migrationを適用    |
| `pnpm prisma-migrate-reset`    | `pnpm exec prisma migrate reset`           | 開発DBをリセットしてmigrationを再適用 |
| `pnpm prisma-db-push`          | `pnpm exec prisma db push`                 | migrationを作らずschemaをDBへ反映     |
| `pnpm prisma-db-pull`          | `pnpm exec prisma db pull`                 | 既存DBから`schema.prisma`へ反映       |
| `pnpm prisma-db-seed`          | `pnpm exec prisma db seed`                 | seed scriptを実行                     |
| `pnpm prisma-studio`           | `pnpm exec prisma studio`                  | Prisma Studioを起動                   |

`pnpm prisma-migrate-dev`はscript側で`--name`まで指定しているため、migration名を引数として渡します。

```bash
pnpm prisma-migrate-dev add-user-profile
```

## 開発フロー

schemaを変更したら、必ずmigrationを作ってDBへ適用します。

```bash
pnpm exec prisma migrate dev --name <migration-name>
```

例:

```bash
pnpm exec prisma migrate dev --name add-user-profile
```

`migrate dev`は開発用です。
本番/CIではmigrationを新規作成せず、既存migrationだけを適用します。

```bash
pnpm exec prisma migrate deploy
```

schemaやmigrationの状態確認には以下を使います。

```bash
pnpm exec prisma validate
pnpm exec prisma migrate status
pnpm exec prisma generate
```

## テーブル操作

Prismaではテーブルやカラムを直接コマンドで作るのではなく、`schema.prisma`を変更してmigrationを作ります。

| やりたいこと             | 作業内容                                 |
| ------------------------ | ---------------------------------------- |
| テーブルを作る           | `schema.prisma`に`model`を追加           |
| テーブルを削除する       | `schema.prisma`から`model`を削除         |
| カラムを追加する         | `model`にfieldを追加                     |
| カラムを削除する         | `model`からfieldを削除                   |
| カラムの型を変更する     | fieldの型を変更                          |
| 必須/任意を変更する      | `String`/`String?`などを変更             |
| default値を変更する      | `@default(...)`を変更                    |
| unique制約を追加/削除    | `@unique`または`@@unique`を追加/削除     |
| indexを追加/削除         | `@@index`を追加/削除                     |
| relationを追加/削除      | relation fieldと外部キーfieldを追加/削除 |
| テーブル名をDB上で変える | `@@map`またはmigration SQLの調整を検討   |
| カラム名をDB上で変える   | `@map`またはmigration SQLの調整を検討    |

変更後はmigrationを作成します。

```bash
pnpm exec prisma migrate dev --name <change-name>
```

rename系はPrismaが「削除して新規作成」と判断することがあります。
データを残したい場合は、生成されたmigration SQLを確認し、必要に応じて`ALTER TABLE ... RENAME COLUMN ...`などに調整します。

## DB作成・削除

Prisma Migrateは基本的に「既に存在するDBの中のschema/table」を管理します。
PostgreSQLのdatabase自体の作成・削除は、利用しているDBサービス、Prisma Postgres、またはPostgreSQL CLIで行います。

ローカルのPrisma Postgresを使う場合:

```bash
pnpm exec prisma dev
```

既存DBからPrisma schemaを作る場合:

```bash
pnpm exec prisma db pull
pnpm exec prisma generate
```

開発DBを全削除してmigrationを最初から適用する場合:

```bash
pnpm exec prisma migrate reset
```

> [!WARNING]
> `migrate reset`はデータを削除します。
> 本番DBでは使わないでください。

## Seed

Prisma v7ではseedはmigration後に自動実行されません。
seedを入れる場合は、seed scriptを用意して明示的に実行します。

例:

```bash
pnpm add -D tsx
```

`package.json`にseed commandを追加します。

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

`prisma/seed.ts`を作成し、Prisma Clientで初期データを登録します。
実行は以下です。

```bash
pnpm exec prisma db seed
```

seedは開発DBや検証DBの初期データ投入に使います。
本番で実行する場合は、冪等性と重複登録対策を必ず入れます。

## Studio

DBの中身をGUIで確認する場合はPrisma Studioを使います。

```bash
pnpm exec prisma studio
```

またはpackage scriptを使います。

```bash
pnpm prisma-studio
```

起動後に表示される`http://localhost:<port>`をブラウザで開きます。

## 使い分け

| コマンド         | 使う場面                                    |
| ---------------- | ------------------------------------------- |
| `migrate dev`    | 開発中にschema変更をmigration化してDBへ適用 |
| `migrate deploy` | 本番/CIで既存migrationを適用                |
| `migrate reset`  | 開発DBを初期化してmigrationを再適用         |
| `db push`        | migration不要の試作・一時検証               |
| `db pull`        | 既存DBからPrisma schemaを生成/更新          |
| `db seed`        | seed dataを投入                             |
| `generate`       | Prisma Clientを再生成                       |
| `studio`         | GUIでDBを確認                               |

schema変更をチームで共有する場合は、`db push`ではなく`migrate dev`でmigrationを残します。
