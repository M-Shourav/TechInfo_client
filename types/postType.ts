export interface AuthorImageType {
  _id: string;
  public_id: string;
  url: string;
}

export interface AuthorType {
  _id: string;
  name: string;
  email: string;
  coverImage: AuthorImageType;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
}

export interface CoverImageType {
  _id: string;
  public_id: string;
  url: string;
}

export interface TiptapContentBlock {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapContentBlock[]; // recursive for nested content
}

export interface TiptapContent {
  type: string; // usually "doc"
  content: TiptapContentBlock[];
}

export interface PostType {
  _id: string;
  title: string;
  summary: string;
  slug: string;
  isPublished: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  author: AuthorType;
  categories: CategoryType[];
  coverImage: CoverImageType;
  content: TiptapContent[];
  __v: number;
}
