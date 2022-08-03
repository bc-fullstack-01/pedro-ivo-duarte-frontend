import { useState, useEffect } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import PostCard from "../../components/PostCard";
import server from "../../api/server";

interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>(() => []);
  const token = localStorage.getItem("acessToken");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get("/feed", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        alert(err);
      }
    };
    getPosts();
  }, [token]);

  const postsEl = posts.map((post) => <PostCard post={post} />);

  return (
    <div>
      <CustomAppBar title="home" />
      <h1 style={{ marginTop: "100px" }}>Feed</h1>
      {postsEl}
    </div>
  );
};

export default Home;
