export function SearchBar() {
  return (
    <input
      className="h-12 w-full rounded-xl border border-divider px-4 text-sm text-text placeholder:text-subtext focus:border-primary focus:outline-none"
      placeholder="作物・資材を検索"
      type="text"
      aria-label="検索"
    />
  );
}
