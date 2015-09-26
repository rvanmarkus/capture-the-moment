import { MainController } from './main.controller';
import { WebDevTecService } from '../components/webDevTec/webDevTec.service';

describe('controllers', () => {
  let mainController: MainController;

  beforeEach(angular.mock.module('emoment'));

  beforeEach(inject(($controller: ng.IControllerService, webDevTec: WebDevTecService) => {
    webDevTec.data = [null, null, null, null, null];
    mainController = $controller('MainController');
  }));



  it('should define animate class after delaying timeout ', inject(($timeout: ng.ITimeoutService) => {
    $timeout.flush();
    expect(mainController.classAnimation).toEqual('rubberBand');
  }));

  it('should define more than 5 awesome things', () => {
    expect(mainController.awesomeThings.length === 5).toBeTruthy();
  });
});
