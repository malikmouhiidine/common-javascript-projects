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
      } else {
        //show profile
        ui.showProfile(data.profile);
      }
    });
  } else {
    //clear profile
  }
});
