import { auth, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "./prisma";
import { isReservedHandle } from "./reserved-handles";

export const requireClerkUserId = () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
};

export const syncClerkUser = async (userId: string) => {
  const user = await clerkClient.users.getUser(userId);
  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  );

  const dbUser = await prisma.user.upsert({
    where: { id: userId },
    update: {
      name: user.fullName ?? user.username ?? null,
      imageUrl: user.imageUrl ?? null,
      website: user.websites?.[0]?.url ?? null,
      location: null
    },
    create: {
      id: userId,
      handle: user.username ?? `user-${userId.slice(0, 8)}`,
      name: user.fullName ?? user.username ?? null,
      imageUrl: user.imageUrl ?? null,
      website: user.websites?.[0]?.url ?? null,
      location: null
    }
  });

  const pathname = headers().get("next-url") ?? "";
  if (!dbUser.handle || isReservedHandle(dbUser.handle)) {
    if (!pathname.includes("/settings/profile")) {
      redirect("/settings/profile");
    }
  }

  return {
    user: dbUser,
    email: primaryEmail?.emailAddress ?? null
  };
};

export const getCurrentUser = async () => {
  const userId = requireClerkUserId();
  const { user } = await syncClerkUser(userId);
  return user;
};
