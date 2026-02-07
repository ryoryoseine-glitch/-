"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { isReservedHandle } from "@/lib/reserved-handles";
import { prisma } from "@/lib/prisma";
import { handleSchema } from "@/lib/validation";

export const updateHandle = async (_prevState: unknown, formData: FormData) => {
  const user = await getCurrentUser();
  const value = formData.get("handle");
  const handle = handleSchema.parse(String(value ?? ""));

  if (isReservedHandle(handle)) {
    return { ok: false, errors: { handle: ["このハンドルは予約語です"] } };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      handle,
      name: String(formData.get("name") ?? user.name ?? "") || null,
      bio: String(formData.get("bio") ?? "") || null,
      location: String(formData.get("location") ?? "") || null,
      website: String(formData.get("website") ?? "") || null
    }
  });

  revalidatePath("/settings/profile");
  return { ok: true };
};
