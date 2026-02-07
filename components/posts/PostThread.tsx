import PostCard, { PostCardProps } from "./PostCard";

const PostThread = ({ posts }: { posts: PostCardProps[] }) => {
  return (
    <div className="divide-y divide-ink-200">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostThread;
