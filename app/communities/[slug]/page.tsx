import CommunityFeed from "@/components/community/CommunityFeed";
import CommunityHeader from "@/components/community/CommunityHeader";
import { DEMO_MODE, findDemoCommunityBySlug } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import { getCommunityPosts } from "@/lib/posts";

const CommunityDetailPage = async ({ params }: { params: { slug: string } }) => {
  const community = DEMO_MODE
    ? findDemoCommunityBySlug(params.slug)
    : await prisma.community.findUnique({
        where: { slug: params.slug }
      });

  if (!community) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-600">コミュニティが見つかりません。</p>
      </div>
    );
  }

  const { items } = await getCommunityPosts(community.id);
  const posts = items.map((post) => ({
    id: post.id,
    type: post.type,
    author: { name: post.author.name, handle: post.author.handle },
    content: post.content,
    createdAt: post.createdAt,
    likeCount: post.likeCount,
    replyCount: post.replyCount,
    product: post.product ? { name: post.product.name, slug: post.product.slug } : null
  }));

  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <CommunityHeader name={community.name} description={community.description} />
      <CommunityFeed posts={posts} />
    </div>
  );
};

export default CommunityDetailPage;
