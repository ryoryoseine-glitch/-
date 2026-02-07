import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.user.upsert({
    where: { id: "demo-user" },
    update: {},
    create: {
      id: "demo-user",
      handle: "demo",
      name: "Demo User"
    }
  });

  await prisma.category.createMany({
    data: [
      { slug: "pesticide", name: "農薬" },
      { slug: "fertilizer", name: "肥料" }
    ],
    skipDuplicates: true
  });

  await prisma.product.upsert({
    where: { slug: "mospilan" },
    update: {},
    create: {
      slug: "mospilan",
      name: "モスピラン",
      category: { connect: { slug: "pesticide" } }
    }
  });

  await prisma.post.upsert({
    where: { id: "demo-post" },
    update: {},
    create: {
      id: "demo-post",
      type: "NOTE",
      content: "デモ投稿です",
      authorId: "demo-user"
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
