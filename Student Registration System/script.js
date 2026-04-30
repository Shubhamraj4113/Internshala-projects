const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Load existing data
renderTable();

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  // Validation
  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain only letters");
    return;
  }

  if (!/^\d+$/.test(id)) {
    alert("Student ID must be numeric");
    return;
  }

  if (!/^\d{10,}$/.test(contact)) {
    alert("Contact must be at least 10 digits");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Invalid email");
    return;
  }

  const student = { name, id, email, contact };

  if (editIndex === "") {
    students.push(student);
  } else {
    students[editIndex] = student;
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("students", JSON.stringify(students));

  form.reset();
  renderTable();
});

// Render Table
function renderTable() {
  table.innerHTML = "";

  students.forEach((s, index) => {
    const row = `
      <tr>
        <td>${s.name}</td>
        <td>${s.id}</td>
        <td>${s.email}</td>
        <td>${s.contact}</td>
        <td>
          <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Edit
function editStudent(index) {
  const s = students[index];

  document.getElementById("name").value = s.name;
  document.getElementById("studentId").value = s.id;
  document.getElementById("email").value = s.email;
  document.getElementById("contact").value = s.contact;

  document.getElementById("editIndex").value = index;
}

// Delete
function deleteStudent(index) {
  if (confirm("Are you sure?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}