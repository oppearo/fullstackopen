import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageIsError, setMessageIsError] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedBlogApiUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login attempted with ", username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogApiUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setMessageIsError(true);
      setMessage(`${e.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 8000);
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    console.log(blogObject);
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} was added`,
        );
        setBlogTitle("");
        setBlogAuthor("");
        setBlogUrl("");
        setTimeout(() => {
          setMessage(null);
        }, 8000);
      });
    } catch (e) {
      setMessageIsError(true);
      setMessage(`${e.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 8000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} isError={messageIsError} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isError={messageIsError} />
      <p>
        {`${user.name} logged in`}
        <button
          type="submit"
          onClick={() => {
            window.localStorage.removeItem("loggedBlogApiUser");
            window.location.reload();
          }}
        >
          logout
        </button>
      </p>
      <BlogForm
        handleSubmit={addBlog}
        handleTitleChange={({ target }) => setBlogTitle(target.value)}
        handleUrlChange={({ target }) => setBlogUrl(target.value)}
        handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
