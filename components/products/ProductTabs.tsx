import Link from "next/link";

const tabs = [
  { label: "概要", href: "#overview" },
  { label: "レビュー", href: "#reviews" },
  { label: "ログ", href: "#logs" },
  { label: "Q&A", href: "#qa" }
];

const ProductTabs = () => {
  return (
    <div className="flex gap-3 border-b border-ink-200 px-4 py-3 text-sm">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="rounded-full px-3 py-1 text-ink-600 hover:bg-ink-100"
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default ProductTabs;
