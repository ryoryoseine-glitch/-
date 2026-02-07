import Composer from "@/components/posts/Composer";

const NewReviewPage = () => {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <div className="border-b border-ink-200 px-4 py-4">
        <h2 className="text-sm font-semibold">レビュー投稿</h2>
      </div>
      <Composer />
    </div>
  );
};

export default NewReviewPage;
