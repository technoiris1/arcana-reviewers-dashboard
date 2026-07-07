import { Button } from "@/components/ui/button";

export function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#efeded] px-6 font-mono">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 md:text-7xl">
          Arcana Priority Reviews
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
        uhhhh table showing all the priority review form submissions, pls review if youre free tysm
        </p>

        <a
          href="/api/auth/login"
          className="mt-10 inline-block"
        >
          <Button className="h-14 cursor-pointer rounded-xl bg-[#ec3750] px-12 text-lg font-semibold text-white transition-all  hover:bg-[#d92d48]  ">
            Login with Hack Club →
          </Button>
        </a>
      </div>
    </main>
  );
}