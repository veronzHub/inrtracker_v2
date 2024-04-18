import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { handleSignInWithGoogle } from "@/app/actions/auth";

export default function Social() {
  return (
    <div className="flex items-center flex-col w-full gap-3">
      {/* <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaFacebook className="h-5 w-5 mr-2" /> Continue with Facebook
      </Button> */}
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={handleSignInWithGoogle}
      >
        <FcGoogle className="h-5 w-5 mr-2" /> Continue with Google
      </Button>
      {/* <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaApple className="h-5 w-5 mr-2" /> Continue with Apple
      </Button> */}
    </div>
  );
}
