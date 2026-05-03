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

          try{
               searchButton.textContent = "Searching...";
               searchButton.disabled = true;

               const proxyUrl = "https://cors-anywhere.herokuapp.com/";
               const targetUrl = "https://leetcode.com/graphql";
               const myHeaders = new Headers();
               myHeaders.append("Content-Type", "application/json");

               const graphql = JSON.stringify({
                    query: "\n    query userSessionProgress($username: STring!) {\n allQuestionsCount {\n difficualty\n count\n }\n matchedUser(username: $username) {\n username\n submitStats {\n acSubmissionNum {\n difficulty\n count\n submissions\n }\n }\n }\n }\n    ",
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
               statsContainer.innerHTML = "<p>No data found</p>";
          }
          finally{
               searchButton.textContent = "Search";
               searchButton.disabled = false;
          }
     }

     function displayUserData(parsedData) {
          const totalQues = parsedData.data.allQuestionCount[0].count;
          const totalEasyQues = parsedData.data.allQuestionCount[1].count;
          const totalMediumQues = parsedData.data.allQuestionCount[2].count;
          const totalHardQues = parsedData.data.allQuestionCount[3].count;

          const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
          const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
          const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
          const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;
     }

     searchButton.addEventListener("click", function() {
          const username = usernameInput.value;
          if(validateUsername(username)) {
               fetchUserDetails(username);
          }
     })

})