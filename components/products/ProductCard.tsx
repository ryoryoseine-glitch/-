import Link from "next/link";

export type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  avgRating: number;
  reviewCount: number;
};

const ProductCard = ({ name, slug, description, avgRating, reviewCount }: ProductCardProps) => {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold">{name}</p>
      <p className="mt-1 text-xs text-ink-500">{description ?? "説明は未登録です"}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-ink-600">
        <span>評価 {avgRating.toFixed(1)}</span>
        <span>レビュー {reviewCount}</span>
      </div>
      <Link className="mt-3 inline-flex text-xs text-ink-900" href={`/p/${slug}`}>
        詳細を見る →
      </Link>
    </div>
  );
};

export default ProductCard;
