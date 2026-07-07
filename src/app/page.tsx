import { getSession } from "@/lib/session";
import { Login } from "./components/login";
import { AccessDenied } from "./components/access_denied";
import { Dashboard } from "./components/dashboard";

export default async function Home() {
  const session = await getSession();

  if (!session.user?.isLoggedIn) {
    return <Login />;
  }

  if (!session.user.allowed) {
    return <AccessDenied />;
  }

  return <Dashboard user={session.user} />;
}