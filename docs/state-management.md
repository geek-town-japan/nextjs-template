# 状態管理

このプロジェクトでは、サーバーデータと画面内UI状態を分けて扱います。

## 使うライブラリ

| 目的 | ライブラリ |
|---|---|
| サーバーデータ取得・キャッシュ | TanStack Query |
| 画面内UI状態 | Zustand |

## TanStack Query

TanStack Queryは`/api/users`から取得したユーザー一覧のキャッシュ、再取得、mutation後のinvalidateに使います。

主なファイル:

```text
app/providers.tsx
components/users/user-management.tsx
components/users/user-api.ts
```

`app/providers.tsx`で`QueryClientProvider`を配置しています。  
登録、更新、削除が成功したら`invalidateQueries({ queryKey: ["users"] })`で一覧を再取得します。

## Zustand

ZustandはDBに保存しない画面内状態に使います。

主なファイル:

```text
components/users/user-store.ts
```

保持している状態:

| 状態 | 説明 |
|---|---|
| `editingUserId` | 編集中ユーザーID |
| `notice` | 完了・エラー通知 |

## 分担方針

ユーザー一覧のようにAPIから取得するデータはTanStack Queryに置きます。  
編集モードや通知のように画面だけで完結する状態はZustandに置きます。

