# Tailwind CSS

このプロジェクトではTailwind CSS v4を使います。  
スタイルの入口は`app/globals.css`です。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `app/globals.css` | Tailwindの読み込み、テーマ変数、グローバルスタイル |
| `postcss.config.mjs` | Tailwind v4用PostCSSプラグイン |
| `components/ui/*.tsx` | Tailwind classで構成したUI部品 |
| `lib/utils.ts` | `cn()`でclassNameを安全に結合 |

## 読み込み

`app/globals.css`でTailwindを読み込みます。

```css
@import "tailwindcss";
```

## テーマ変数

shadcn/ui互換の色をCSS変数で定義し、Tailwindの`@theme inline`に渡しています。

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-border: var(--border);
}
```

## classNameの結合

条件付きclassやvariantの結合には`lib/utils.ts`の`cn()`を使います。

```tsx
import { cn } from "@/lib/utils";

<div className={cn("grid gap-4", isActive && "border-primary")} />
```

`cn()`は`clsx`と`tailwind-merge`を使うため、矛盾したTailwind classの上書きを整理できます。

