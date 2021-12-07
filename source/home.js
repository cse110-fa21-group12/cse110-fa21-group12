//Search functionality
function search() {
  const searchWord = document.getElementsByClassName("search")[0].value;
  console.log(searchWord);

  fetch("/search/" + searchWord, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    });
}

//Search if the search button is clicked or if user hits enter
const searchButton = document.getElementsByClassName("fa fa-search")[0];
const searchText = document.getElementsByClassName("search")[0];

searchText.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    search();
  }
});

searchButton.addEventListener("click", function () {
  search;
});
