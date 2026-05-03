document.addEventListener("DOMContentLoaded", function() {

     const searchButton = document.getElementById("search-btn");
     const usernamoeInput = document.getElementById("username-input");
     const statsContainer = document.querySelector("stats-container");
     const easyProgressCircle = document.querySelector(".easy-progress");
     const mediumProgressCircle = document.querySelector(".medium-progress");
     const hardProgressCircle = document.querySelector(".hard-progress");
     const easyLabel = document.getElementById(".easy-label");
     const mediumLabel = document.getElementById(".medium-label");
     const hardLabel = document.getElementById(".hard-label");
     const cardStatsConatainer = document.querySelector(".stats-cards")

     function validateUsername(username) {
          if(username.trim() === "") {
               alert("Please enter a valid username.");
               return false;
          }
          const regex = /^[a-zA-Z0-9_-]{1,15}/;
          const isMatching = regex.test(username);
          if(!isMatching) {
               alert("Username can only contain letters, numbers, underscores, and hyphens, and must be between 1 and 15 characters long.");
          }
          return isMatching;
     }

     async function fetchUserDetails(username) {
          const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
          try{
               searchButton.textContent = "Searching...";
               searchButton.disabled = true;

               const response = await fetch(url);
               if(!response.ok) {
                    throw new Error("User not found");
               }
               const data = await response.json();
               console.log("Logging data: ", data);
          }
          catch(error) {
               statsContainer.innerHTML = "<p>No data found</p>";
          }
          finally{
               searchButton.textContent = "Search";
               searchButton.disabled = false;
          }
     }

     searchButton.addEventListener("click", function() {
          const username = usernameInput.value;
          if(validateUsername(username)) {
               fetchUserDetails(username);
          }
     })

})