# テスト

このプロジェクトでは、Vitest、Testing Library、Playwrightを使ってテストを分けています。

## テスト種別

| 種別 | コマンド | 対象 |
|---|---|---|
| 単体テスト | `pnpm test:unit` | Zodスキーマなど |
| コンポーネントテスト | `pnpm test:component` | Reactコンポーネント |
| 結合テスト | `pnpm test:integration` | TanStack Query、Zustand、UIの連携 |
| E2Eテスト | `pnpm test:e2e` | ブラウザ上のCRUDフロー |
| Vitest一式 | `pnpm test` | unit/component/integration |
| 全体 | `pnpm test:all` | lint、Vitest、E2E |

## Vitest

主なファイル:

```text
vitest.config.ts
tests/setup.ts
tests/unit/user-validation.test.ts
tests/component/user-form.test.tsx
tests/integration/user-management.integration.test.tsx
```

Vitestは`jsdom`環境で実行します。E2EはPlaywrightで実行するため、`tests/e2e/**`はVitest対象から除外しています。

## Testing Library

ReactコンポーネントのテストはTesting Libraryで行います。  
できるだけ実際のユーザー操作に近い形で、ラベル、ボタン名、表示テキストを使って検証します。

## Playwright

主なファイル:

```text
playwright.config.ts
tests/e2e/user-crud.spec.ts
```

E2EはNext.js開発サーバーを自動起動し、`http://localhost:3000`にアクセスします。  
PostgreSQLは事前に起動し、migrationを適用しておきます。

```bash
pnpm db:start
pnpm db:migrate
pnpm test:e2e
```

## NixOSでのPlaywright

NixOSではnpmがダウンロードする汎用Linux向けブラウザをそのまま実行できない場合があります。  
このプロジェクトでは`flake.nix`で`playwright-driver`を追加し、`PLAYWRIGHT_BROWSERS_PATH`をNixのブラウザに向けています。

そのため、Playwrightの実行もNix環境内で行います。

```bash
nix develop -c pnpm test:e2e
```

