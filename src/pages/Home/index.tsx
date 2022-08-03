import { useEffect } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import server from "../../api/server";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("acessToken");
    const getPosts = async () => {
      try {
        const response = await server.get("/feed", {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
      } catch (err) {
        alert(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <CustomAppBar title="home" />
      <h1 style={{ marginTop: "100px" }}>Feed</h1>
    </div>
  );
};

export default Home;
