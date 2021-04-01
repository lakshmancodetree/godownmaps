    'use strict';

    /**
     * Map
     */
    var map;

    /**
     * Dummy data
     */
    var dummyData;

    /**
     * Map initialization (Google Maps callback function)
     */
    function initMap() {

        dummyData = initData();

        /**
         * Block containing countries data
         */
        var $ul = $('ul.striped-list').empty();

        /**
         * Create map with center at Russia
         */
        map = dummyData.countries.Russia.createMap('#map').on('click', function() {
            /**
             * Close overview window while click on map
             */
            overviewOpened = true;
            triggerOverview();
        });

        /**
         * Filling countries data
         */
        Object.keys(dummyData.countries).map(function(countryName, index) {

            var country = dummyData.countries[countryName];
            /**
             * Create map marker for each country
             */
            var marker = country.createMarker(map).on('click', function() {
                outputOverview(country);
                overviewOpened = false;
                triggerOverview();
            });

            $ul.append(
                $('<li/>', {
                    'class': 'striped-list-item',
                    'data-overview-toggle': ''
                }).append(
                    $('<span/>', {
                        'class': 'striped-list-item__index',
                        'html': index + 1
                    })
                ).append(
                    $('<img/>', {
                        'class': 'striped-list-item__flag'
                    }).attr('src', 'img/flags/' + country.data('code') + '.png').attr('alt', country.data('name'))
                ).append(
                    $('<span/>', {
                        'class': 'striped-list-item__name',
                        'html': country.data('name')
                    })
                ).on('mouseover', function() {
                    /**
                     * Scroll map to country marker and show marker info window
                     */
                    map.panTo(country);
                    marker.infoWindow.show();
                }).on('click', function() {
                    /**
                     * Open overview window with country data
                     */
                    outputOverview(country);
                    overviewOpened = false;
                    triggerOverview();
                })
            );

        });

    };

    /**
     * Print overview window with country data
     * @param  {Country} country
     */
    function outputOverview(country) {

        /**
         * Print data in html block
         */
        country.output('section.overview');

        $('section.overview section.place-view').css('background-image', 'url("img/countries/' + country.data('code') + '.png")');

        var $block = $('section.grid div.overview-block div.row').empty();

        /**
         * Output cities data
         */
        dummyData.countries.Russia.getCities('popular').map(function(city) {

            $block.append(
                $('<div/>', {
                    'class': 'grid-item clearfix col-md-6'
                }).append(
                    $('<img/>', {
                        'class': 'grid-item__img'
                    }).attr('src', 'img/cities/' + city.data('name').replace(' ', '-') + '--thumb.jpg').attr('alt', city.data('name'))
                ).append(
                    $('<div/>', {
                        'class': 'grid-item-wrapper'
                    }).append(
                        $('<a/>', {
                            'class': 'grid-item__title',
                            'html': city.data('name'),
                            'href': 'city.html'
                        })
                    ).append(
                        $('<section/>', {
                            'class': 'social-stats'
                        }).append(
                            $('<div/>', {
                                'class': 'social-stats__item social-stats-item'
                            }).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__icon fa fa-star'
                                })
                            ).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__value',
                                    'html': city.data('rating')
                                })
                            )
                        ).append(
                            $('<div/>', {
                                'class': 'social-stats__item social-stats-item'
                            }).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__icon fa fa-comment'
                                })
                            ).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__value',
                                    'html': city.data('comments')
                                })
                            )
                        )
                    )
                )
            );

        });

    };



    $(document).ready(function () {
        // Habitation Chintur
        $("#hide").click(function () {
          $("#show").show();
          $("#hide").hide();
          $("#myNav").hide();
        });
        $("#show").click(function () {
          $("#hide").show();
          $("#show").show();
          $("#myNav").show();
        });
        
      
          // Habitation Chintur mandal
          $("#hide9").click(function () {
            $("#show9").show();
            $("#hide9").hide();
            $("#myNav9").hide();
          });
          $("#show9").click(function () {
            $("#hide9").show();
            $("#show9").show();
            $("#myNav9").show();
          });
        
      });