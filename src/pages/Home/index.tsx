import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar";
import PostCard from "../../components/PostCard";
import server from "../../api/server";

import { Post } from "../../models/Post";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>(() => []);
  const token = localStorage.getItem("accessToken");

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

  const postsEl = posts.map((post) => (
    <>
      <PostCard post={post} />
      <Divider />
    </>
  ));

  return (
    <div>
      <CustomAppBar title="home" />
      <div style={{ marginTop: "56px" }}>{postsEl}</div>
    </div>
  );
};

export default Home;
