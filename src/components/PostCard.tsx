import React from "react";
import { PostType } from "../../types/postType";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import dayjs from "dayjs";
interface Props {
  post: PostType;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card className="group relative">
      <CardHeader>
        <Image
          src={post?.coverImage.url}
          alt="post-image"
          width={800}
          height={800}
          priority
          className="w-full aspect-[3/2] rounded-md group-hover:scale-105 duration-200"
        />
        <CardTitle className="mt-5">
          <p className="text-muted-foreground text-sm font-mono mb-3">
            {dayjs(post?.updatedAt).format("dddd, MMMM d, YYYY")}
          </p>
          <Link href={`/blog/${post?.slug}`} className="">
            {post?.title}
            <span className=" absolute inset-0" />
          </Link>
        </CardTitle>
        <CardDescription>
          <p>{post?.summary}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-x-2 mt-auto text-xs">
        <Image
          src={post?.author.coverImage.url}
          alt="author-image"
          width={24}
          height={24}
          className="w-8 h-8 rounded-full"
        />
        <p className="font-semibold text-muted-foreground">
          {post?.author.name}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
