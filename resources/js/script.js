var tempData ;
$(document).ready(function(){
    document.querySelector('form').addEventListener('submit', (e) => {
        const data = Object.fromEntries(new FormData(e.target).entries());
        data.id =tempData.length +1;
        tempData.push(data);
                $("tbody").append(  '<tr>'+
                    '<td><input type="checkbox" id=" '+ data.id +  ' " name="edit" ></td>'+
                    '<td>'+data.id+ '</td>'+
                    '<td>'+data.name+ '</td>'+
                    '<td>'+data.birthday + '</td>'+
                    '<td>'+data.phone + '</td>'+
                    '<td>'+ data.hometown + '</td>'+
                    '</tr>')
    });
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
    })


$(function(){
    var tempNewJson;
    $('form[name=myForm]').submit(function(){
        $.post($(this).attr('action'), $(this).serialize(), function(json) {
            tempNewJson=JSON.parse(json);
            tempNewJson.id=tempData.size+1;
            tempData.push(tempNewJson);
        }, 'json');
        return false;
    });
});



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

function deleteStudent() {


}
