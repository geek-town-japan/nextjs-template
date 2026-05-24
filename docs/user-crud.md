# ユーザーCRUD

ユーザー管理画面とAPIは、PostgreSQLの`users`テーブルに対してCRUDを行います。

## 画面

| ファイル | 役割 |
|---|---|
| `app/page.tsx` | ユーザー管理画面を表示 |
| `components/users/user-management.tsx` | 一覧、登録、編集、削除の画面制御 |
| `components/users/user-form.tsx` | 登録・更新フォーム |
| `components/users/user-api.ts` | API呼び出しとクライアント側の入力検証 |
| `components/users/user-store.ts` | 編集中ユーザーIDと通知状態 |

## API

| メソッド | パス | 説明 |
|---|---|---|
| `GET` | `/api/users` | ユーザー一覧取得 |
| `POST` | `/api/users` | ユーザー登録 |
| `GET` | `/api/users/:id` | ユーザー詳細取得 |
| `PATCH` | `/api/users/:id` | ユーザー更新 |
| `DELETE` | `/api/users/:id` | ユーザー削除 |

## 登録

```http
POST /api/users
Content-Type: application/json

{
  "name": "Taro Yamada",
  "email": "taro@example.com"
}
```

## 更新

```http
PATCH /api/users/1
Content-Type: application/json

{
  "name": "Taro Updated",
  "email": "taro.updated@example.com"
}
```

`PATCH`は部分更新に対応しています。

```http
PATCH /api/users/1
Content-Type: application/json

{
  "name": "Taro Updated"
}
```

## 悪意ある書き換えへの対策

登録と更新の入力はZodで検証します。  
API側では`.strict()`を使っているため、`id`、`createdAt`、`updatedAt`など許可していないフィールドを送ってもDB更新には使われません。

```json
{
  "name": "Attacker",
  "email": "attacker@example.com",
  "id": 999,
  "createdAt": "2000-01-01T00:00:00.000Z"
}
```

上記のような入力はバリデーションエラーになります。

## 主なレスポンス

| 状態 | 内容 |
|---|---|
| `200` | 取得・更新成功 |
| `201` | 登録成功 |
| `204` | 削除成功 |
| `400` | 入力値またはIDが不正 |
| `404` | 対象ユーザーが存在しない |
| `409` | メールアドレスが重複 |

