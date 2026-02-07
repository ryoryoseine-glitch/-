import Composer from "@/components/posts/Composer";
import { DEMO_MODE, getDemoProductOptions } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";

const ComposePage = async () => {
  const productOptions = DEMO_MODE
    ? getDemoProductOptions()
    : await prisma.product.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true }
      });
  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <Composer products={productOptions} />
    </div>
  );
};

export default ComposePage;
