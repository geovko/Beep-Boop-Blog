const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const content = document.querySelector("#comment-content").value.trim();

  const btnId = event.target.querySelector(`button[type="submit"]`);

  if (content) {
    // Send a POST request to the API endpoint
    if (btnId.hasAttribute("data-id")) {
      const id = btnId.getAttribute("data-id");

      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If successful, refresh the page
        document.location.replace(`/posts/${id}`);
      } else {
        alert(response.statusText);
      }
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
