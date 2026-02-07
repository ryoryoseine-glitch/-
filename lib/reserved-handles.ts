export const RESERVED_HANDLES = new Set([
  "admin",
  "api",
  "settings",
  "post",
  "posts",
  "p",
  "c",
  "communities",
  "community",
  "ranking",
  "compose",
  "login",
  "logout",
  "signup",
  "signin",
  "new",
  "edit",
  "support"
]);

export const isReservedHandle = (value: string) =>
  RESERVED_HANDLES.has(value.toLowerCase());
