import { prisma } from "./prisma";
import { isReservedHandle } from "./reserved-handles";

const DEMO_MODE = process.env.DEMO_MODE === "true";

const loadClerk = async () => {
  const clerk = await import("@clerk/nextjs/server");
  const { headers } = await import("next/headers");
  const { redirect } = await import("next/navigation");
  return { ...clerk, headers, redirect };
};

export const requireClerkUserId = async () => {
  if (DEMO_MODE) {
    return "demo-user";
  }
  const { auth, redirect } = await loadClerk();
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
};

export const syncClerkUser = async (userId: string) => {
  if (DEMO_MODE) {
    return {
      user: {
        id: "demo-user",
        handle: "demo",
        name: "Demo User",
        imageUrl: null,
        bio: null,
        location: null,
        website: null
      },
      email: null
    };
  }

  const { clerkClient, headers, redirect } = await loadClerk();
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
  if (DEMO_MODE) {
    return {
      id: "demo-user",
      handle: "demo",
      name: "Demo User",
      imageUrl: null
    };
  }

  const userId = await requireClerkUserId();
  const { user } = await syncClerkUser(userId);
  return user;
};
