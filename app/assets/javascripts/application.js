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
    app.controller('ProjectController', ['$scope', '$http', function($scope, $http) {

        $scope.action = '/';
        $scope.csrfToken = '';
        $scope.spec_file_descriptor = { name: '' };

        $scope.project = {
            budget: '',
            go_live: '',
            description: '',
            currentStory: {
                as_a: '',
                i_want: '',
                so_that: ''
            },
            currentStories: [],
            stories: [],
            spec_file: null,
            contact: {
                name: '',
                company: '',
                phone: '',
                mail: ''
            },
            utf8: '',
            authenticity_token: ''
        };

        $scope.clearCurrentStory = function() {
            $scope.project.currentStory = {
                as_a: '',
                i_want: '',
                so_that: ''
            };
        };

        $scope.isCurrentStoryComplete = function() {
            var story = $scope.project.currentStory;
            return !!(story && story.as_a && story.i_want && story.so_that);
        };

        $scope.addCurrentStory = function() {
            if ($scope.isCurrentStoryComplete()) {
                $scope.project.stories.push(angular.copy($scope.project.currentStory));
            }
            $scope.clearCurrentStory();
        };

        $scope.triggerFileSelection = function() {
            $('input[type="file"]').click();
        };

        $scope.showError = function(form, fieldName) {
            return (form.$submitted || form[fieldName].$touched) && form[fieldName].$invalid;
        };

        $scope.submit = function(form, $event) {

            $event.preventDefault();
            form.$setSubmitted();
            if (form.$invalid) {
                return false;
            }

            $http({
                url: $scope.action,
                method: 'POST',
                data: $.param({project: $scope.project}),
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-Token': $scope.csrfToken
                }
            }).success(function(response) {
                console.info(response);
            }).error(function(error) {
                console.error(error);
            });

            return true;
        };

        $scope.$watch('project.currentStory', function(newValue) {
            $scope.project.currentStories = [newValue];
        }, true);
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
                    }
                    return value;
                });
            }
        };
    }]);
    app.directive('userStory', [function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                story: '='
            },
            template: '<textarea columns="1" class="current-story"></textarea>',
            link: function(scope, el, attrs) {

                var parseUserInput = function(value) {
                    var regExp = new RegExp('^(As a(.*(?=I want to))?)(I want to(.*(?=So that I))?)?(So that I(.*)?)?\\.?$', 'gi');
                    var groups = regExp.exec(value);
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

                var updateModel = function(as_a, i_want, so_that) {
                    var value = {
                        as_a: as_a,
                        i_want: i_want,
                        so_that: so_that
                    }
                    scope.story = value;
                };

                el.on('keydown', function(evt) {
                    parseUserInput( $(evt.target).val() );
                }).on('input', function(evt) {
                    parseUserInput( $(evt.target).val() );
                });
            }
        };
    }]);
    app.directive('fileUpload', [function() {
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            require: 'ngModel',
            link: function(scope, el, attrs, ngModel) {
                $(el).on('change', function(evt) {
                    var fullPath = evt.target.value;
                    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                    var filename = fullPath.substring(startIndex);
                    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                        scope.spec_file_descriptor.name = filename.substring(1);
                    }
                    var reader = new FileReader();
                    reader.onload = function(evt) {
                        ngModel.$setViewValue(evt.target.result);
                        ngModel.$commitViewValue();
                    };
                    reader.readAsBinaryString(this.files[0]);
                });
            }
        };
    }]);
    app.directive('angularCompatible', [function() {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, el, attrs) {
                var element = $(el);

                var action = element.attr('action');
                var utf8 = element.find('*[name="utf8"]');
                var authenticityToken = element.find('*[name="authenticity_token"]');
                scope.csrfToken = $('meta[name="csrf-token"]').attr('content');
                scope.action = action + '?utf8=' + utf8.val() + '&authenticity_token=' + authenticityToken.val();
            }
        };
    }]);
})(angular);
