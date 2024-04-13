import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions/auth";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Link href="/dashboard">Go to Dashboard</Link>
      <form action={signOut}>
        <Button size="lg" variant="default">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Link href="/auth/login">
      <Button size="lg" variant="default">
        Login
      </Button>
    </Link>
  );
}
