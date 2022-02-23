let tempData;
let checkbox = false;
let chosenStudentId = null;
let runFirst = false;
$(document).ready(function(){
    if(runFirst===false){
        $.getJSON("data.json", function(data){
            tempData=data;
            tempData.forEach(
                element=>{
                    $("tbody").append(  '<tr>'+
                        '<td><input type="checkbox" id=" '+ element.id +  ' " name="edit" ></td>'+
                        '<td>'+element.id+ '</td>'+
                        '<td>'+element.name+ '</td>'+
                        '<td>'+element.birthday + '</td>'+
                        '<td>'+element.phone + '</td>'+
                        '<td>'+ element.hometown + '</td>'+
                        '</tr>')
                }
            );
        })
            .fail(function(){
                console.log("An error has occurred.");
            });
        runFirst=true;
    }


    const countChecked = () => {
        let count = 0;
        for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
            if (checkbox.checked === true) {
                count++;
            }
        }
        return count;
    }
    $('table').change(
        function () {
            let count = countChecked();
            console.log(count)
            checkbox=true;
            if (count === 0) {
                $("#edit").prop('disabled', true);
                $("#delete").prop('disabled', true);
            } else {
                $("#edit").prop('disabled', false);
                $("#delete").prop('disabled', false);
            }
        });

    document.querySelector('form').addEventListener('submit', (e) => {
        const data = Object.fromEntries(new FormData(e.target).entries());
        data.id =tempData.length +1;
        tempData.push(data);
        if(checkbox===false){
            $("tbody").append(  '<tr>'+
                '<td><input type="checkbox" id= "'+ data.id +  '" name="edit" ></td>'+
                '<td>'+data.id+ '</td>'+
                '<td>'+data.name+ '</td>'+
                '<td>'+data.birthday + '</td>'+
                '<td>'+data.phone + '</td>'+
                '<td>'+ data.hometown + '</td>'+
                '</tr>')
        }else{
            var row = $("input[type=checkbox]:checked").closest("tr")[0];
            row.cells[1].innerHTML = data.name;
            row.cells[2].innerHTML = data.birthday;
            row.cells[3].innerHTML = data.phone;
            row.cells[4].innerHTML = data.hometown;
            $("input[type=checkbox]:checked").prop("checked", false);
            alert("đã sửa sinh viên")
            var student = { "name": $("#name").val(), "birthday": $("#birthday").val(), "phone": $("#phone").val(), "hometown": $("#hometown").val() }
            data[currentId] = student;
            console.log(currentId);
            console.log(data.toString);
            currentId = null;
            resetStudentForm();
        }

    });



    $("#edit").click(function () {
        let count = countChecked();
        if (count > 1) {
            alert("chỉ được chọn 1 học sinh ")
        } else {
            $("Table input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                chosenStudentId = $(this).attr("id");
                $("#name").val(row.cells[1].innerHTML);
                $("#birthday").val(row.cells[2].innerHTML);
                $("#mobile-phone").val(row.cells[3].innerHTML);
                $("#hometown").val(row.cells[4].innerHTML);
            });
        }
    });
    })




function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var phone = document.forms["myForm"]["phone"].value;
    var birthday = document.forms["myForm"]["birthday"].value;
    var hometown = document.forms["myForm"]["hometown"].value;
    if (name == "" || name == null) {
        alert("Name must be filled out");
        return false;
    }else if (phone == "" || phone == null ){
        alert("Phone must be filled out");
        return  false;
    }
    else if (birthday ==  "" || birthday == null ){
        alert("Birthday must be filled out");
        return  false;
    }
    else if (hometown ==  "" || hometown == null ){
        alert("Hometown must be filled out");
        return  false;
    }

}

function deleteStudent() {}

    function resetStudentForm(){
        $('#f-name').val("")
        $('#f-birthday').val("")
        $('#f-mobile-phone').val("")
        $('#f-hometown').val("")
}
