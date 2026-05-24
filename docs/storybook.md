# Storybook

StorybookはUIコンポーネントをアプリ本体から切り離して確認するために使います。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `.storybook/main.ts` | Storybook本体設定 |
| `.storybook/preview.ts` | グローバルCSS読み込み |
| `components/**/*.stories.tsx` | Storybookのストーリー |

## 起動

```bash
pnpm storybook
```

URL:

```text
http://localhost:6006
```

停止は起動中のターミナルで`Ctrl+C`です。

## 静的ビルド

```bash
pnpm storybook:build
```

出力先:

```text
storybook-static/
```

`storybook-static/`は生成物なのでGit管理しません。

## 追加済みストーリー

| ファイル | 対象 |
|---|---|
| `components/ui/button.stories.tsx` | Button |
| `components/users/user-form.stories.tsx` | UserForm |
| `components/users/user-management.stories.tsx` | UserManagementView |

## データを扱うコンポーネント

APIに接続するコンポーネントをStorybookで表示する場合は、API呼び出しを直接行うコンテナではなく、propsで状態を渡せるViewコンポーネントをストーリーにします。  
このプロジェクトでは`UserManagementView`をStorybook対象にして、ユーザー配列、読み込み状態、通知状態をpropsから渡しています。

