function clear_keywords() {
    controller.action("remove", {
        "showcase":"query.history",
        "action-when-done":"reload",
        "params-when-done":"target=object,object=showcase.query.history"
    });
}
