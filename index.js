const subjectInput = document.getElementById("subjectInput");
const searching = document.getElementById("searching");
const results = document.getElementById("results");

searching.addEventListener("click", () => {
  const subject = subjectInput.value.trim();

  results.innerHTML = "<li> Loading Resources </li>";
  if (subject === "") {
    alert("Please enter a subject to search for resources.");
    return;
  }
  const resources = {
    title: subject + " Notes",
    subject: subject,
  };
  fetch("http://localhost:5001/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resources),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      subjectInput.value = "";
      loadingResources();
    })
    .catch((err) => {
      console.log(err);
      alert("server not responding")
    });
});

function loadingResources() {
  fetch("http://localhost:5001/resources")
    .then((res) => res.json())
    .then((data) => {
      results.innerHTML = "";

      if (data.length === 0) {
        results.innerHTML = "<li> No resources added yet. </li>";
        return;
      }

      data.forEach((item) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.title}</strong><br>
            subject: ${item.subject}<br>
            Added: ${item.time}`;

        results.appendChild(li);
      });
    })
    .catch((err) => console.log(err));
}
loadingResources();