const http = new easyHTTP();

// GET users
http
  .get("http://jsonplaceholder.typicode.com/users/")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

const data = {
  name: "Malik Mouhiidine",
  username: "malikmou",
  email: "malik@mou.com",
};
// POST a user
http
  .post("http://jsonplaceholder.typicode.com/users/", data)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// PUT(update) a user
http
  .put("http://jsonplaceholder.typicode.com/users/2", data)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// DELETE a user
http
  .delete("http://jsonplaceholder.typicode.com/posts/20")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
