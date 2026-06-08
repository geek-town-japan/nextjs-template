# Next.js Template

## 概要

このプロジェクトは、[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)で初期構築された[Next.js](https://nextjs.org)テンプレートです。

## フォルダ構成

```bash
.
├── .github
│    ├── ISSUE_TEMPLATE
│    └── pull_request_template.md
├── .storybook
│    ├── main.ts
│    └── preview.tsx
├── .vscode
│    └── extensions.json
├── docs
│    └── ... # その他ドキュメント
├── public
│    └── ... # 静的ファイル
├── src
│    ├── app
│    ├── components
│    ├── features
│    └── lib
├── stories
│    └── ... # StorybookのサンプルStory
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── prettier.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── vitest.shims.d.ts
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

| ブランチ  | 用途                         |
| --------- | ---------------------------- |
| `develop` | 開発環境                     |
| `staging` | ステージング環境（検証環境） |
| `main`    | 本番環境                     |

- ブランチ保護: `develop`/`staging`/`main`へのマージはPR必須

---

### ブランチの規則

ブランチの一貫性と明確さを保つために、以下の規則を採用

※xxxはIssueの番号を指す

| ブランチ           | 説明                         |
| ------------------ | ---------------------------- |
| feat/issue-xxx     | 機能追加等                   |
| fix/issue-xxx      | バグ修正や機能改善等         |
| refactor/issue-xxx | リファクタリング等           |
| ci/issue-xxx       | 環境構築に関わる追加や修正等 |
| chore/issue-xxx    | その他                       |

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

外部ライブラリをまだ追加していない層は`-`とし、Next.js標準で担えるものは機能名を記載しています。バージョンは`package.json`/`pnpm-lock.yaml`に合わせています。

| 分類                                | 技術                                               | バージョン / 備考              |
| ----------------------------------- | -------------------------------------------------- | ------------------------------ |
| 言語                                | TypeScript                                         | 6.0.3                          |
| UIライブラリ                        | React                                              | 19.2.6                         |
| UIライブラリ                        | React DOM                                          | 19.2.6                         |
| フレームワーク                      | Next.js                                            | 16.2.6                         |
| ビルドツール                        | Vite                                               | 8.0.14 / Storybook/Vitest用途  |
| ルーティング                        | App Router                                         | Next.js標準                    |
| レンダリング                        | Server Components/Client Components                | Next.js標準                    |
| データ取得                          | `fetch` in Server Components                       | Next.js標準                    |
| API/BFF                             | Route Handlers                                     | Next.js標準                    |
| メタデータ管理                      | Metadata API                                       | Next.js標準                    |
| 画像最適化                          | `next/image`                                       | Next.js標準                    |
| フォント最適化                      | `next/font`                                        | Next.js標準                    |
| スタイリング                        | Tailwind CSS                                       | 4.3.0                          |
| CSS処理                             | PostCSS(`@tailwindcss/postcss`)                    | 4.3.0                          |
| UIコンポーネント                    | shadcn                                             | 4.7.0 / `radix-nova`           |
| Headless UI                         | Radix UI(`radix-ui`)                               | 1.4.3                          |
| テーマ管理                          | `next-themes`                                      | 0.4.6                          |
| アイコン                            | `lucide-react`                                     | 1.16.0                         |
| CSSアニメーション                   | `tw-animate-css`                                   | 1.4.0                          |
| classNameユーティリティ             | `class-variance-authority`/`clsx`/`tailwind-merge` | 0.7.1/2.1.1/3.6.0              |
| Lint                                | ESLint+`eslint-config-next`                        | 9.39.4/16.2.6                  |
| Lint補助                            | `eslint-config-prettier`                           | 10.1.8                         |
| Storybook Lint                      | `eslint-plugin-storybook`                          | 10.4.1                         |
| コードフォーマッタ                  | Prettier                                           | 3.8.3                          |
| Tailwind class整形                  | `prettier-plugin-tailwindcss`                      | 0.8.0                          |
| フォーム管理                        | Server Actions/HTML Form                           | Next.js/React標準              |
| フォーム管理ライブラリ              | -                                                  | 未導入                         |
| バリデーション                      | HTML標準バリデーションのみ                         | Zod等は未導入                  |
| ORM/DBクライアント                  | -                                                  | 未導入                         |
| 認証                                | -                                                  | 未導入                         |
| 状態管理                            | React標準                                          | 外部状態管理ライブラリは未導入 |
| Storybook                           | Storybook                                          | 10.4.1                         |
| Storybook framework                 | `@storybook/nextjs-vite`                           | 10.4.1                         |
| Storybook addon                     | Docs/a11y/Vitest/Chromatic                         | 10.4.1/10.4.1/10.4.1/5.2.1     |
| コンポーネントテスト                | Vitest+Storybook addon+Playwright                  | 設定のみ導入                   |
| ユニットテスト                      | -                                                  | 未導入                         |
| 結合テスト                          | -                                                  | 未導入                         |
| E2Eテスト                           | -                                                  | 未導入                         |
| スナップショットテスト              | -                                                  | 未導入                         |
| アクセシビリティテスト              | `@storybook/addon-a11y`                            | Storybook上で利用              |
| ビジュアルリグレッションテスト(VRT) | -                                                  | 未導入                         |
| カバレッジ計測                      | `@vitest/coverage-v8`                              | 4.1.7                          |
| テストデータ管理                    | -                                                  | 未導入                         |
| CIテスト実行                        | -                                                  | 未導入                         |
| パッケージマネージャー              | pnpm                                               | 10.33.2(Nix)                   |
| 開発環境                            | Nix Flakes                                         | `nixpkgs-unstable`             |
| 実行環境                            | Node.js                                            | 25.9.0(Nix)                    |

## コード品質

### Formatter

Prettierを導入しています。設定は`prettier.config.mjs`で管理します。

- ダブルクォーテーションを使用
- 不要なセミコロンは付けない
- 末尾カンマは付けない
- Tailwind CSSのclassNameを整列
- `cn`/`clsx`/`cva`内のTailwind CSSクラスも整列

### Lint

ESLintは`eslint.config.mjs`で管理します。

- `eslint-config-next`のCore Web Vitals/TypeScript設定を使用
- `eslint-plugin-storybook`の推奨設定を使用
- `eslint-config-prettier`でPrettierと衝突しやすいルールを無効化
- ダブルクォーテーション、セミコロンなし、末尾カンマなしを検査
- ファイル末尾は空行を1行だけに統一

## クイックスタート

1. [初期セットアップ](docs/setup.md)をします。

2. 以下のコマンドを実行して、パッケージをインストールします。

```bash
pnpm i
```

3. 以下のコマンドを実行して、開発サーバーを起動します。

```bash
pnpm dev
```

4. 起動が完了したら、ブラウザで[`http://localhost:3000`](http://localhost:3000)にアクセスして動作を確認できます。

## 主要コマンド

| コマンド               | 内容                     |
| ---------------------- | ------------------------ |
| `pnpm dev`             | 開発サーバーを起動       |
| `pnpm build`           | 本番ビルドを作成         |
| `pnpm start`           | 本番サーバーを起動       |
| `pnpm lint`            | ESLintを実行             |
| `pnpm format`          | Prettierで整形           |
| `pnpm format:check`    | Prettierの整形状態を確認 |
| `pnpm storybook`       | Storybookを起動          |
| `pnpm build-storybook` | Storybookをビルド        |

## ドキュメント

- [初期セットアップ](docs/setup.md) - 初期セットアップ
- [Nix](docs/nix.md) - Nixの概要とコマンド
- [Next.js](docs/next-js.md) - Next.jsの概要とコマンド
- [pnpm](docs/pnpm.md) - pnpmの概要とコマンド
- [shadcn/ui](docs/shadcn-ui.md) - shadcn/uiの概要とコマンド
