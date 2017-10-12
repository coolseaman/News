var webService = '192.168.12.1:8080';

$('button').click(function() {
    var title = $('#title').val();
    var author = $('#author').val();

    if( !title ) {
        $('.alert-danger').removeClass('hidden');
    } else {
        $('.alert-danger').addClass('hidden');
        $.ajax({
            url: webService + '/api/submit/',
            data: JSON.stringify({
                author: author,
                title: title
            }),
            type: 'POST',
            success: function() {},
            error: function() {},
            complete: function() {
                var data = [{title: '热点一', site: '新浪新闻'}, {title: '热点二', site: '腾讯新闻'}];
                renderTable(data);
            }
        })
    }
})

var renderTable = function(data) {
    var tpl;
    for(var i = 0; i < data.length; i++) {
        tpl = tpl + '<tr><td>' + data[i].site + '</td><td>' + data[i].title + '</td>';
    }
    $('tbody').empty().append(tpl);
}