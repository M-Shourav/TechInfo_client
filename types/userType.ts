export interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
