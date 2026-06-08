# shadcn/ui

> [!IMPORTANT]
> 公式サイト: https://ui.shadcn.com
> 公式ドキュメント: https://ui.shadcn.com/docs
> Components: https://ui.shadcn.com/docs/components
> CLI: https://ui.shadcn.com/docs/cli
> components.json: https://ui.shadcn.com/docs/components-json
> Theming: https://ui.shadcn.com/docs/theming

このプロジェクトでは、UIコンポーネントの管理に**shadcn/ui**を使用しています。  
shadcn/uiは、一般的なUIコンポーネントライブラリのように、パッケージからコンポーネントを直接importして使う仕組みではありません。  
CLIでコンポーネントのソースコードをプロジェクト内に追加し、必要に応じて編集して使用します。

## shadcn/uiを使う理由

shadcn/uiでは、追加したコンポーネントの実装をプロジェクト側で管理できます。  
そのため、デザインや挙動を変更したい場合に、外部ライブラリをラップし続ける必要がありません。

```text
コンポーネントのソースコードをプロジェクト内で管理できる
必要なコンポーネントだけを追加できる
Tailwind CSSでスタイルを調整できる
Radix UIを使ったアクセシブルなUIを構築しやすい
```

> [!NOTE]
> CLIで追加されたファイルは、自動生成後もプロジェクトのコードとして扱います。
> 必要に応じて直接編集し、Gitで管理してください。

## 主に使うファイル

このプロジェクトでは、shadcn/uiに関連して主に次のファイルを使用します。

```text
components.json
components/ui/
lib/utils.ts
app/globals.css
```

### components.json

`components.json`は、shadcn CLIがプロジェクト構成を認識するための設定ファイルです。  
CLIでコンポーネントを追加する場合に使用します。

このプロジェクトでは、主に次の内容を設定しています。

```text
style: radix-nova
baseColor: neutral
cssVariables: true
iconLibrary: lucide
ui alias: @/components/ui
utils alias: @/lib/utils
```

> [!WARNING]
> `style`、`baseColor`、`cssVariables`は、初期化後に安易に変更しないでください。
> 既に追加したコンポーネントやテーマとの不整合が発生する可能性があります。

### components/ui/

`components/ui/`には、shadcn CLIで追加したUIコンポーネントを配置します。  
たとえば、Buttonコンポーネントは次のファイルにあります。

```text
components/ui/button.tsx
```

利用する側では、次のようにimportします。

```tsx
import { Button } from "@/components/ui/button"
```

### lib/utils.ts

`lib/utils.ts`には、classNameを結合するための`cn`関数があります。  
shadcn/uiのコンポーネントでは、Tailwind CSSのクラスを組み合わせるために使用します。

```tsx
import { cn } from "@/lib/utils"
```

### app/globals.css

`app/globals.css`には、テーマ用のCSS変数やTailwind CSSの設定があります。  
ライトテーマとダークテーマの色、角丸、境界線などを共通管理します。

## よく使うコマンド

このプロジェクトでは、依存パッケージとして追加済みのshadcn CLIを使用します。  
プロジェクトで固定されたバージョンを使うため、`pnpm exec`経由で実行してください。

### プロジェクトの設定を確認する

```bash
pnpm exec shadcn info
```

### 追加できるコンポーネントを確認する

```bash
pnpm exec shadcn search @shadcn
```

名前で絞り込む場合は、次のようにします。

```bash
pnpm exec shadcn search @shadcn -q "button"
```

### コンポーネントを追加する

```bash
pnpm exec shadcn add card
```

複数のコンポーネントをまとめて追加することもできます。

```bash
pnpm exec shadcn add card input label
```

### ファイルを書き換えずに変更内容を確認する

```bash
pnpm exec shadcn add card --dry-run
```

### コンポーネントのドキュメントを確認する

```bash
pnpm exec shadcn docs button
```

## コンポーネントを追加するときの注意点

コンポーネントを追加すると、`components/ui/`だけでなく、依存パッケージや`app/globals.css`が更新される場合があります。  
追加後は、必ずGitの差分を確認してください。

```bash
git diff
```

> [!WARNING]
> 既存のコンポーネントを上書きする場合、プロジェクト固有の変更が失われる可能性があります。
> `--overwrite`を使用する前に、対象ファイルと差分を確認してください。
