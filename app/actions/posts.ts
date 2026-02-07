"use server";

import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validation";

const parseForm = (formData: FormData) => {
  const payload = {
    type: formData.get("type"),
    content: formData.get("content"),
    productId: formData.get("productId"),
    ratingOverall: formData.get("ratingOverall"),
    ratingEffect: formData.get("ratingEffect"),
    ratingCost: formData.get("ratingCost"),
    ratingEase: formData.get("ratingEase"),
    ratingSafety: formData.get("ratingSafety"),
    usedAt: formData.get("usedAt"),
    cropText: formData.get("cropText"),
    targetText: formData.get("targetText"),
    dilutionText: formData.get("dilutionText"),
    amountText: formData.get("amountText"),
    note: formData.get("note"),
    replyToPostId: formData.get("replyToPostId"),
    communityId: formData.get("communityId")
  };

  const numericFields = [
    "ratingOverall",
    "ratingEffect",
    "ratingCost",
    "ratingEase",
    "ratingSafety"
  ];

  const normalized = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (value === null || value === "") return [key, undefined];
      if (numericFields.includes(key)) return [key, Number(value)];
      return [key, String(value)];
    })
  );

  return postSchema.parse(normalized);
};

export const createPost = async (_prevState: unknown, formData: FormData) => {
  try {
    const user = await getCurrentUser();

    const data = parseForm(formData);
    const usedAtDate = data.usedAt ? new Date(data.usedAt) : null;

    const post = await prisma.post.create({
      data: {
        type: data.type,
        content: data.content ?? "",
        productId: data.productId ?? null,
        ratingOverall: data.ratingOverall,
        ratingEffect: data.ratingEffect,
        ratingCost: data.ratingCost,
        ratingEase: data.ratingEase,
        ratingSafety: data.ratingSafety,
        usedAt: usedAtDate,
        cropText: data.cropText,
        targetText: data.targetText,
        dilutionText: data.dilutionText,
        amountText: data.amountText,
        note: data.note,
        replyToPostId: data.replyToPostId,
        communityId: data.communityId,
        authorId: user.id
      }
    });

    return { ok: true, postId: post.id };
  } catch (error) {
    return { ok: false, errors: postSchemaError(error) };
  }
};

export const createReply = async (_prevState: unknown, formData: FormData) => {
  try {
    const user = await getCurrentUser();
    const replyToPostId = formData.get("replyToPostId");

    const data = postSchema.parse({
      type: "NOTE",
      content: formData.get("content")
    });

    if (!replyToPostId) {
      throw new Error("replyToPostId is required");
    }

    const post = await prisma.post.create({
      data: {
        type: data.type,
        content: data.content ?? "",
        replyToPostId: String(replyToPostId),
        authorId: user.id
      }
    });

    return { ok: true, postId: post.id };
  } catch (error) {
    return { ok: false, errors: postSchemaError(error) };
  }
};

export const postSchemaError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    return error.flatten().fieldErrors;
  }
  return { form: ["予期しないエラーが発生しました"] };
};
