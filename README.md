# LeetMatrix 🚀

LeetMatrix is a sleek, responsive web application designed to track and visualize your LeetCode profile statistics. Simply enter a LeetCode username to instantly view progress on Easy, Medium, and Hard questions, along with overall submission data, presented in beautiful, dynamic circular progress bars.

## ✨ Features

*   **Real-Time Data:** Fetches up-to-date user statistics directly from LeetCode.
*   **Visual Progress:** Dynamic, CSS-powered circular progress bars that update based on the user's solved questions.
*   **Detailed Stats:** Displays total submissions categorized by difficulty (Overall, Easy, Medium, Hard).
*   **Responsive Design:** Fully optimized for both desktop and mobile devices.
*   **Modern UI:** Features a clean, dark-themed gradient interface with an intuitive user experience.

## 🛠️ Technologies Used

*   **HTML5:** Semantic structure.
*   **CSS3:** Flexbox, media queries, CSS variables, and conic-gradients for the progress rings.
*   **Vanilla JavaScript:** DOM manipulation, Async/Await, and Fetch API.
*   **API:** LeetCode GraphQL API (routed through a CORS proxy).

## 🚀 Getting Started

Since this is a frontend-only project built with vanilla web technologies, no installation or build steps are required!

### Prerequisites
*   A modern web browser (Chrome, Firefox, Safari, Edge).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/LeetMatrix.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd LeetMatrix
    ```
3.  Open the `index.html` file in your preferred web browser.

## ⚠️ Important Note Regarding the API

This project fetches data from the official LeetCode GraphQL API. Because LeetCode does not support CORS (Cross-Origin Resource Sharing) directly from browsers, this project uses `cors-anywhere` as a proxy. 

**If the app gets stuck on "Searching..." or throws an error:**
1. Navigate to `[https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/)` in your browser.
2. Click the button that says **"Request temporary access to the demo server"**.
3. Come back to LeetMatrix and search again!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
mail - anupkrmi11122006@gmail.com
linkedIn - www.linkedin.com/in/anup-kumar-mishra337b

## 📝 License

This project is open-source.
