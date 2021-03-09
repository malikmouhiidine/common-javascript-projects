class UI {
  constructor() {
    this.cardForm = document.querySelector(".card-form");
    this.posts = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formEnd = document.querySelector(".form-end");
    this.formState = "add";
  }
  showPosts(posts) {
    let html = "";
    posts.forEach((post) => {
      html += `<div class="card mb-3">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.body}</p>
                <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
                <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
            </div>
          </div>`;
    });
    this.posts.innerHTML = html;
  }
  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".postsContainer");
    const posts = document.querySelector("#posts");
    container.insertBefore(div, posts);
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  clearAlert() {
    const currAlert = document.querySelector(".alert");
    currAlert.remove();
  }
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
  fillForm(post) {
    this.titleInput.value = post.title;
    this.bodyInput.value = post.body;
    this.idInput.value = post.id;

    this.changeFormState("edit");
  }
  clearIdInput() {
    this.idInput.value = "";
  }
  changeFormState(state) {
    this.formState = state;
    if (state === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));
      this.cardForm.insertBefore(button, this.formEnd);
    } else {
      this.postSubmit.textContent = "Post it";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();
