const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    // remove active class from all panels
    panels.forEach((panel) => {
      panel.classList.remove("active");
    });
    // add active class to current clicked panel
    panel.classList.add("active");
  });
});
