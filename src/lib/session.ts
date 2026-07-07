import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface UserSession {
  isLoggedIn: boolean;
  allowed: boolean;
  slackId: string;
  name: string;
  email: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "arcana-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  return getIronSession<{ user?: UserSession }>(
    await cookies(),
    sessionOptions
  );
}