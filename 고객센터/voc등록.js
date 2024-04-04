/**
 * Created by Novaflo02 on 2022-07-04.
 */

$(function(){
    user.getUserData();
    $save = $('.btn-save').attr("onclick", null).clone().click(sendVoC);
    $('.btn-save').remove();
    $('.btn-area').append($save);
    console.log('sendVoC Ready');
})


function sendVoC (){
    let categories = { "1495" : 7, "1496": 8, "1497" : 9, "1498" : 10, "1499" : 11};
    let cateVal = $('#B_BCL_IDX').val();
    let idCategory;
    if(categories.hasOwnProperty(cateVal)){
       idCategory = categories[cateVal];
    }else idCategory = 11;

    $.ajax({
        url : serverUrl + 'api/consult/',
        type : "POST",
        data : {
            "category_id" : idCategory,
            "olly_id" : user.id,
            "name" : $('#B_NAME').val(),
            "tel" : $('#B_OPT_TEL').val(),
            "content" : $('input[name=B_TITLE]').val() + ":" +  $('textarea[name=B_CONTENT]').val(),
        },
//                    jsonp : "callback",
        async : false,
        statusCode : {
            201 : (data)=>{
                console.log(data);
                oncl();
            },
        }
    }).fail((jqXHR, textStatus, errorThrown) => {consult.handle404(jqXHR, textStatus, errorThrown)});

}

var user = {
    id: null,
    getUserData: function () {
        $.ajax({
            url: '/api/info.nx',
            data: {"KEY": apikey, "SESS_ID": document.cookie.match('nx_session=([^;]*)')[1], "param": "id"},
            type : "POST",
            async : false,
        }).done(function (data) {
            if (data.success === true) {
                console.log('UserAuth Success!');
                user.id = data.items.id;
            } else {
                console.log('login Nothing!');
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('login Error!' + textStatus + " : " + errorThrown);
        });
    }
}
