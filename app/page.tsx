import Composer from "@/components/posts/Composer";
import PostThread from "@/components/posts/PostThread";
import { DEMO_MODE, getDemoProductOptions } from "@/lib/demo-data";
import { getForYouPosts } from "@/lib/posts";
import { prisma } from "@/lib/prisma";

const HomePage = async () => {
  const productOptions = DEMO_MODE
    ? getDemoProductOptions()
    : await prisma.product.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true }
      });
  const { items } = await getForYouPosts();
  const posts = items.map((post) => ({
    id: post.id,
    type: post.type,
    author: {
      name: post.author.name,
      handle: post.author.handle
    },
    content: post.content,
    createdAt: post.createdAt,
    likeCount: post.likeCount,
    replyCount: post.replyCount,
    product: post.product
      ? { name: post.product.name, slug: post.product.slug }
      : null
  }));

  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <Composer products={productOptions} />
      <PostThread posts={posts} />
    </div>
  );
};

export default HomePage;
