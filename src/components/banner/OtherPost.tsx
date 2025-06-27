"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config/config";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { PostType } from "../../../types/postType";
const OtherPost = ({ currentSlug }: { currentSlug: string }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const fetOtherPost = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}api/post/otherPost/${currentSlug}`
        );
        const data = res?.data;
        if (data?.success) {
          setPosts(data?.post);
        }
      } catch (error) {
        console.log("other Post fetching error:", error);
      }
    };
    if (currentSlug) {
      fetOtherPost();
    }
  }, [currentSlug]);

  return (
    <div className="flex flex-col gap-y-5">
      <h3 className="font-semibold text-lg tracking-wide">You May also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((item) => (
          <Card key={item?._id} className="group relative">
            <CardHeader className="">
              <Image
                src={item?.coverImage.url}
                alt="post-image"
                width={800}
                height={800}
                className="aspect-[3/2] w-full rounded-2xl group-hover:scale-105 duration-500"
              />
              <CardTitle className="mt-2">
                <Link
                  href={`/blog/${item?.slug}`}
                  className="text-base/7 font-semibold"
                >
                  <span className=" absolute inset-0" />
                  {item?.title}
                </Link>
              </CardTitle>
              <CardDescription>
                <div className="flex flex-wrap items-center gap-3">
                  <Image
                    src={item?.author.coverImage.url}
                    alt="author-image"
                    width={50}
                    height={50}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className=" font-semibold text-xs">{item?.author.name}</p>
                  <p className="text-black font-semibold text-xs">
                    {dayjs(item?.createdAt).format("dddd, MMMM d, YYYY")}
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OtherPost;
