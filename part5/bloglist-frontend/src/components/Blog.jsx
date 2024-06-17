import { useState } from "react";

const Blog = ({ blog }) => {
  const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const hideWhenVisible = { display: additionalInfoVisible ? "none" : "" };
  const showWhenVisible = { display: additionalInfoVisible ? "" : "none" };

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <div style={hideWhenVisible}>
        {" "}
        <button onClick={() => setAdditionalInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <p>
          {" "}
          {blog.likes} <button>like</button>{" "}
        </p>
        {blog.user.name}
        <button onClick={() => setAdditionalInfoVisible(false)}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
