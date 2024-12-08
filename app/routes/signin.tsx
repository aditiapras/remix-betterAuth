import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "Signin" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Signin() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        onClick={async () =>
          await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard", //redirect to dashboard after sign in
          })
        }
      >
        Signin with Google
      </Button>
    </div>
  );
}
