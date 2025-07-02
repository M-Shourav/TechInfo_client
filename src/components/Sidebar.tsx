"use client";
import {
  Blocks,
  ChartColumnStacked,
  CircleUser,
  Home,
  LogIn,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { UserType } from "../../types/userType";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../utils/config";

const NavLinks = [
  { name: "Home", links: "/", icon: <Home size={18} /> },
  { name: "Blog", links: "/blog", icon: <Blocks size={18} /> },
  {
    name: "Category",
    links: "/category",
    icon: <ChartColumnStacked size={18} />,
  },
];

interface Props {
  userData: UserType | null;
}
const Sidebar = ({ userData }: Props) => {
  const { data: session } = useSession();
  const [open, setIsOpen] = useState(false);
  const pathName = usePathname();

  const CloseSlider = () => setIsOpen(!open);
  const userImage = session?.user?.image ?? userData?.avatar?.url;
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleLogout = async () => {
    if (session?.user) {
      signOut();
    } else {
      try {
        setIsOpen(true);
        const res = await axios.post(
          `${serverUrl}/api/user/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        const data = res?.data;
        if (data?.success) {
          window.location.reload();
          toast.success(data?.message);
        }
      } catch (error) {
        console.log("User logout error", error);
      } finally {
        setIsOpen(false);
      }
    }
  };
  return (
    <div>
      <div>
        <Button
          onClick={CloseSlider}
          variant="outline"
          size="icon"
          className="cursor-pointer"
        >
          <Menu size={24} />
        </Button>
      </div>
      {open && (
        <div
          onClick={CloseSlider}
          className="fixed inset-0 bg-black/40 bg-opacity-50  z-40 md:hidden"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-100 text-gray-900 shadow-md z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out md:translate-x-0 md:static md:h-screen pt-8 md:pt-0`}
      >
        {/* Logo & Close Button (Mobile Only) */}
        <div className="flex items-center justify-between px-4 md:hidden border-b">
          <div className="text-xl font-bold mb-1">TechInfo</div>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer mb-1 hover:border-indigo-700"
            onClick={CloseSlider}
          >
            <X size={24} />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-2 px-4">
          {NavLinks.map((link) => (
            <Link
              key={link?.name}
              href={link?.links}
              className={` px-4 py-2 rounded hover:bg-gray-200 inline-flex items-center gap-x-1 ${
                pathName === link?.links ? "bg-gray-300 font-medium" : ""
              }`}
              onClick={CloseSlider}
            >
              {link?.icon}
              {link.name}
            </Link>
          ))}
          <>
            {userImage ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="w-full px-4 flex items-center space-x-2"
                >
                  <button className="cursor-pointer outline-none">
                    <Image
                      src={userImage}
                      alt="user-image"
                      width={50}
                      height={50}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-semibold">
                      {session?.user?.name || userData?.name}
                    </p>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-68  shadow-none"
                  align="start"
                >
                  <DropdownMenuLabel className="text-muted-foreground">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href={"/profile"}
                        onClick={CloseSlider}
                        className=" cursor-pointer w-full flex items-center justify-between"
                      >
                        Profile
                        <CircleUser />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={"/setting"}
                        onClick={CloseSlider}
                        className=" cursor-pointer w-full flex items-center justify-between"
                      >
                        Setting
                        <Settings />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer w-full flex items-center justify-between"
                    >
                      <Button
                        variant="outline"
                        className="w-full flex border-none cursor-pointer"
                        onClick={handleLogout}
                      >
                        Log out
                        <LogOut />
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={"/login"}
                onClick={CloseSlider}
                className={`w-full px-4 py-2 rounded hover:bg-gray-200 inline-flex items-center gap-x-1 ${
                  pathName === "/login" ? "bg-gray-300 font-medium" : ""
                }`}
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
