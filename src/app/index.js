/**
 * Created by gkopevski on 10/28/15.
 */
'use strict';

var onAngularReady = function () {
//    logDebug('onAngularReady');
    angular.element(document).ready(function () {
//        logDebug('angular.bootstrap');
        angular.bootstrap(document, ['java2days']);
    });
};

var app = {
    initialize: function () {
        onAngularReady();
    }
};