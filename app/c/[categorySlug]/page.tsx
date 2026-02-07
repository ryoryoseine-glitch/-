import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";

const CategoryProductsPage = async ({ params }: { params: { categorySlug: string } }) => {
  const category = await prisma.category.findUnique({
    where: { slug: params.categorySlug },
    include: { products: true }
  });

  if (!category) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-600">カテゴリが見つかりません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">{category.name}</h2>
        <p className="text-sm text-ink-600">{category.products.length}件の商品</p>
      </div>
      <div className="grid gap-4">
        {category.products.map((product) => (
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

export default CategoryProductsPage;
