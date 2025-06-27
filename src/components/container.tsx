import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
  children: React.ReactNode;
}
const Container = ({ className, children }: Props) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-8 md:px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
