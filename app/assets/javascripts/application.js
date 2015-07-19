// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery
//= require jquery_ujs
//= require_tree .

(function(angular) {
    var app = angular.module('app', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('light-green');
    });
    app.controller('ProjectController', ['$scope', function($scope) {
        $scope.project = {
            budget: '',
            goLive: '',
            description: '',
            currentStory: {
                asA: '',
                iWant: '',
                soThat: ''
            },
            stories: []
        };

        $scope.clearCurrentStory = function() {
            $scope.project.currentStory = {
                asA: '',
                iWant: '',
                soThat: ''
            };
        };

        $scope.isCurrentStoryComplete = function() {
            var story = $scope.project.currentStory;
            console.info(story);
            console.info(!!(story && story.asA && story.iWant && story.soThat));
            return !!(story && story.asA && story.iWant && story.soThat);
        };

        $scope.addCurrentStory = function() {
            if ($scope.isCurrentStoryComplete()) {
                $scope.project.stories.push(angular.copy($scope.project.currentStory));
            }
            $scope.clearCurrentStory();
        };
    }]);

    app.directive('budget', [function() {
        return {
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            link: function(scope, el, attrs, ngModel) {

                var parse = function(value) {
                    if(!value) {
                        return '';
                    }
                    var val = value.replace(/[^0-9]*/g, '');
                    if(val.length === 0) {
                        return '';
                    }
                    return '' + parseInt(val, 10);
                };

                var format = function(value) {
                    if (value.length < 3) {
                        return value;
                    }

                    var formatted = '';

                    var rest = value.length%3;
                    if (rest > 0) {
                        formatted += value.slice(0,rest) + '.';
                    }

                    var main = value.slice(rest);
                    var pieces = main.length/3;
                    for (var i=0; i<pieces; i++) {
                        if (i > 0 && i < pieces) {
                            formatted += '.';
                        }
                        var start = i*3;
                        formatted += main.slice(start,start+3);
                    }
                    return formatted;
                }

                ngModel.$parsers.unshift(function(value) {
                    var val = format(parse(value));
                    ngModel.$setViewValue(val);
                    ngModel.$render();
                    return val;
                });
                ngModel.$formatters.unshift(function(value) {
                    if (!value) {
                        return '';
                    };
                    return value;
                });
            }
        };
    }]);
    app.directive('userStory', [function() {
        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            scope: true,
            template: '<div><textarea ng-model="story" columns="1" class="current-story"></textarea></div>',
            link: function(scope, el, attrs, ngModel) {
                scope.story = '';

                var parseUserInput = function() {
                    var regExp = new RegExp('^(As a(.*(?=I want to))?)(I want to(.*(?=So that I))?)?(So that I(.*)?)?\\.?$', 'gi');
                    var groups = regExp.exec(scope.story);
                    console.info(groups);
                    var updateModelArgs = [];
                    if (groups) {
                        if (groups.length > 2) {
                            updateModelArgs[0] = groups[2];
                            if (groups.length > 4) {
                                updateModelArgs[1] = groups[4];
                                if (groups.length > 6) {
                                    updateModelArgs[2] = groups[6];
                                }
                            }
                            updateModel.apply(null, updateModelArgs);
                        }
                    }
                };

                var updateModel = function(asA, iWant, soThat) {
                    var value = {
                        asA: asA,
                        iWant: iWant,
                        soThat: soThat
                    }
                    console.warn(value);
                    ngModel.$setViewValue(value);
                    ngModel.$setValidity('validStory', (asA && iWant && soThat));
                    console.info(ngModel);
                };

                el.on('keydown', function(evt) {
                    parseUserInput();
                }).on('input', function(evt) {
                    parseUserInput();
                });
            }
        };
    }]);
})(angular);
