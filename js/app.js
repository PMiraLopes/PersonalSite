// app.js
var routerApp = angular.module('personalSite', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
        url: '/about',
        templateUrl: 'views/aboutMe.html',
        controller: 'aboutController'
    })

    .state('other', {
        url: '/other',
        templateUrl: 'views/otherActivities.html',
        controller: 'otherController'
    });

});

routerApp.controller('homeController', ['$scope', function ($scope) {
    console.log("Home");
}])

routerApp.controller('otherController', ['$scope', function ($scope) {
    console.log("Other");
}])


.controller('aboutController', ['$scope', function ($scope) {
    console.log("About Me");
}]);

routerApp.directive('scrollOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function () {
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                } else {
                    $target = $elm;
                }
                $("body").animate({
                    scrollTop: $target.offset().top
                }, "slow");
            });
        }
    }
});

routerApp.directive('constellation', function () {
    return {
        link: function (scope, $elm, attrs) {
            /*
             * requestAnimationFrame pollyfill
             */
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                });
            }


            /*!
             * Mantis.js / jQuery / Zepto.js plugin for Constellation
             * @version 1.2.2
             * @author AcauÃ£ Montiel <contato@acauamontiel.com.br>
             * @license http://acaua.mit-license.org/
             */
            (function ($, window) {
                /**
                 * Makes a nice constellation on canvas
                 * @constructor Constellation
                 */
                function Constellation(canvas, options) {
                    var $canvas = $(canvas),
                        context = canvas.getContext('2d'),
                        defaults = {
                            star: {
                                color: 'rgba(255, 255, 255, 1)',
                                width: 1
                            },
                            line: {
                                color: 'rgba(255, 255, 255,1)',
                                width: 0.2
                            },
                            position: {
                                x: 0, // This value will be overwritten at startup
                                y: 0 // This value will be overwritten at startup
                            },
                            width: window.innerWidth,
                            height: window.innerHeight,
                            velocity: 0.1,
                            length: 100,
                            distance: 120,
                            radius: 150,
                            stars: []
                        },
                        config = $.extend(true, {}, defaults, options);

                    function Star() {
                        this.x = Math.random() * canvas.width;
                        this.y = Math.random() * canvas.height;

                        this.vx = (config.velocity - (Math.random() * 0.5));
                        this.vy = (config.velocity - (Math.random() * 0.5));

                        this.radius = Math.random() * config.star.width;
                    }

                    Star.prototype = {
                        create: function () {
                            context.beginPath();
                            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                            context.fill();
                        },

                        animate: function () {
                            var i;
                            for (i = 0; i < config.length; i++) {

                                var star = config.stars[i];

                                if (star.y < 0 || star.y > canvas.height) {
                                    star.vx = star.vx;
                                    star.vy = -star.vy;
                                } else if (star.x < 0 || star.x > canvas.width) {
                                    star.vx = -star.vx;
                                    star.vy = star.vy;
                                }

                                star.x += star.vx;
                                star.y += star.vy;
                            }
                        },

                        line: function () {
                            var length = config.length,
                                iStar,
                                jStar,
                                i,
                                j;

                            for (i = 0; i < length; i++) {
                                for (j = 0; j < length; j++) {
                                    iStar = config.stars[i];
                                    jStar = config.stars[j];

                                    if (
                                        (iStar.x - jStar.x) < config.distance &&
                                        (iStar.y - jStar.y) < config.distance &&
                                        (iStar.x - jStar.x) > -config.distance &&
                                        (iStar.y - jStar.y) > -config.distance
                                    ) {
                                        if (
                                            (iStar.x - config.position.x) < config.radius &&
                                            (iStar.y - config.position.y) < config.radius &&
                                            (iStar.x - config.position.x) > -config.radius &&
                                            (iStar.y - config.position.y) > -config.radius
                                        ) {
                                            context.beginPath();
                                            context.moveTo(iStar.x, iStar.y);
                                            context.lineTo(jStar.x, jStar.y);
                                            context.stroke();
                                            context.closePath();
                                        }
                                    }
                                }
                            }
                        }
                    };

                    this.createStars = function () {
                        var length = config.length,
                            star,
                            i;

                        context.clearRect(0, 0, canvas.width, canvas.height);

                        for (i = 0; i < length; i++) {
                            config.stars.push(new Star());
                            star = config.stars[i];

                            star.create();
                        }

                        star.line();
                        star.animate();
                    };

                    this.setCanvas = function () {
                        canvas.width = config.width;
                        canvas.height = config.height;
                    };

                    this.setContext = function () {
                        context.fillStyle = config.star.color;
                        context.strokeStyle = config.line.color;
                        context.lineWidth = config.line.width;
                    };

                    this.setInitialPosition = function () {
                        if (!options || !options.hasOwnProperty('position')) {
                            config.position = {
                                x: canvas.width * 0.5,
                                y: canvas.height * 0.5
                            };
                        }
                    };

                    this.loop = function (callback) {
                        callback();

                        window.requestAnimationFrame(function () {
                            this.loop(callback);
                        }.bind(this));
                    };

                    this.bind = function () {
                        $(window).on('mousemove', function (e) {
                            config.position.x = e.pageX - $canvas.offset().left;
                            config.position.y = e.pageY - $canvas.offset().top;
                        });
                    };

                    this.init = function () {
                        this.setCanvas();
                        this.setContext();
                        this.setInitialPosition();
                        this.loop(this.createStars);
                        this.bind();
                    };
                }

                $.fn.constellation = function (options) {
                    return this.each(function () {
                        var c = new Constellation(this, options);
                        c.init();
                    });
                };
            })($, window);


            /**
             * Main application namespace
             * @namespace app
             */
            var app = window.app || {};


            /**
             * Check resolution
             * @memberof app
             */
            app.checkResolution = function () {
                if (Math.min(window.innerWidth, window.innerHeight) < 550) {
                    $('meta[name="viewport"]')
                        .attr('content', 'width=550, user-scalable=no');
                }
            };


            /**
             * Constellation
             * @memberof app
             */
            app.constellation = function () {
                $(window).on('load resize orientationchange', function (e) {
                    $('#background').constellation({
                        length: Math.round(window.innerHeight / 5)
                    });
                });
            };


            /**
             * Init method
             * @memberof app
             */
            app.init = function () {
                this.checkResolution();
                this.constellation();
            };


            /**
             * Initializes the application
             */
            app.init();
        }
    }
})