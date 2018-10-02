var asksteem = require("asksteem");
var contents = require("contents");
var api      = require("api");

var __disallowed_tags = []; //safety.get_disallowed_tags();
var __current_page  = 1;
var __has_next_page = true;

function search_keyword(keyword, location, length, sortkey, sortorder, handler) {
    var keyword = document.value("SEARCH_KEYWORD");
    var page = (location == 0) ? 1 : __current_page + 1;
    var options = {};

    if (location == 0 || __has_next_page) {
        asksteem.search(keyword, page, options, function(response) {
            var discussions = response["results"];
            var data = [];
    
            discussions.forEach(function(discussion){
                var content = contents.create(discussion);
                var datum = {
                    "id":"S_BLOG_" + content.data["author"] + "_" + content.data["permlink"],
                    "author":content.data["author"],
                    "permlink":content.data["permlink"],
                    "title":content.data["title"], 
                    "userpic-url":content.get_userpic_url("small"),
                    "userpic-large-url":content.get_userpic_url(),
                    "author-reputation":content.get_author_reputation().toFixed(0).toString(),
                    "votes-count":content.data["net_votes"].toString(),
                    "replies-count":content.data["children"].toString(),
                    "main-tag":content.data["tags"][0] || "",
                    "created-at":content.data["created"]
                };

                if (content.is_allowed(__disallowed_tags)) {
                    data.push(datum);
                }
            });
    
            __current_page  = __current_page + 1;
            __has_next_page = response["pages"]["has_next"];
    
            handler(data);
        });
    } else {
        handler([]);
    }
}

function open_discussion(data) {
    api.open_discussion({
        "author":data["author"],
        "permlink":data["permlink"]
    });
}

function show_user(data) {
    api.show_user({
        "username":data["username"]
    });
}

function show_votes(data) {
    api.show_votes({
        "author":data["author"],
        "permlink":data["permlink"]
    });
}

function show_replies(data) {
    api.show_replies({
        "author":data["author"],
        "permlink":data["permlink"]
    });
}

function show_tag(data) {
    api.show_tag({
        "tag":data["tag"]
    });
}
