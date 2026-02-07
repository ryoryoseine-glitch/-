const RatingSummary = ({ avgRating, reviewCount }: { avgRating: number; reviewCount: number }) => {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold">平均評価</p>
      <p className="mt-2 text-3xl font-semibold text-ink-900">{avgRating.toFixed(1)}</p>
      <p className="text-xs text-ink-500">レビュー {reviewCount}件</p>
    </div>
  );
};

export default RatingSummary;
