import Logo from "../home/logo";

type HeaderProps = {
  label: string;
};
export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Logo />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
