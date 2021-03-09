import { http } from "./easyhttp";
import { ui } from "./UI";

// Get Posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// Add Post on post submit click btn
ui.postSubmit.addEventListener("click", addPost);
// listen for delete icon click
ui.posts.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    deletePost(e);
  }
});
// listen for edit state
ui.posts.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    enableEdit(e);
  }
});
// listen for cancel
ui.cardForm.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("post-cancel")) {
    cancelEdit(e);
  }
});

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((posts) => ui.showPosts(posts))
    .catch((err) => console.log(err));
}

function addPost() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const id = ui.idInput.value;
  const data = {
    title,
    body,
  };
  // Validate Input
  if (title === "" || body === "") {
    ui.showAlert("Please fill all fields", "alert alert-danger");
    return false;
  }
  // if create new post or edit an existing post
  if (id === "") {
    http
      .post("http://localhost:3000/posts", data)
      .then((data) => {
        ui.showAlert("Post Added Successfully", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch((err) => console.log(err));
  } else {
    http
      .put(`http://localhost:3000/posts/${id}`, data)
      .then((data) => {
        ui.showAlert("Post Edit Successfully", "alert alert-success");
        ui.changeFormState("add");
        getPosts();
      })
      .catch((err) => console.log(err));
  }
}

function deletePost(e) {
  const id = e.target.parentElement.dataset.id;
  if (
    confirm(
      `Are you sure you want to delete: "${
        e.target.parentElement.parentElement.querySelector("h4").textContent
      }"`
    )
  ) {
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then((data) => {
        ui.showAlert("Post Removed", "alert alert-success");
        getPosts();
      })
      .catch((err) => console.log(err));
  }
}

function enableEdit(e) {
  const id = e.target.parentElement.dataset.id;
  const title = e.target.parentElement.parentElement.querySelector("h4")
    .textContent;
  const body = e.target.parentElement.parentElement.querySelector("p")
    .textContent;

  const data = {
    id,
    title,
    body,
  };
  // Fill form with current post
  ui.fillForm(data);
}

function cancelEdit(e) {
  ui.changeFormState("add");
}
