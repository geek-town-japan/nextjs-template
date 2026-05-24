# Next.js

> [!IMPORTANT]
> 公式サイト: https://nextjs.org
> 公式ドキュメント: https://nextjs.org/docs
> Next.jsを学ぶ: https://nextjs.org/learn
> Next.js Deploying: https://nextjs.org/docs/app/getting-started/deploying

## フォント最適化

このプロジェクトは、[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)を使用して、Vercelの新しいフォントファミリーである[Geist](https://vercel.com/font)を自動的に最適化して読み込みます。 

## アップデート手順

pnpmでアップデートを行います

## 開発サーバー

起動:

```bash
pnpm dev
```

URL:

```text
http://localhost:3000
```

停止は起動中のターミナルで`Ctrl+C`です。

## 本番ビルド

```bash
pnpm build
pnpm start
```

`pnpm build`では先頭で`prisma generate`を実行し、Prisma Clientを生成してからNext.jsをビルドします。
