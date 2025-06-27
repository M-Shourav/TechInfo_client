import { AuthorType, CategoryType, CoverImageType } from "./postType";

export interface SinglePostType {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: any[];
  coverImage: CoverImageType;
  author: AuthorType;
  categories: CategoryType[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
