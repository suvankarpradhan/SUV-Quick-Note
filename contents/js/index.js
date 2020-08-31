function addnote() {
    title = document.getElementById("title").value;
    note = document.getElementById("note").value;
    if (title && note) {
        temp = localStorage.getItem('QuickNotes');
        quickNotes = JSON.parse(temp);
        quickNotes.push([title, note]);
        localStorage.setItem('QuickNotes', JSON.stringify(quickNotes));
        document.getElementById("title").value = "";
        document.getElementById("note").value = "";
        showNotes();
    }
}

function opennote(noteindex) {
    temp = localStorage.getItem('QuickNotes');
    quickNotes = JSON.parse(temp);
    document.getElementById("open").value = quickNotes[noteindex][1];
    $('#showModal').modal("show");
}

function editnote(noteindex) {
    temp = localStorage.getItem('QuickNotes');
    quickNotes = JSON.parse(temp);
    document.getElementById("index").value = noteindex;
    document.getElementById("updatetitle").value = quickNotes[noteindex][0];
    document.getElementById("updatenote").value = quickNotes[noteindex][1];
    $('#editModal').modal("show");
}

function update() {
    noteindex = document.getElementById("index").value;
    updatetitle = document.getElementById("updatetitle").value;
    updatenote = document.getElementById("updatenote").value;
    if (updatetitle && updatenote) {
        temp = localStorage.getItem('QuickNotes');
        quickNotes = JSON.parse(temp);
        quickNotes[noteindex][0] = updatetitle;
        quickNotes[noteindex][1] = updatenote;
        localStorage.setItem('QuickNotes', JSON.stringify(quickNotes));
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
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
        var d = new Date();
        document.getElementById("time").innerHTML = d.toLocaleTimeString();
        document.getElementById("date").innerHTML = d.toDateString();
    }

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
                <th scope="col">Actions</th>
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
        <td><div class="btn-group" role="group"><button class="btn btn-info" onclick="opennote(${index})">Open</button>
        <button class="btn btn-warning" onclick="editnote(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deletenote(${index})">Delete</button></div></td>
      </tr>`;
    });
    tableContent.innerHTML = row;
}

function searchnote() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}