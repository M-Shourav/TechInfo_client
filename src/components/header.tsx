"use client";
import axios from "axios";
import Container from "./container";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { UserType } from "../../types/userType";
import toast from "react-hot-toast";
import { LogOut, User } from "lucide-react";
import { serverUrl } from "../../utils/config";

export const NavLinks = [
  { name: "Home", links: "/" },
  { name: "Blog", links: "/blog" },
  { name: "Category", links: "/category" },
];

const Header = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/user/me`, {
          withCredentials: true,
        });
        const data = res?.data;
        if (data?.success) {
          setUserData(data?.user);
        }
      } catch (error) {
        console.log("fetching user data error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    if (session?.user) {
      signOut();
    } else {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    }
  };
  const userImage = session?.user?.image ?? userData?.avatar?.url;

  console.log(userData);

  return (
    <header className="w-full bg-white overflow-hidden h-20 shadow-md">
      <Container className="h-full flex items-center justify-between gap-10">
        <div>
          <Link
            href={"/"}
            className="text-2xl font-bold uppercase px-2 py-1 hover:bg-amber-100
            duration-300"
          >
            TechInfo
          </Link>
        </div>
        <div className="hidden lg:inline-flex items-center gap-5">
          {NavLinks?.map((nav, index) => (
            <div key={index}>
              <Link
                href={nav?.links}
                className="text-lg font-semibold px-2 py-1 hover:bg-amber-100
                duration-300"
              >
                {nav?.name}
              </Link>
            </div>
          ))}
          <div>
            {session?.user || userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center gap-2 px-2 py-1 hover:bg-amber-50
                duration-300 cursor-pointer outline-none"
                >
                  {userImage && (
                    <Image
                      src={userImage}
                      alt="profileImage"
                      width={25}
                      height={25}
                      className=" object-cover rounded-full"
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account Setting</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User />
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={"/login"}
                className="text-lg font-semibold px-2 py-1 hover:bg-amber-100
                duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
