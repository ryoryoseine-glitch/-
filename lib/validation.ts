import { z } from "zod";

export const postSchema = z
  .object({
    type: z.enum(["NOTE", "REVIEW", "LOG"]),
    content: z.string().trim().optional(),
    productId: z.string().optional(),
    ratingOverall: z.number().int().min(1).max(5).optional(),
    ratingEffect: z.number().int().min(1).max(5).optional(),
    ratingCost: z.number().int().min(1).max(5).optional(),
    ratingEase: z.number().int().min(1).max(5).optional(),
    ratingSafety: z.number().int().min(1).max(5).optional(),
    usedAt: z.string().optional(),
    cropText: z.string().optional(),
    targetText: z.string().optional(),
    dilutionText: z.string().optional(),
    amountText: z.string().optional(),
    note: z.string().optional(),
    replyToPostId: z.string().optional(),
    communityId: z.string().optional()
  })
  .superRefine((value, ctx) => {
    if (value.type === "NOTE") {
      if (!value.content || value.content.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NOTEにはcontentが必須です。",
          path: ["content"]
        });
      }
      return;
    }

    if (!value.productId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "REVIEW/LOGにはproductIdが必須です。",
        path: ["productId"]
      });
    }

    if (value.type === "REVIEW") {
      if (!value.content || value.content.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "REVIEWにはcontentが必須です。",
          path: ["content"]
        });
      }
      if (!value.ratingOverall) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "REVIEWにはratingOverallが必須です。",
          path: ["ratingOverall"]
        });
      }
    }

    if (value.type === "LOG" && !value.usedAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "LOGにはusedAtが必須です。",
        path: ["usedAt"]
      });
    }
  });

export const handleSchema = z
  .string()
  .trim()
  .min(3, "handleは3文字以上で入力してください")
  .max(24, "handleは24文字以内で入力してください")
  .regex(/^[a-z0-9_]+$/i, "handleは英数字と_のみ使用できます");
