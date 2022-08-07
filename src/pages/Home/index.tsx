import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider } from "@mui/material";

import CustomAppBar from "../../components/CustomAppBar";
import PostCard from "../../components/PostCard";
import server from "../../api/server";
import { Post } from "../../models/Post";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState<Post[]>(() => []);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasmore] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect");
    const getPosts = async () => {
      try {
        const response = await server.get(`/feed?page=${page}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setHasmore(response.data.length > 0);
        setPosts([...posts, ...response.data]);
      } catch (err) {
        alert(err);
      }
    };
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page]);

  const loadMorePosts = async () => {
    console.log("more!", page);
    setPage((prevPage) => prevPage + 1);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const postsEl = posts.map((post) => (
    <>
      <PostCard key={post._id} post={post} handlePostClick={handlePostClick} />
      <Divider />
    </>
  ));

  return (
    <div>
      <CustomAppBar title="home" />
      <div style={{ marginTop: "56px" }}>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {postsEl}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
