# Next.js Template

## 概要

このプロジェクトは、[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)で初期構築された[Next.js](https://nextjs.org)テンプレートです。

## フォルダ構成

```bash
.
├── app
│    └── ...
├── public
│    └── ...
├── docs
│    └── ... # その他ドキュメント
├── .vscode
│    └── ... # VSCodeの推奨拡張機能や設定
├── .github
│    └── ... # PRテンプレートなど
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── tsconfig.json
├── flake.nix
├── flake.lock
├── .envrc
└── .gitignore
```

## プロジェクト管理

- タスク管理: GitHub Projects/Issues
- 開発フロー: [GitHub Flow](https://docs.github.com/ja/get-started/using-github/github-flow)
- PRテンプレート・Issueテンプレートの整備

## ブランチ戦略

| ブランチ | 用途 |
|---|---|
| `develop` | 開発環境 |
| `staging` | ステージング環境（検証環境） |
| `main` | 本番環境 |


- ブランチ保護: `develop`/`staging`/`main`へのマージはPR必須

---

### ブランチの規則

ブランチの一貫性と明確さを保つために、以下の規則を採用

※xxxはIssueの番号を指す

| ブランチ | 説明 |
|---|---|
| feat/issue-xxx | 機能追加等 |
| fix/issue-xxx | バグ修正や機能改善等 |
| refactor/issue-xxx | リファクタリング等 |
| ci/issue-xxx | 環境構築に関わる追加や修正等 |
| chore/issue-xxx | その他 |


---

### コミットメッセージの規則

コミットメッセージの一貫性と明確さを保つために、[Semantic Commit Message](https://sparkbox.com/foundry/semantic_commit_messages)の規則を採用

:wrench: chore: （タスクファイルなどプロダクションに影響のない修正、実稼働のコードの変更は含めない）

    🔧 chore: デバッグ用のログを削除

:memo: docs: （ドキュメントの更新）

    📝 docs: API の使用方法をREADMEに追記

:sparkles: feat: （ユーザー向けの機能の追加や変更）

    ✨ feat: ユーザープロフィール画面の追加

:bug: fix: （ユーザー向けの不具合の修正）

    🐛 fix: ログイン時のエラーハンドリングを修正

:recycle: refactor: （リファクタリングを目的とした修正）

    ♻️ refactor: 変数名を明確にするためのリファクタリング

:art: style: （スタイルやセミコロンの欠落などの修正、実稼働のコードの変更は含めない）

    🎨 style: コードのインデントを修正

:microscope: test: （テストコードの追加や修正、実稼働のコードの変更は含めない）

    🔬 test: 新規登録機能のユニットテストを追加

:construction_worker: ci: （環境構築に関わる追加や修正）

    👷 ci: バージョン変更に伴うDockerfileの修正


## 技術スタック

外部ライブラリをまだ追加していない層は`-`とし、Next.js標準で担えるものは機能名を記載しています。

| 分類 | 技術 | バージョン / 備考 |
|------|------|-------------------|
| 言語 | TypeScript | 5.9.3 |
| UIライブラリ | React | 19.2.4 |
| UIライブラリ | React DOM | 19.2.4 |
| フレームワーク | Next.js | 16.2.4 |
| ルーティング | App Router | Next.js標準 |
| レンダリング | Server Components/Client Components | Next.js標準 |
| データ取得 | TanStack Query / `fetch` | ユーザーCRUDのクライアントキャッシュ |
| API/BFF | Route Handlers | Next.js標準 |
| メタデータ管理 | Metadata API | Next.js標準 |
| 画像最適化 | `next/image` | Next.js標準 |
| フォント最適化 | `next/font` | Next.js標準 |
| スタイリング | Tailwind CSS | 4.2.4 |
| CSS処理 | PostCSS(`@tailwindcss/postcss`) | 4.2.4 |
| UIコンポーネント | shadcn/ui方式のローカルコンポーネント | `components/ui` |
| Lint | ESLint+`eslint-config-next` | 9.39.4/16.2.4 |
| フォーム管理 | React controlled form | ユーザー登録・更新 |
| フォーム管理ライブラリ | - | 未導入 |
| バリデーション | Zod | 4.4.3 |
| ORM/DBクライアント | Prisma ORM / Prisma Client | 7.8.0 / PostgreSQL adapter |
| データベース | PostgreSQL | 17.9(Nix) |
| 認証 | - | 未導入 |
| 状態管理 | TanStack Query / Zustand | サーバーデータ / UI状態 |
| コンポーネント開発 | Storybook | 10.4.0 |
| コンポーネントテスト | Testing Library + Vitest | 導入済み |
| ユニットテスト | Vitest | 導入済み |
| 結合テスト | Vitest + Testing Library | 導入済み |
| E2Eテスト | Playwright | 1.59.1(Nix playwright-driverに合わせる) |
| スナップショットテスト | - | 未導入 |
| アクセシビリティテスト | - | 未導入 |
| ビジュアルリグレッションテスト(VRT) | - | 未導入 |
| カバレッジ計測 | - | 未導入 |
| テストデータ管理 | Prisma seed | `prisma/seed.ts` |
| CIテスト実行 | - | 未導入 |
| コードフォーマッタ | - | 未導入 |
| パッケージマネージャー | pnpm | 10.33.2(Nix) |
| 開発環境 | Nix Flakes | `nixpkgs-unstable` / PostgreSQL / Prisma engines |
| 実行環境 | Node.js | 25.9.0(Nix) |


## クイックスタート

1. [初期セットアップ](docs/setup.md)をします。

2. 以下のコマンドを実行して、パッケージをインストールします。

```bash
pnpm i
```

3. ローカル PostgreSQL を初期化し、migration と seed を適用します。

```bash
pnpm db:init
pnpm db:start
pnpm db:create
pnpm db:migrate
pnpm db:seed
```

4. 以下のコマンドを実行して、開発サーバーを起動します。

```bash
pnpm dev
```

5. 起動が完了したら、ブラウザで[`http://localhost:3000`](http://localhost:3000)にアクセスして動作を確認できます。

6. 開発サーバーは起動中のターミナルで`Ctrl+C`、PostgreSQLは次のコマンドで停止します。

```bash
pnpm db:stop
```

## ドキュメント

- [初期セットアップ](docs/setup.md) - 初期セットアップ
- [起動・停止手順](docs/runbook.md) - 開発サーバー、PostgreSQL、Storybook、Prisma Studio、テストの起動・停止
- [Nix](docs/nix.md) - Nixの概要とコマンド
- [Next.js](docs/next-js.md) - Next.jsの概要とコマンド
- [pnpm](docs/pnpm.md) - pnpmの概要とコマンド
- [PostgreSQL](docs/database.md) - DB起動、psql、テーブル確認
- [Prisma](docs/prisma.md) - migration、seed、Prisma Client
- [ユーザーCRUD](docs/user-crud.md) - API、画面、悪意ある書き換え対策
- [Tailwind CSS](docs/tailwind-css.md) - Tailwind v4とテーマ変数
- [shadcn/ui](docs/shadcn-ui.md) - UIコンポーネント構成
- [Storybook](docs/storybook.md) - コンポーネント開発
- [状態管理](docs/state-management.md) - TanStack QueryとZustand
- [バリデーション](docs/validation.md) - ZodスキーマとAPI検証
- [テスト](docs/testing.md) - 単体、コンポーネント、結合、E2E
