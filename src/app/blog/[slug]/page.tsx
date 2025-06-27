"use client";
import Container from "@/components/container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../../config/config";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { SinglePostType } from "../../../../types/SinglePostType";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import PostViewer from "@/components/banner/PostViewer";
import Loading from "@/components/Loading";
import OtherPost from "@/components/banner/OtherPost";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const SinglePage = () => {
  const params = useParams();
  const [Post, setPost] = useState<SinglePostType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const singlePost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${serverUrl}api/post/singlePost/${params?.slug}`
        );
        setPost(res?.data.singlePost);
      } catch (error) {
        console.log("Single Post error:", error);
      } finally {
        setLoading(false);
      }
    };
    singlePost();
  }, []);
  return (
    <Container className="py-10">
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full flex flex-col items-start gap-10">
            <div className="space-y-2">
              <p className="text-sm/5 text-gray-500 font-semibold tracking-widest uppercase">
                {dayjs(Post?.updatedAt).format("dddd, MMMM d, YYYY")}
              </p>
              <h1 className="text-2xl lg:text-5xl font-semibold">
                {Post?.title}
              </h1>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-10">
              <div className="flex flex-row lg:flex-col justify-between lg:justify-normal gap-10">
                <div className="flex items-center gap-x-4">
                  {Post?.author.coverImage.url && (
                    <Image
                      src={Post?.author.coverImage.url}
                      alt="author-image"
                      width={50}
                      height={50}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <p className="text-sm/5 font-semibold capitalize">
                    {Post?.author.name}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {Post?.categories.map((item) => (
                    <Badge
                      variant="outline"
                      key={item?._id}
                      className="cursor-pointer text-sm py-1 px-2 text-gray-500 hover:text-gray-700 duration-300"
                    >
                      {item?.name}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* post details */}
              <div className="w-full max-w-screen-md flex flex-col gap-5">
                {Post?.coverImage?.url && (
                  <Image
                    src={Post?.coverImage.url}
                    alt="cover-image"
                    width={800}
                    height={800}
                    className="w-full max-w-screen-md rounded-md"
                    priority
                  />
                )}
                <p className="text-center mt-5">{Post?.summary}</p>
                <PostViewer content={Post?.content?.[0]} />
                <Link href={"/"}>
                  <Button
                    className="flex items-center gap-x-1 text-xs rounded-full cursor-pointer hover:bg-black hover:text-white duration-200"
                    variant="outline"
                  >
                    <ChevronLeft className="" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
      {Post && <OtherPost currentSlug={Post?.slug} />}
    </Container>
  );
};

export default SinglePage;
