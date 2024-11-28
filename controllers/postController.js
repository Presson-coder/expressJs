let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
];

// @dec Get all posts
// route GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = req.query.limit;
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc Get single post
// @route GET /api/posts/:id
export const getPost = (req, res, next) => {
  const postId = req.params.id;
  const requestedPost = posts.find((post) => post.id === parseInt(postId));
  if (!requestedPost) {
    const error = new Error(`post with id ${postId} was not found`);
    error.status = 404;
    return next(error);
  }
  return res.status(200).json(requestedPost);
};

// @desc Create new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  const newArray = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!req.body.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }
  posts.push(newArray);
  res.status(201).json(posts);
};

// @desc Update post
// @route PATCH /api/posts/:id
export const updatePost = (req, res, next) => {
  const postId = parseInt(req.params.id);
  const postToUpdate = posts.find((post) => post.id === postId);

  if (!postToUpdate) {
    const error = new Error(`post with id ${postId} was not found`);
    error.status = 404;
    return next(error);
  }
  postToUpdate.title = req.body.title;
  res.status(200).json(posts);
};

// @desc Delete new post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const postId = parseInt(req.params.id);
  const postToUpdate = posts.find((post) => post.id === postId);

  if (!postToUpdate) {
    const error = new Error(`post with id ${postId} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== postId);
  res.status(200).json(posts);
};
