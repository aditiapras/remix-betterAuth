import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

import { useNavigate, redirect, useLoaderData } from "@remix-run/react";
import { auth } from "~/lib/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return redirect("/signin");
  }
  return session;
}

export default function Index() {
  const user = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <Button
          onClick={() => {
            authClient.signOut();
            navigate("/signin");
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
