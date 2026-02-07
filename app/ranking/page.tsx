import ProductCard from "@/components/products/ProductCard";
import { DEMO_MODE, listDemoProducts } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";

const RankingPage = async () => {
  const products = DEMO_MODE
    ? listDemoProducts().sort((a, b) => b.avgRating - a.avgRating).slice(0, 10)
    : await prisma.product.findMany({
        orderBy: [{ avgRating: "desc" }, { reviewCount: "desc" }],
        take: 10
      });

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">ランキング</h2>
        <p className="text-sm text-ink-600">全期間のレビュー評価上位</p>
      </div>
      <div className="grid gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            description={product.description}
            avgRating={product.avgRating}
            reviewCount={product.reviewCount}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
