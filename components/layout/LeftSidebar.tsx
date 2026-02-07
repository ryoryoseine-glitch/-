import Link from "next/link";

const LeftSidebar = () => {
  return (
    <aside className="hidden w-56 flex-col gap-4 rounded-3xl border border-ink-200 bg-white/80 p-4 text-sm shadow-sm lg:flex">
      <div>
        <p className="text-lg font-semibold">AgroSNS</p>
        <p className="text-xs text-ink-500">農業資材レビュー × SNS</p>
      </div>
      <nav className="flex flex-col gap-2">
        <Link className="rounded-xl px-3 py-2 hover:bg-ink-100" href="/">
          ホーム
        </Link>
        <Link className="rounded-xl px-3 py-2 hover:bg-ink-100" href="/following">
          フォロー中
        </Link>
        <Link className="rounded-xl px-3 py-2 hover:bg-ink-100" href="/categories">
          カテゴリ
        </Link>
        <Link className="rounded-xl px-3 py-2 hover:bg-ink-100" href="/ranking">
          ランキング
        </Link>
        <Link className="rounded-xl px-3 py-2 hover:bg-ink-100" href="/communities">
          コミュニティ
        </Link>
        <Link className="rounded-xl px-3 py-2 hover:bg-ink-100" href="/settings/profile">
          プロフィール設定
        </Link>
      </nav>
      <Link
        className="mt-auto rounded-2xl bg-ink-900 px-4 py-3 text-center font-medium text-white"
        href="/compose"
      >
        投稿する
      </Link>
    </aside>
  );
};

export default LeftSidebar;
