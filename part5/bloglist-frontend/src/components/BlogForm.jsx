const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input type="text" name="title" onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input type="text" name="author" onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input type="text" name="url" onChange={handleUrlChange} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
