# Prisma

PrismaはPostgreSQLにアクセスするORMとして使います。  
このプロジェクトではPrisma 7系の設定ファイル`prisma.config.ts`を使い、Prisma Clientは`lib/generated/prisma/`に生成します。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `prisma.config.ts` | schema、migration、seed、接続URLの設定 |
| `prisma/schema.prisma` | DBスキーマ定義 |
| `prisma/migrations/` | migration SQL |
| `prisma/seed.ts` | 初期データ投入 |
| `lib/prisma.ts` | アプリケーション用Prisma Client |
| `lib/generated/prisma/` | 生成されたPrisma Client |

## 接続URL

`.env`または環境変数`DATABASE_URL`で指定します。未指定の場合は`prisma.config.ts`と`lib/prisma.ts`のローカルURLを使います。

```text
postgresql://postgres:postgres@127.0.0.1:54321/nextjs_template?schema=public
```

## Prisma Client生成

```bash
pnpm prisma:generate
```

`pnpm dev`と`pnpm build`は先頭で`prisma generate`を実行します。

## migration

スキーマを変更したら、次を実行します。

```bash
pnpm db:migrate
```

migrationファイルは`prisma/migrations/`に作成されます。

## seed

初期データを投入します。

```bash
pnpm db:seed
```

現在のseedは`users`テーブルにサンプルユーザーをupsertします。複数回実行しても同じメールアドレスのユーザーは重複しません。

## Prisma Studio

PostgreSQLを起動してから実行します。

```bash
pnpm db:studio
```

停止は起動中のターミナルで`Ctrl+C`です。

## NixOSでの注意点

Nix環境ではPrismaが使うschema engineを`flake.nix`の`PRISMA_SCHEMA_ENGINE_BINARY`で固定しています。  
direnvを使っていない場合は、Prismaコマンドを`nix develop -c`経由で実行してください。

```bash
nix develop -c pnpm db:migrate
```

