const CommunityHeader = ({ name, description }: { name: string; description?: string | null }) => {
  return (
    <div className="border-b border-ink-200 px-4 py-5">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="mt-2 text-sm text-ink-600">{description ?? "説明は準備中です"}</p>
    </div>
  );
};

export default CommunityHeader;
