// package tracking 
function trackPackage() {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwOTY1OWRiMC01MzY5LTExZWUtODBmNi04YmMwNzdiNTViMDAiLCJzdWJJZCI6IjY1MDNiNjVjM2RhNDYyNjgzOTE5MmUzZiIsImlhdCI6MTY5NDc0MjEwOH0.5Wx-XTO3_9kLGOR_QgnLCT3BjUt5mu3J6Ci1XglGyYQ'; // Replace with your actual API key
    const trackingUrl = 'https://parcelsapp.com/api/v3/shipments/tracking';
    
    const trackingNumber = document.getElementById("trackingNumber").value;
    
    const shipments = [{
        trackingId: trackingNumber,
        language: 'en',
        country: 'United States'
    }];

    $.post({
        url: trackingUrl,
        data: JSON.stringify({ apiKey: apiKey, shipments: shipments }),
        contentType: 'application/json',
        success: (response) => {
            const uuid = response.uuid;

            const checkTrackingStatus = () => {
                $.get({
                    url: `${trackingUrl}?apiKey=${apiKey}&uuid=${uuid}`,
                    success: (statusResponse) => {
                        if (statusResponse.done) {
                            document.getElementById("packageInfo").innerHTML = 'Tracking complete';
                        } else {
                            document.getElementById("packageInfo").innerHTML = 'Tracking in progress...';
                            setTimeout(checkTrackingStatus, 1000);
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    }
                });
            }

            checkTrackingStatus();
        },
        error: (err) => {
            console.error(err);
        }
    });
}






(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });




    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

