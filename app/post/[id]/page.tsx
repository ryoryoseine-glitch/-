import {
  DEMO_MODE,
  findDemoPostWithRelations,
  listDemoRepliesWithRelations
} from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import PostThread from "@/components/posts/PostThread";

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const post = DEMO_MODE
    ? findDemoPostWithRelations(params.id)
    : await prisma.post.findUnique({
        where: { id: params.id },
        include: {
          author: true,
          replies: { include: { author: true, product: true } },
          product: true
        }
      });

  if (!post) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-600">投稿が見つかりませんでした。</p>
      </div>
    );
  }

  const replies = DEMO_MODE ? listDemoRepliesWithRelations(post.id) : post.replies;
  const thread = [
    {
      id: post.id,
      type: post.type,
      author: {
        name: post.author?.name ?? "Unknown",
        handle: post.author?.handle ?? "unknown"
      },
      content: post.content,
      createdAt: post.createdAt,
      likeCount: post.likeCount,
      replyCount: post.replyCount,
      product: post.product ? { name: post.product.name, slug: post.product.slug } : null
    },
    ...replies.map((reply) => ({
      id: reply.id,
      type: reply.type,
      author: {
        name: reply.author?.name ?? "Unknown",
        handle: reply.author?.handle ?? "unknown"
      },
      content: reply.content,
      createdAt: reply.createdAt,
      likeCount: reply.likeCount,
      replyCount: reply.replyCount,
      product: reply.product ? { name: reply.product.name, slug: reply.product.slug } : null
    }))
  ];

  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <PostThread posts={thread} />
    </div>
  );
};

export default PostDetailPage;
