function search_keyword(form) {
    var keyword = form.keyword.trim();

    __save_search_keyword(keyword);
    __reload_keyword_showcase();

    controller.action("subview", {
    	"subview":"V_SEARCH",
        "target":"popup"
    });

    timeout(1, function() {
        __clear_keyword_textfield();
    });
}

function __save_search_keyword(keyword) {
    document.value("SEARCH_KEYWORD", keyword);

    controller.action("remove", {
        "showcase":"query.history",
        "display-unit":keyword
    });

    controller.action("submit", {
        "form":"search",
        "showcase":"query.history",
        "display-unit":keyword
    });
}

function __clear_keyword_textfield() {
    var textfield = view.object("textfield.keyword");

    textfield.action("clear");
}

function __reload_keyword_showcase() {
    var showcase = view.object("showcase.query.history");

    showcase.action("reload");
}
