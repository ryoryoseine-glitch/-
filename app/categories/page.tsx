import Link from "next/link";

import { prisma } from "@/lib/prisma";

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">カテゴリ一覧</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/c/${category.slug}`}
            className="rounded-2xl border border-ink-200 p-4 text-sm hover:bg-ink-100"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
