# Agro SNS (spec-first)

このリポジトリは、農業資材・農薬レビュー × SNS プラットフォームのMVP実装を提供します。
Prisma の統合モデルを土台に、Next.js App Router で X 風のタイムライン体験と商品レビュー体験を統合しています。

## Structure
- `prisma/schema.prisma`: コアとなるデータモデル
- `app/`: Next.js App Router の画面実装
- `components/`: UIコンポーネント
- `lib/`: Prisma / Clerk 連携とバリデーション

## Setup
```
cp .env.example .env
npm install
npm run dev
```

## Demo mode
開発用に `DEMO_MODE=true` を指定すると Clerk を無効化し、固定デモユーザーで動作します。
初回は Prisma の seed を実行して最低限のデータを投入してください。

```
npx prisma migrate dev
npx prisma db seed
```
