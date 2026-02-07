import Link from "next/link";

import { prisma } from "@/lib/prisma";

const CommunitiesPage = async () => {
  const communities = await prisma.community.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">コミュニティ</h2>
      <div className="mt-4 space-y-3">
        {communities.map((community) => (
          <Link
            key={community.id}
            href={`/communities/${community.slug}`}
            className="block rounded-2xl border border-ink-200 p-4 text-sm hover:bg-ink-100"
          >
            <p className="font-semibold">{community.name}</p>
            <p className="text-xs text-ink-500">{community.description ?? "説明は準備中"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
