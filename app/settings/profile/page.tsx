import { updateHandle } from "@/app/actions/profile";
import { getCurrentUser } from "@/lib/auth";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">プロフィール設定</h2>
      <p className="mt-1 text-sm text-ink-600">
        handle はURLとして使用されます。予約語は使用できません。
      </p>
      <form action={updateHandle} className="mt-6 space-y-4">
        <div className="grid gap-2">
          <label className="text-xs text-ink-600">handle</label>
          <input
            name="handle"
            defaultValue={user.handle}
            className="rounded-2xl border border-ink-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-ink-600">表示名</label>
          <input
            name="name"
            defaultValue={user.name ?? ""}
            className="rounded-2xl border border-ink-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-ink-600">bio</label>
          <textarea
            name="bio"
            defaultValue={user.bio ?? ""}
            className="min-h-[80px] rounded-2xl border border-ink-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-ink-600">location</label>
          <input
            name="location"
            defaultValue={user.location ?? ""}
            className="rounded-2xl border border-ink-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-ink-600">website</label>
          <input
            name="website"
            defaultValue={user.website ?? ""}
            className="rounded-2xl border border-ink-200 px-3 py-2 text-sm"
          />
        </div>
        <button className="rounded-2xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white">
          保存する
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
