import Link from "next/link";
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="p-4 flex justify-end">
      <Link href={"/login"} className=" bg-blue-400 p-2 px-4 rounded-md">
        Login
      </Link>
    </div>
  );
};

export default Header;
