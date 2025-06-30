"use client";
import { useState } from "react";
import { CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import axios from "../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CameraOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const registerFunction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (imageUrl) {
        formData.append("avatar", imageUrl);
      }
      const res = await axios.post(`/api/user/register`, formData);
      const data = res.data;
      if (data?.success) {
        toast.success(data?.message);
        router.push("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("user register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardContent className="w-full p-0">
        <form onSubmit={registerFunction} className="flex flex-col gap-3">
          <div className="w-16 h-16 rounded-full border border-indigo-500 flex items-center justify-center relative">
            <Label htmlFor="imageUrl">
              {imageUrl ? (
                <>
                  <Image
                    src={URL.createObjectURL(imageUrl)}
                    alt="profile-image"
                    width={16}
                    height={16}
                    priority
                    className="w-16 h-16 object-cover rounded-full cursor-pointer"
                  />
                </>
              ) : (
                <CameraOff size={45} className="cursor-pointer" />
              )}
              <Input
                type="file"
                accept="image/*"
                id="imageUrl"
                name="imageUrl"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImageUrl(e.target.files?.[0]);
                  }
                }}
              />
            </Label>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="font-semibold text-[13px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="on"
              placeholder="Enter username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border outline-none h-10 px-4 rounded-md
           focus:border-blue-600 placeholder:text-[13px]"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="font-semibold text-[13px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@gmail.com"
              autoComplete="on"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border outline-none h-10 px-4 rounded-md
            focus:border-blue-600 placeholder:text-[13px]"
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border outline-none h-10 px-4 rounded-md
            focus:border-blue-600 placeholder:text-[13px]"
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
          <Button type="submit" disabled={loading} className=" cursor-pointer">
            {loading ? (
              <div className="flex items-center gap-x-1">
                <Loader2 className="mt-1 animate-spin" />
                <p>Loading...</p>
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-1">
        <p className="text-gray-500 text-[13px]">Already have an account?</p>
        <Link
          href={"/login"}
          className="text-[13px] font-medium hover:underline hover:underline-offset-2"
        >
          Sign in
        </Link>
      </CardFooter>
    </>
  );
};

export default RegisterForm;
