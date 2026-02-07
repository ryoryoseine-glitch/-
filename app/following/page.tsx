import PostThread from "@/components/posts/PostThread";

const FollowingPage = async () => {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <div className="border-b border-ink-200 px-4 py-4">
        <p className="text-sm text-ink-600">フォロー中の投稿がここに表示されます。</p>
      </div>
      <PostThread posts={[]} />
    </div>
  );
};

export default FollowingPage;
