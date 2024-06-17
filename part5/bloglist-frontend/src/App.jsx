import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  //const [newBlog, setNewBlog] = useState("");
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Please log in</h2>
        <Notification message={message} isError={messageIsError} />
        {loginForm()}
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
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
