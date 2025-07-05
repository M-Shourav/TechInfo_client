"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { PostType } from "../../../types/postType";
import axios from "axios";
import { serverUrl } from "../../../utils/config";
import Container from "../container";

const AllBlogPost = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPostList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}api/post/posts`, {
          withCredentials: true,
        });
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
    <Container className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
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
            <p className="text-sm/5 font-semibold">{post?.author?.name}</p>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AllBlogPost;
