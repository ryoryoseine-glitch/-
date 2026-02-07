import Link from "next/link";

const RightSidebar = () => {
  return (
    <aside className="hidden w-72 flex-col gap-4 lg:flex">
      <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">検索</p>
        <input
          className="mt-3 w-full rounded-2xl border border-ink-200 px-3 py-2 text-sm"
          placeholder="商品・ユーザーを検索"
        />
      </div>
      <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">注目ランキング</p>
        <div className="mt-3 space-y-2 text-sm text-ink-600">
          <p>水稲向け防除トップ</p>
          <p>有機肥料の評価上昇中</p>
          <Link className="text-ink-900" href="/ranking">
            すべて見る →
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">人気コミュニティ</p>
        <div className="mt-3 space-y-2 text-sm text-ink-600">
          <p>病害虫対策研究会</p>
          <p>施肥ログ共有室</p>
          <Link className="text-ink-900" href="/communities">
            探索する →
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
