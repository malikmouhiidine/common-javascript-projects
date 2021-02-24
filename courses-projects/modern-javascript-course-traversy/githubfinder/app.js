// init GitHub, UI
const github = new GitHub();
const ui = new UI();
// Search input
const searchUser = document.getElementById("searchUser");
// Search input Event listener
searchUser.addEventListener("keyup", (e) => {
  const searchText = searchUser.value;
  if (searchText !== "") {
    github.getUser(searchText).then((data) => {
      if (data.profile.message === "Not Found") {
        //show alert
        ui.showAlert("User not Found", "alert alert-danger");
      } else {
        //show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    //clear profile
    ui.clearProfile();
  }
});
