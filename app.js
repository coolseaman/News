var webService = 'http://192.168.0.6:8000';

$('button').click(function() {
    var title = $('#title').val();
    var author = $('#author').val();

    if( !title ) {
        $('.validation-alert').removeClass('hidden').siblings('.alert').addClass('hidden');
    } else {
        $('.validation-alert').addClass('hidden');
        $('.waiting-alert').removeClass('hidden').siblings('.alert').addClass('hidden');
        $.ajax({
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            url: webService + '/?title=' + title + '&author=' + author,
            type: 'GET',
            success: function(res) {
                renderTable(JSON.parse(res));
                $('.success-alert').removeClass('hidden').siblings('.alert').addClass('hidden');
            },
            error: function(res) {
                $('tbody').empty();
                $('.failed-alert').removeClass('hidden').siblings('.alert').addClass('hidden');
            },
            complete: function(res) {
                var data = [{title: '热点一', site: '新浪新闻'}, {title: '热点二', site: '腾讯新闻'}];
                $('.waiting-alert').addClass('hidden');         
            }
        })
    }
})

var renderTable = function(data) {
    var tpl;
    for(var i = 0; i < data.length; i++) {
        tpl = tpl + '<tr><td>' + data[i].site + '</td><td>' + data[i].title + '</td><td>' + data[i].time + '</td><td>' + data[i].post_num + '</td><td><a target="_blank" href="' + data[i].url + '">点击</a></td>';
    }
    $('tbody').empty().append(tpl);

    $('#forwardNum').empty().append(data.length)
}