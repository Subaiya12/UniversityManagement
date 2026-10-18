
const studentForm = document.getElementById("studentForm");

const studentId = document.getElementById("studentId");

const studentName = document.getElementById("studentName");
const department = document.getElementById("department");
const semester = document.getElementById("semester");
const searchBox = document.getElementById("search");
const studentTable = document.getElementById("studentTable");
let students = JSON.parse(localStorage.getItem("students")) || [];
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const id = studentId.value.trim();
    const name = studentName.value.trim();
    const dept = department.value;
    const sem = semester.value;
    if (id === "" || name === "" || dept === "" || sem === "") {
        alert("Please fill in all fields.");
        return;
    }
    const alreadyExists = students.some(function(student) {

        return student.id === id;

    });
    if (alreadyExists) {

        alert("Student ID already exists.");
        return;
    }
    const student = {

        id: id,
        name: name,
        department: dept,
        semester: sem

    };
    students.push(student);
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    displayStudents(students);
    studentForm.reset();

});
function displayStudents(studentList) {
    studentTable.innerHTML = "";
    if (studentList.length === 0) {

        studentTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }
    studentList.forEach(function(student) {

        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.semester}</td>

            <td>
                <button class="delete-btn">
                    Delete
                </button>
            </td>
        `;
        const deleteButton = row.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to delete this student?"
            );


            if (confirmDelete) {
                students = students.filter(function(s) {

                    return s.id !== student.id;

                });


                localStorage.setItem(
                    "students",
                    JSON.stringify(students)
                );


                displayStudents(students);

            }

        });


        
        studentTable.appendChild(row);

    });

}



searchBox.addEventListener("input", function() {

    
    const searchText = searchBox.value.toLowerCase().trim();


    // Find matching students
    const filteredStudents = students.filter(function(student) {

        return (

            student.id.toLowerCase().includes(searchText) ||

            student.name.toLowerCase().includes(searchText)

        );

    });


    // Display search results
    displayStudents(filteredStudents);

});


// Display saved students when page loads
displayStudents(students);
