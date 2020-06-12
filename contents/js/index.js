
function addnote() {
    title = document.getElementById("title").value;
    note = document.getElementById("note").value;
    if (title && note) {
        console.log(title, note);
        temp = localStorage.getItem('QuickNotes');
        quickNotes = JSON.parse(temp);
        quickNotes.push([title, note]);
        localStorage.setItem('QuickNotes', JSON.stringify(quickNotes));
        document.getElementById("title").value = "";
        document.getElementById("note").value = "";
        showNotes();
    }
}

function deletenote(noteindex) {
    request = confirm("Are you sure, you want to delete ?");
    if (request) {
        temp = localStorage.getItem('QuickNotes');
        quickNotes = JSON.parse(temp);
        quickNotes.splice(noteindex, 1);
        localStorage.setItem('QuickNotes', JSON.stringify(quickNotes));
        showNotes();
    }
}

function showNotes() {
    thead = document.getElementById("thead");
    if (localStorage.getItem('QuickNotes') == null) {
        quickNotes = [];
        localStorage.setItem('QuickNotes', JSON.stringify(quickNotes));
    } else {
        temp = localStorage.getItem('QuickNotes');
        console.log(temp);
        if (temp == '[]') {
            console.log("table is empty");
            thead.innerHTML = "<p>You have no note.</p>";
        } else {
            thead.innerHTML =
                `<tr>
                <th scope="col">Sn No.</th>
                <th scope="col">Title</th>
                <th scope="col">Notess</th>
                <th scope="col">Actions</th>
                <th></th>
            </tr>`;
        }
        quickNotes = JSON.parse(temp);
    }
    var tableContent = document.getElementById("tbody");
    var row = "";
    quickNotes.forEach((element, index) => {
        row += `
      <tr>
        <td>${index + 1}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-info" onclick="editnote(${index})">Edit</button></td>
        <td><button class="btn btn-danger" onclick="deletenote(${index})">Delete</button></td>
      </tr>`;
    });
    tableContent.innerHTML = row;
}