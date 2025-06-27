"use client";
import Container from "@/components/container";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostType } from "../../../../types/postType";
import axios from "axios";
import { serverUrl } from "../../../../config/config";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";

const SingleCategoryPost = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<PostType[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      const getCategoryByPost = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${serverUrl}api/category/post/category/${slug}`
          );
          const data = res?.data;
          if (data?.success) {
            setPost(data?.post);
          }
        } catch (error) {
          console.log("Category to post fetching error:", error);
        } finally {
          setLoading(false);
        }
      };
      getCategoryByPost();
    }
  }, [slug]);

  return (
    <Container className="py-10">
      <Badge
        className="py-2 px-2 text-xl tracking-wide font-semibold"
        variant="secondary"
      >
        Categories: {slug}
      </Badge>
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
      ) : post?.length === 0 ? (
        <p>No posts found in this category.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {post?.map((item) => (
            <PostCard key={item?._id} post={item} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default SingleCategoryPost;
