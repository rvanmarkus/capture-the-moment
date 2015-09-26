/** @ngInject */
export class ListsController {
  constructor($scope, $firebaseAuth, $location){
    var ref = new Firebase('https://emoment.firebaseio.com');
    this.twitter = ref.getAuth().twitter;
    console.log(this.twitter);
  }
}
