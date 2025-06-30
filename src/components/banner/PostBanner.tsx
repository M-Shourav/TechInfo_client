"use client";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { PostType } from "../../../types/postType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const PostBanner = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPostList = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/post/posts");
        const data = res?.data;
        setPostList(data?.post);
      } catch (error) {
        console.log("Post fetching error:", error);
      } finally {
        setLoading(false);
      }
    };
    getPostList();
  }, []);
  return (
    <div className="max-w-screen-xl px-8 flex flex-col space-y-5 py-10">
      <div className="w-full flex flex-col items-center justify-center space-y-2">
        <p className="text-xs md:text-base font-semibold">Recent blog</p>
        <h1 className="text-2xl md:text-5xl font-semibold">
          Writing from our team
        </h1>
        <p className="text-sm text-center">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </div>
      <div>
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-wide">
            My Featured Post
          </h2>
          {loading ? (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-4 mt-5">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-5 text-gray-700">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-5">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {postList?.map((post) => (
                <Card key={post?.slug} className="group relative">
                  <CardHeader className="rounded-2xl">
                    <Image
                      src={post?.coverImage?.url}
                      alt="post-image"
                      width={800}
                      height={800}
                      className="aspect-[3/2] w-full rounded-2xl group-hover:scale-105 duration-500"
                      priority
                    />
                    <CardTitle className="mt-5">
                      <h3 className="text-sm/5 text-gray-500">
                        {dayjs(post?.createdAt).format("dddd,MMMM d,YYYY")}
                      </h3>
                      <Link
                        href={`/blog/${post?.slug}`}
                        className="text-base/7 font-semibold"
                      >
                        <span className=" absolute inset-0" />
                        {post?.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      <p className=" mt-2 text-base/5 text-gray-500 w-full">
                        {post?.summary}
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-2 mt-auto">
                    <Image
                      src={post.author.coverImage?.url}
                      alt="author-image"
                      width={50}
                      height={50}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm/5 font-semibold">
                      {post?.author?.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBanner;
