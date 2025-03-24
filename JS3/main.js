document.getElementById("loadData").addEventListener("click", loadData);
document.getElementById("clearTable").addEventListener("click", clearTable);

function loadData() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const table = document.getElementById("dataTable");
      const tableBody = document.getElementById("tableBody");
      table.style.display = "table"; // Show the table
      tableBody.innerHTML = ""; // Clear existing data
      data.forEach((todo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${todo.userId}</td>
          <td>${todo.id}</td>
          <td>${todo.title}</td>
          <td style="color: ${todo.completed ? "green" : "red"};">
            ${todo.completed ? "Completed" : "Not yet Completed"}
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function clearTable() {
  const table = document.getElementById("dataTable");
  document.getElementById("tableBody").innerHTML = "";
  table.style.display = "none"; 
}
