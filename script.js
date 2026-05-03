document.addEventListener("DOMContentLoaded", function() {

     // grabbing all the needed elements
     const searchButton = document.getElementById("search-btn");
     const usernameInput = document.getElementById("username-input");
     const statsContainer = document.querySelector(".stats-container"); 
     const easyProgressCircle = document.querySelector(".easy-progress");
     const mediumProgressCircle = document.querySelector(".medium-progress");
     const hardProgressCircle = document.querySelector(".hard-progress");
     const easyLabel = document.getElementById("easy-label"); 
     const mediumLabel = document.getElementById("medium-label"); 
     const hardLabel = document.getElementById("hard-label"); 
     const cardStatsConatainer = document.querySelector(".stats-cards");

     // basic check to ensure user didn't enter gibberish
     function validateUsername(username) {
          if(username.trim() === "") {
               alert("Please enter a valid username.");
               return false;
          }
          const regex = /^[a-zA-Z0-9_-]{1,15}$/;
          const isMatching = regex.test(username);
          if(!isMatching) {
               alert("Username can only contain letters, numbers, underscores, and hyphens, and must be between 1 and 15 characters long.");
          }
          return isMatching;
     }

     // fetch the actual data
     async function fetchUserDetails(username) {
          try{
               searchButton.textContent = "Searching...";
               searchButton.disabled = true;
               statsContainer.style.setProperty("display", "none");

               const proxyUrl = "https://cors-anywhere.herokuapp.com/";
               const targetUrl = "https://leetcode.com/graphql";
               const myHeaders = new Headers();
               myHeaders.append("Content-Type", "application/json");

               // query payload (fixed totalSubmissionNum missing error)
               const graphql = JSON.stringify({
                    query: "\n    query userSessionProgress($username: String!) {\n allQuestionsCount {\n difficulty\n count\n }\n matchedUser(username: $username) {\n username\n submitStats {\n acSubmissionNum {\n difficulty\n count\n submissions\n }\n totalSubmissionNum {\n difficulty\n count\n submissions\n }\n }\n }\n }\n    ",
                    variables: {"username": `${username}`}
               })
               
               const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: graphql,
                    redirect: "follow"
               };

               const response = await fetch(proxyUrl+targetUrl, requestOptions);

               if(!response.ok) {
                    throw new Error("User not found");
               }
               const parsedData = await response.json();
               console.log("Logging data: ", parsedData);

               displayUserData(parsedData);
          }
          catch(error) {
               statsContainer.innerHTML = `<p>${error.message}</p>`;
               statsContainer.style.setProperty("display", "block");
          }
          finally{
               searchButton.textContent = "Search";
               searchButton.disabled = false;
          }
     }

     // handle the css circle updates
     function updateProgress(solved, total, label, circle){
          const progressDegree = total > 0 ? (solved / total) * 100 : 0;
          circle.style.setProperty("--progress-degree", `${progressDegree}%`);
          label.textContent = `${solved}/${total}`;
     }

     // display everything on the DOM
     function displayUserData(parsedData) {
          statsContainer.style.setProperty("display", "block");

          const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
          const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
          const totalHardQues = parsedData.data.allQuestionsCount[3].count;

          const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
          const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
          const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

          updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
          updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
          updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

          const cardData = [
               {label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
               {label: "Overall Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
               {label: "Overall Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
               {label: "Overall Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions},
          ];

          console.log("Card data: ", cardData);

          // render out the bottom cards
          cardStatsConatainer.innerHTML = cardData.map(
               data => 
                    `<div class="card">
                         <h4>${data.label}</h4>
                         <p>${data.value}</p>
                    </div>`
               ).join("");
     }

     searchButton.addEventListener("click", function() {
          const username = usernameInput.value;
          if(validateUsername(username)) {
               fetchUserDetails(username);
          }
     })

})