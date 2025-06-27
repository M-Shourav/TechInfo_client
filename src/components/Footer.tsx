import React from "react";
import Container from "./container";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Container className="py-5">
        <p className="text-gray-700 text-xs font-medium">
          © Copyright 2025{" "}
          <Link
            href={"https://masum-ahmed-navy.vercel.app"}
            target="_blank"
            className="text-yellow-700 font-semibold hover:underline"
          >
            Masum-Ahmed
          </Link>{" "}
          All Right Reserve.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
