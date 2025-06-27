"use client";
import React, { useEffect, useState } from "react";
import Container from "../container";
import axios from "axios";
import { serverUrl } from "../../../config/config";
import { PostType } from "../../../types/postType";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
const PostByAuthor = () => {
  const [post, setPost] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPostList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}api/post/posts`);
        const data = res?.data;
        if (data?.success) {
          setPost(data?.post);
        }
      } catch (error) {
        console.log("Post fetching error:", error);
      } finally {
        setLoading(false);
      }
    };
    getPostList();
  }, []);
  return (
    <Container className="py-10">
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
          <div className="flex items-center space-x-4 mt-5">
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
          <div className="flex items-center space-x-4 mt-5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-[1200px] mx-auto">
          {post?.map((item) => (
            <div
              key={item?.slug}
              className="relative grid grid-cols-1 sm:grid-cols-3 max-sm:gap-3 border-b
             border-b-gray-200 first:border-t first:border-t-gray-200 py-10"
            >
              {/* author details */}
              <div>
                <p className="text-sm/5 max-sm:text-gray-700 md:font-medium mb-2">
                  {dayjs(item?.createdAt).format("dddd, MMMM d, YYYY")}
                </p>
                {item?.author && (
                  <div className="flex items-center gap-3">
                    <Image
                      src={item?.author.coverImage.url}
                      alt="author-image"
                      width={24}
                      height={24}
                      priority
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <p className="text-sm/5 font-medium max-sm:text-gray-400">
                      {item?.author.name}
                    </p>
                  </div>
                )}
              </div>
              <div className="sm:col-span-2 sm:max-w-2xl flex flex-col gap-y-3">
                <h1 className="text-base font-semibold max-sm:text-gray-700">
                  {item?.title}
                </h1>
                <p className="text-sm/5 text-muted-foreground">
                  {item?.summary}
                </p>
                <Link
                  href={`/blog/${item?.slug}`}
                  className="w-fit text-sm font-medium flex items-center hover:underline underline-offset-2 hover:text-blue-700 duration-200"
                >
                  Read More
                  <ChevronRight size={17} className="mt-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default PostByAuthor;
