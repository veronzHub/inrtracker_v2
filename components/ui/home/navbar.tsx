import Logo from "./logo";
import AuthButton from "@/components/AuthButton";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center text-md gap-x-10">
        <li>
          <Logo />
        </li>
        <li>Features</li>
        <li>Resources</li>
        <li className="ml-auto">
          <AuthButton />
        </li>
      </ul>
    </nav>
  );
}
