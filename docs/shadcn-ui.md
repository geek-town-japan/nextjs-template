# shadcn/ui

shadcn/uiは、依存パッケージとして完成品コンポーネントを読むのではなく、プロジェクト内にUIコンポーネントを配置して使う方針です。  
このプロジェクトでは`components/ui/`に必要な部品を実装しています。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `components.json` | shadcn/uiのエイリアスとスタイル設定 |
| `components/ui/button.tsx` | ボタン |
| `components/ui/input.tsx` | 入力欄 |
| `components/ui/label.tsx` | ラベル |
| `components/ui/card.tsx` | カード |
| `components/ui/alert.tsx` | 通知 |
| `components/ui/badge.tsx` | バッジ |
| `components/ui/table.tsx` | テーブル |
| `lib/utils.ts` | `cn()`ユーティリティ |

## 追加済みの関連パッケージ

```text
@radix-ui/react-label
@radix-ui/react-slot
class-variance-authority
clsx
lucide-react
tailwind-merge
```

## 実装方針

UI部品は`components/ui/`に閉じ、ドメイン固有の表示は`components/users/`に置きます。  
アイコンは`lucide-react`を使います。

## コンポーネント追加

新しいUI部品を追加する場合は、既存の`components/ui/`の実装方針に合わせます。  
variantが必要な部品は`class-variance-authority`を使い、classの結合は`cn()`を使います。

