# Zodバリデーション

このプロジェクトでは、登録・更新の入力検証にZodを使います。  
クライアント側でもAPI側でも同じスキーマを使い、UIの入力ミスと悪意あるAPIリクエストの両方を検出します。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `lib/validations/user.ts` | ユーザー入力スキーマ |
| `components/users/user-form.tsx` | フォーム送信前の検証 |
| `components/users/user-api.ts` | API送信前の検証 |
| `app/api/users/route.ts` | 登録APIの検証 |
| `app/api/users/[id]/route.ts` | IDと更新入力の検証 |

## ユーザー名

```text
1文字以上
80文字以内
前後の空白をtrim
```

## メールアドレス

```text
メールアドレス形式
255文字以内
前後の空白をtrim
小文字に正規化
```

## ID

```text
整数
正の数
```

## strictによる防御

登録と更新のスキーマは`.strict()`を使います。  
これにより、許可していないフィールドを送ってもDBに渡りません。

拒否する例:

```json
{
  "name": "Bad User",
  "email": "bad@example.com",
  "id": 999,
  "updatedAt": "2000-01-01T00:00:00.000Z"
}
```

`id`や`updatedAt`はAPI側で受け付けないため、ユーザーが開発者ツールなどでリクエストを書き換えても任意のIDや日時には更新できません。

## APIエラー形式

バリデーションエラー時は`400`で返します。

```json
{
  "error": "Validation failed",
  "fieldErrors": {
    "email": ["有効なメールアドレスを入力してください。"]
  },
  "formErrors": []
}
```

