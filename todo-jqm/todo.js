$(document).on('pagecreate', "#index", function() {
    var url_entrypoint = 'http://localhost:3007/items';
    route(url_entrypoint);
});

$('#detail-page').on('pageshow', function(event) {
    $('#item-detail').text(JSON.stringify(gc.data, null, 4));
});

// $(document).on('click', showItem);
function showItem(elem) {
    console.log(elem);
    // route(this.href);
}

var gc = {} || window.gc;

function loadList() {
    var items = gc.data.rdfs_member;
    items.forEach(appendList);

    $('#todo-list a').on('click', function(event) {
        event.preventDefault();
        route(this.href);
    });

    $('#todo-list').listview("refresh");
}

function appendList(item) {
    item.dc_title = item.dc_title.trim();
    if (item.dc_title) {
        $('#todo-list').append("<li><a href='" + item._subject + "'>" + item.dc_title + "</a></li>");
    }
}

function route(url) {
    $.getJSON(url, function(data) {
        if (typeof data.rdf_type == "object")
            data.rdf_type = data.rdf_type.value;

        gc.data = data;
        if (~data.rdf_type.indexOf('basicProfile#Container'))
            loadList();
        else if (typeof data.rdf_type == "string" && ~data.rdf_type.indexOf('todo#Item'))
            $.mobile.changePage('#detail-page');
        else
            console.log(data);
    });
}