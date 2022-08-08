import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Divider, TextField, Paper, Button } from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar";
import PostCard from "../../components/PostCard";
import "./index.css";

import server from "../../api/server";
import { Post } from "../../models/Post";

const PostDetail = () => {
  const { postId } = useParams();
  const token = localStorage.getItem("accessToken");
  const [post, setPost] = useState<Post>();
  const [comment, setComment] = useState({ value: "", error: "" });

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await server.get(`/posts/${postId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
        console.log(response.data);
      } catch (err) {
        alert(err);
      }
    };
    getPost();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await server.post(
        `/posts/${postId}/comments`,
        { description: comment.value },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setComment({ ...comment, value: "" });
      post?.comments.push(response.data);
      setPost(post)
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <CustomAppBar title="Post" />
      <div style={{ marginTop: 64 }}>
        {post && <PostCard post={post} handlePostClick={() => {}} />}
      </div>
      <Divider />
      <Paper elevation={0} sx={{ marginX: 24, marginTop: 2 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="standard-basic"
            label="comentário"
            variant="standard"
            multiline
            fullWidth
            value={comment.value}
            onChange={(e) => setComment({ value: e.target.value, error: "" })}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
              Publicar
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default PostDetail;
