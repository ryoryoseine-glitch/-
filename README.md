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
