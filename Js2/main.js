let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = null;

// Load records on page load
window.onload = () => {
    displayRecords();
};

// Insert new record
function insertRecord() {
    let firstName = document.getElementById("firstName").value.trim();
    let middleName = document.getElementById("middleName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let age = document.getElementById("age").value.trim();

    if (!firstName || !lastName || !age) {
        alert("Please fill out all required fields.");
        return;
    }

    if (editIndex !== null) {
        records[editIndex] = { firstName, middleName, lastName, age: parseInt(age) };
        editIndex = null;
    } else {
        records.push({ firstName, middleName, lastName, age: parseInt(age) });
    }

    saveToLocalStorage();
    clearFields();
    displayRecords();
}

// Display records and sort automatically
function displayRecords() {
    let table = document.getElementById("recordTable");
    table.innerHTML = "";

    let category = document.getElementById("sortCategory").value;
    let order = document.getElementById("sortOrder").value;

    if (category && order) {
        records.sort((a, b) => {
            if (category === "age") {
                return order === "asc" ? a.age - b.age : b.age - a.age;
            } else {
                return order === "asc"
                    ? a[category].localeCompare(b[category])
                    : b[category].localeCompare(a[category]);
            }
        });
    }

    records.forEach((record, index) => {
        let row = table.insertRow();
        row.insertCell(0).textContent = record.firstName;
        row.insertCell(1).textContent = record.middleName;
        row.insertCell(2).textContent = record.lastName;
        row.insertCell(3).textContent = record.age;

        let actionCell = row.insertCell(4);
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteRecord(index);
        actionCell.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editRecord(index);
        actionCell.appendChild(editBtn);
    });
}

// Clear input fields
function clearFields() {
    document.getElementById("firstName").value = "";
    document.getElementById("middleName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
}

// Delete a record
function deleteRecord(index) {
    records.splice(index, 1);
    saveToLocalStorage();
    displayRecords();
}

// Edit a record
function editRecord(index) {
    let record = records[index];
    document.getElementById("firstName").value = record.firstName;
    document.getElementById("middleName").value = record.middleName;
    document.getElementById("lastName").value = record.lastName;
    document.getElementById("age").value = record.age;

    editIndex = index;
}

// Clear all records
function clearRecords() {
    if (confirm("Are you sure you want to clear all records?")) {
        records = [];
        saveToLocalStorage();
        displayRecords();
    }
}

// Save to local storage
function saveToLocalStorage() {
    localStorage.setItem("records", JSON.stringify(records));

    let message = document.getElementById("saveMessage");
    message.textContent = "Data saved successfully!";

    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}

// Automatically sort when dropdown changes
document.getElementById("sortCategory").onchange = displayRecords;
document.getElementById("sortOrder").onchange = displayRecords;
