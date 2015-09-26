var ListsController = (function () {
    function ListsController($scope, $firebaseAuth, $location) {
        var ref = new Firebase('https://emoment.firebaseio.com');
        this.twitter = ref.getAuth().twitter;
        console.log(this.twitter);
    }
    return ListsController;
})();
exports.ListsController = ListsController;
