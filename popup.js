$(function(){
    init();
    $('#save').click(function (e) { 
        save();
        $('#tips').text('Saved!');
    });
});

function init() {
    var domains = localStorage.getItem('domains');
    if(!domains){
        domains = 'www.baidu.com;www.bing.cn';
    }

    var headers = localStorage.getItem('headers');
    if(!headers){
        headers = 'Cookie;Host';
    }

    $("#domains").val(domains);
    $("#headers").val(headers);
}

function save() {
    localStorage.setItem('domains', $('#domains').val());
    localStorage.setItem('headers', $('#headers').val());
}