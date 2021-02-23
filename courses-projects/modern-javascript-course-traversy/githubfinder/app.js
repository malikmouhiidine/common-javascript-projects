// init GitHub
const github = new GitHub();
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
      }
    });
  } else {
    //clear profile
  }
});
