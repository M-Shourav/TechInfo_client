"use client";
import Link from "next/link";
import { CardContent, CardFooter } from "./ui/card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../config/config";
import { setCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = response?.data;
      const token = response?.data.token;
      if (data?.success) {
        setCookie("token", token, {
          maxAge: 60 * 60 * 24 * 1,
          path: "/",
        });
        toast.success(data?.message);
        window.location.href = "/";
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CardContent className="w-full p-0">
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="font-semibold text-[13px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter you email"
              autoComplete="on"
              className="w-full border outline-none h-10 px-4 rounded-md
                 focus:border-blue-600 placeholder:text-[13px]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 relative">
            <label htmlFor="password" className="font-semibold text-[13px]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="off"
              className="w-full border outline-none h-10 px-4 rounded-md
                 focus:border-blue-600 placeholder:text-[13px]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <span
                className=" absolute top-10 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="check"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="border border-gray-700"
              />
              <label htmlFor="check" className="font-semibold text-[13px]">
                Remember me
              </label>
            </div>
            <div>
              <Link href={"#"} className="text-[13px]">
                Forget Password
              </Link>
            </div>
          </div>
          <Button
            disabled={!remember}
            type="submit"
            className="w-full bg-black/70 text-white rounded-md cursor-pointer py-2
               font-semibold hover:bg-black duration-300 text-[13px] disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className=" flex items-center gap-x-1">
                <p>SingIn...</p>
                <Loader2 className="mt-1 animate-spin" size={20} />
              </div>
            ) : (
              <p> Sign in</p>
            )}
          </Button>
          <div></div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-1">
        <p className="text-gray-500 text-[13px]">Don&apos;t have an account?</p>
        <Link
          href={"/signup"}
          className="text-[13px] font-medium hover:underline hover:underline-offset-2"
        >
          Sign up
        </Link>
      </CardFooter>
    </>
  );
};

export default LoginForm;
