import PostBanner from "@/components/banner/PostBanner";
import PostByAuthor from "@/components/banner/PostByAuthor";
import AllCategories from "@/components/category/AllCategories";

const Home = () => {
  return (
    <div>
      <PostBanner />
      <AllCategories />
      <PostByAuthor />
    </div>
  );
};

export default Home;
