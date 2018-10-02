function select_keyword(data) {
    var textfield = controller.object("textfield.keyword");
    
    textfield.property({ "text":data["keyword"].trim() });
    textfield.action("focus");
}
