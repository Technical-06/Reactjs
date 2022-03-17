import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Navbar, Container } from "react-bootstrap";
import ViewArticle from "./ViewArticle";

function Home({ jwtToken, setJwtToken }) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(null);
  const [removeToken, setRemoveToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (removeToken == null) {
      navigate("/login");
    } else {
      axios
        .get("/users/viewarticles", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setArticles(res.data));
    }
  }, [removeToken, navigate]);
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setRemoveToken(null);
  }

  return (
    <>
      {localStorage.getItem("token") !== null && articles !== null ? (
        <>
          <nav>
            <div>
              <div>
                <h1 href="/">Quantiphi-Blogs</h1>
              </div>
              <div>
                <p>Welcome {localStorage.getItem("userName")}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </nav>
          {articles.map((article, index) => (
            <ViewArticle
              key={index}
              title={article.title}
              text={article.text}
              author={article.author}
            />
          ))}
        </>
      ) : (
        <Link to="/login">
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <h1>Please Sign in</h1>
          </div>
        </Link>
      )}
    </>
  );
}

export default Home;
