"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Container from "./container";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DialogContent } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ProfileViewer = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (session?.user) {
      setName(session?.user.name || "");
      setAvatar(session?.user.image || "");
      setEmail(session?.user.email || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="w-full max-w-lg ">
      <CardHeader>
        <CardTitle className="text-xs/5">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3 text-sm">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3 text-sm">
              <Label htmlFor="email">Email</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  This account was linked with a provider. You cannot change
                  your email.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="w-full flex items-end justify-end mt-10">
              <Button type="submit" className="w-fit cursor-pointer">
                Save Change
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileViewer;
