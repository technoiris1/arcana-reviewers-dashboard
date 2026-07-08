import type { UserSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
export function Dashboard({ user }: { user: UserSession }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#efeded] px-6 font-mono">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 md:text-7xl">
          Welcome, {user.name}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
          You&apos;re signed in and viewing the Arcana Priority Reviews dashboard.
        </p>

        <div className="mx-auto mt-10 grid gap-3 text-sm leading-6 text-zinc-700 md:text-base">
          <p>
            <span className="font-semibold text-zinc-900">Email:</span> {user.email}
          </p>

          <p>
            <span className="font-semibold text-zinc-900">Slack ID:</span> {user.slackId}
          </p>
        </div>
                <a
          href="/api/auth/logout"
          className="mt-10 inline-block"
        >
          <Button className="h-14 cursor-pointer rounded-xl bg-[#ec3750] px-12 text-lg font-semibold text-white transition-all  hover:bg-[#d92d48]  ">
            Logout →
          </Button>
        </a>
      </div>
    </main>
  );
}