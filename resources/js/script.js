let tempData;
let checkbox = false;
let chosenStudentId = null;
let runFirst = false;
let editChecked = false;


$(document).ready(function(){
    if(runFirst===false){
        $.getJSON("data.json", function(data){
            tempData=data;
            tempData.forEach(
                element=>{
                    $("tbody").append(  '<tr id="'+element.id+'">'+
                        '<td><input type="checkbox" id=" '+ element.id +  ' " name="edit" ></td>'+
                        '<td class="id">'+element.id+ '</td>'+
                        '<td class="name" >'+element.name+ '</tdcla>'+
                        '<td class="birthday">'+element.birthday + '</td>'+
                        '<td class="phone">'+element.phone + '</td>'+
                        '<td class=hometown>'+ element.hometown + '</td>'+
                        '</tr>')
                }
            );
        })
            .fail(function(){
                console.log("An error has occurred.");
            });
        runFirst=true;
    }
    $('table').change(
        function () {
            let count = countChecked();
            console.log(count);
            checkbox=true;
            if (count === 0 || count>=2) {
                $("#edit").prop('disabled', true);
                $("#delete").prop('disabled', true);
            } else {
                console.log("run count")
                $("#edit").prop('disabled', false);
                $("#delete").prop('disabled', false);
            }
        });

    $("#save").click(function () {
        let id = tempData.length + 1;
        let name = $("#f-name").val();
        let birthday = $("#f-birthday").val();
        let mobile = $("#f-mobile-phone").val();
        let hometown = $("#f-hometown").val();
        let student = {id, name, birthday, mobile, hometown};
        if(editChecked){
            var baseRow=$("input[type=checkbox]:checked");
            var row = baseRow.closest("tr")[0];
            row.cells[2].innerHTML = $("#f-name").val();
            row.cells[3].innerHTML = $("#f-birthday").val();
            row.cells[4].innerHTML = $("#f-mobile-phone").val();
            row.cells[5].innerHTML = $("#f-hometown").val();
            baseRow.prop("checked", false);
            alert("đã sửa sinh viên")
            tempData[chosenStudentId] = student;
            chosenStudentId = null;
            resetStudentForm();
            editChecked=false;

        }else {
            $("tbody").append(  '<tr id="'+ id +'">'+
                '<td><input type="checkbox" id=" '+ id+  ' " name="edit" ></td>'+
                '<td>'+ id  + '</td>'+
                '<td>'+ name+ '</td>'+
                '<td>'+ birthday + '</td>'+
                '<td>'+ mobile + '</td>'+
                '<td>'+ hometown + '</td>'+
                '</tr>')
            tempData.push(student);
        }
    })
    $("#edit").click(function () {
        let count = countChecked();
        if (count > 1) {
            alert("chỉ được chọn 1 học sinh ")

        } else {
            $("Table input[type=checkbox]:checked").each(function () {
                editChecked=true;
                var row = $(this).closest("tr")[0];
                chosenStudentId = $(this).attr("id");
                $("#f-name").val(row.cells[2].innerHTML);
                $("#f-birthday").val(row.cells[3].innerHTML);
                $("#f-mobile-phone").val(row.cells[4].innerHTML);
                $("#f-hometown").val(row.cells[5].innerHTML);
            });
        }
    });

    $("#delete").click( function () {
        let count = countChecked();
        if (count > 1) {
            alert("chỉ được chọn 1 học sinh ")
        } else {
            $("Table input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                chosenStudentId = $(this).attr("id");
                row.remove();
                tempData.splice(chosenStudentId,1);
                tempData.forEach(
                    element=>{
                    console.log(element.name);
                    }
                );
            });
        }
    });
    })


function validateForm() {
    let name = document.forms["myForm"]["name"].value;
    let phone = document.forms["myForm"]["phone"].value;
    let birthday = document.forms["myForm"]["birthday"].value;
    let hometown = document.forms["myForm"]["hometown"].value;
    if (name === "" || name == null) {
        alert("Name must be filled out");
        return false;
    }else if (phone === "" || phone == null ){
        alert("Phone must be filled out");
        return  false;
    }
    else if (birthday ===  "" || birthday == null ){
        alert("Birthday must be filled out");
        return  false;
    }
    else if (hometown ===  "" || hometown == null ){
        alert("Hometown must be filled out");
        return  false;
    }

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
/* ok */
    function resetStudentForm(){
        $('#f-name').val("")
        $('#f-birthday').val("")
        $('#f-mobile-phone').val("")
        $('#f-hometown').val("")
}
