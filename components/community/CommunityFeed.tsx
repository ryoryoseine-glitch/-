import PostThread from "@/components/posts/PostThread";
import type { PostCardProps } from "@/components/posts/PostCard";

const CommunityFeed = ({ posts }: { posts: PostCardProps[] }) => {
  return (
    <section className="divide-y divide-ink-200">
      <PostThread posts={posts} />
    </section>
  );
};

export default CommunityFeed;
