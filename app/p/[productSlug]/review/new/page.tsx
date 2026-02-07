import Composer from "@/components/posts/Composer";
import { DEMO_MODE, findDemoProductBySlug, getDemoProductOptions } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";

const NewReviewPage = async ({ params }: { params: { productSlug: string } }) => {
  const product = DEMO_MODE
    ? findDemoProductBySlug(params.productSlug)
    : await prisma.product.findUnique({
        where: { slug: params.productSlug },
        select: { id: true }
      });

  const productOptions = DEMO_MODE
    ? getDemoProductOptions()
    : await prisma.product.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true }
      });

  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <div className="border-b border-ink-200 px-4 py-4">
        <h2 className="text-sm font-semibold">レビュー投稿</h2>
      </div>
      <Composer products={productOptions} defaultProductId={product?.id} />
    </div>
  );
};

export default NewReviewPage;
