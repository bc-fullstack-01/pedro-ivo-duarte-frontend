import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Divider, TextField, Paper, Button, CardHeader } from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar";
import PostCard from "../../components/PostCard";
import CustomAvatar from "../../components/CustomAvatar";

import server from "../../api/server";
import { Post } from "../../models/Post";

const PostDetail = () => {
  const { postId } = useParams();
  const token = localStorage.getItem("accessToken");
  const profileId = localStorage.getItem('profile')
  const profileName = localStorage.getItem("user")
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
        console.log("Post", response.data);
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
      const newComment = {
        ...response.data,
        profile: {
          _id: profileId,
          name: profileName
        }
      }
      post?.comments.push(newComment);
      setPost(post);
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
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
              Publicar
            </Button>
          </div>
        </form>
      </Paper>
      <Divider sx={{ marginTop: 2 }} />
      {post?.comments &&
        post?.comments.map((comment) => (
          <div key={comment._id}>
            <Paper elevation={0} sx={{ marginX: 24, marginY: 2 }}>
              <CardHeader
                avatar={<CustomAvatar profileName={comment.profile.name} />}
                title={comment.description}
              />
            </Paper>
            <Divider />
          </div>
        ))}
    </div>
  );
};

export default PostDetail;
