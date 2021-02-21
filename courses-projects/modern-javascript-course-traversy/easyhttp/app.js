const http = new easyHTTP();

// GET posts
http.get("http://jsonplaceholder.typicode.com/posts/", function (err, posts) {
  if (err) {
    console.log(err);
  } else {
    console.log(posts);
  }
});

// POST a post
const data = {
  title: "Custom post",
  body: "this is a costume post",
};

http.post(
  "http://jsonplaceholder.typicode.com/posts/",
  data,
  function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
    }
  }
);

// PUT(update) a post
http.put(
  "http://jsonplaceholder.typicode.com/posts/1",
  data,
  function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
    }
  }
);

// DELETE a post
http.delete(
  "http://jsonplaceholder.typicode.com/posts/20",
  function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      console.log(posts);
    }
  }
);
