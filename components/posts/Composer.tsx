"use client";

import { useFormState } from "react-dom";
import { useState } from "react";

import { createPost } from "@/app/actions/posts";

type ComposerState =
  | {
      ok: true;
      postId: string;
    }
  | {
      ok: false;
      errors?: Record<string, string[]>;
    }
  | undefined;

const Composer = () => {
  const [type, setType] = useState<"NOTE" | "REVIEW" | "LOG">("NOTE");
  const [state, formAction] = useFormState(createPost, undefined as ComposerState);

  return (
    <form action={formAction} className="space-y-4 border-b border-ink-200 px-4 py-4">
      <input type="hidden" name="type" value={type} />
      <div className="flex gap-2">
        {(["NOTE", "REVIEW", "LOG"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`rounded-full px-3 py-1 text-xs ${
              type === value ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-700"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <textarea
        name="content"
        placeholder="農薬・資材の気づきを共有しましょう"
        className="min-h-[96px] w-full rounded-2xl border border-ink-200 px-3 py-2 text-sm"
      />

      {(type === "REVIEW" || type === "LOG") && (
        <input
          name="productId"
          placeholder="productId"
          className="w-full rounded-2xl border border-ink-200 px-3 py-2 text-sm"
        />
      )}

      {type === "REVIEW" && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <input
            name="ratingOverall"
            placeholder="総合評価 (1-5)"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="ratingEffect"
            placeholder="効き目"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="ratingCost"
            placeholder="コスト"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="ratingEase"
            placeholder="扱いやすさ"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="ratingSafety"
            placeholder="安全性"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
        </div>
      )}

      {type === "LOG" && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <input
            name="usedAt"
            type="date"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="cropText"
            placeholder="作物"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="targetText"
            placeholder="対象病害虫"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="dilutionText"
            placeholder="希釈"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="amountText"
            placeholder="使用量"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
          <input
            name="note"
            placeholder="メモ"
            className="rounded-2xl border border-ink-200 px-3 py-2"
          />
        </div>
      )}

      {state?.ok === false && state.errors ? (
        <div className="rounded-2xl bg-rose-50 px-3 py-2 text-xs text-rose-600">
          {Object.values(state.errors)
            .flat()
            .map((message, index) => (
              <p key={`${message}-${index}`}>{message}</p>
            ))}
        </div>
      ) : null}

      {state?.ok && (
        <p className="text-xs text-mint-600">投稿しました: {state.postId}</p>
      )}

      <div className="flex justify-end">
        <button className="rounded-2xl bg-mint-500 px-4 py-2 text-sm font-semibold text-white">
          投稿
        </button>
      </div>
    </form>
  );
};

export default Composer;
