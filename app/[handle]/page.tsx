import {
  DEMO_MODE,
  findDemoUserByHandle,
  listDemoPostsWithRelations
} from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import PostThread from "@/components/posts/PostThread";

const ProfileHandlePage = async ({ params }: { params: { handle: string } }) => {
  const user = DEMO_MODE
    ? (() => {
        const demoUser = findDemoUserByHandle(params.handle);
        if (!demoUser) return null;
        const posts = listDemoPostsWithRelations({ authorId: demoUser.id });
        return {
          ...demoUser,
          posts
        };
      })()
    : await prisma.user.findUnique({
        where: { handle: params.handle },
        include: { posts: { include: { product: true } } }
      });

  if (!user) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-600">ユーザーが見つかりませんでした。</p>
      </div>
    );
  }

  const posts = user.posts.map((post) => ({
    id: post.id,
    type: post.type,
    author: { name: user.name, handle: user.handle },
    content: post.content,
    createdAt: post.createdAt,
    likeCount: post.likeCount,
    replyCount: post.replyCount,
    product: post.product ? { name: post.product.name, slug: post.product.slug } : null
  }));

  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <div className="border-b border-ink-200 px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-ink-200" />
          <div>
            <p className="text-lg font-semibold">{user.name ?? user.handle}</p>
            <p className="text-xs text-ink-500">@{user.handle}</p>
          </div>
        </div>
        {user.bio ? <p className="mt-3 text-sm text-ink-600">{user.bio}</p> : null}
      </div>
      <PostThread posts={posts} />
    </div>
  );
};

export default ProfileHandlePage;
