const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const content = document.querySelector("#comment-content").value.trim();
  console.log(content);

  console.log(event.target);

  if (content) {
    // Send a POST request to the API endpoint
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      console.log("Comment being created");
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
      });

      console.log("Comment Input:");
      console.log(response);

      if (response.ok) {
        // If successful, refresh the page
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
