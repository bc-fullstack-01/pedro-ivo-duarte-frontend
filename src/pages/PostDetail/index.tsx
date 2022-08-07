import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import server from "../../api/server";

const PostDetail = () => {
  const { postId } = useParams();
  const token = localStorage.getItem("accessToken");
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await server.get(`/posts/${postId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
        console.log(response);
      } catch (err) {
        alert(err);
      }
    };
    getPost();
  }, []);
  return (
    <div>
      <h1>Post Detail</h1>
      <h4></h4>
    </div>
  );
};

export default PostDetail;
