import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Navbar, Container } from "react-bootstrap";
import ViewArticle from "./ViewArticle";

function Home() {
  const [articles, setArticles] = useState(null);
  const [removeUser, setRemoveUser] = useState(
    localStorage.getItem("userName")
  );
  const navigate = useNavigate();

  async function getBlogs() {
    const response = await fetch("http://localhost:6200/ViewArticle");
    const responseObj = await response.json();
    console.log(responseObj);
    setArticles(responseObj);
  }

  useEffect(() => {
    if (removeUser == null) {
      navigate("/login");
    } else {
      getBlogs();
    }
  }, [removeUser, navigate]);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userName");
    setRemoveUser(null);
  }

  return (
    <>
      {localStorage.getItem("userName") !== null && articles !== null ? (
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
              text={article.body}
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
