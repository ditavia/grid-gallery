(function ($) {

    "use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var navLinks = $("#navbar > ul > li > a[href^='#']");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");

        openBtn.on("click", function () {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })

        navLinks.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })
    }

    toggleMobileNavigation();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 5);
                var positionValue = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function () {
                var $this = $(this);
                var img = $this.children(img);
                var imgSrc = img.attr("src");

                $this.css({
                    backgroundImage: "url(" + imgSrc + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    // Flower pattern parallax setting
    function parallaxFlower() {
        if ($(".parallax-flower").length) {
            $(".parallax-flower").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 3);
                var pValueTopImg = doParallax + "px";
                var pvalueBtmImg = doParallax + "px";
                var img1 = $(this).data("bg-image-top");
                var img2 = $(this).data("bg-image-bottom");

                $(this).css({
                    backgroundImage: "url(" + img1 + ")" + ", " + "url(" + img2 + ")",
                    backgroundPosition: "0%" + pValueTopImg + ", " + "100%" + pvalueBtmImg
                });

            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(200).fadeOut(500, function () {

                //active wow
                wow.init();

                // Call slider parallax function
                sliderBgSetting();

                //Active heor slider
                if ($(".hero-slider").length) {
                    $(".hero-slider").owlCarousel({
                        items: 1,
                        autoplay: true,
                        loop: true,
                        animateOut: 'fadeOut'
                    });
                }
            });
        }
        /*------------------------------------------
                = ACTIVE BQUOTE SLIDER
            -------------------------------------------*/
        if ($(".bquotes-slider").length) {
            $(".bquotes-slider").owlCarousel({
                items: 1,
                loop: true
            });
        }


        /*------------------------------------------
            = ACTIVE GROOMSMEN SLIDER
        -------------------------------------------*/
        if ($(".groomsmen-slider").length) {
            $(".groomsmen-slider").owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
                dots: false,
                mouseDrag: false
            });
        }


        /*------------------------------------------
            = ACTIVE GROOMSMEN SLIDER
        -------------------------------------------*/
        if ($(".bridesmaids-slider").length) {
            $(".bridesmaids-slider").owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
                dots: false,
                mouseDrag: false
            });
        }








    }



    /*------------------------------------------
        = ACTIVE CURRENT MENU WHILE SCROLLING
    -------------------------------------------*/
    // function for active menuitem
    var sections = $("section"),
        nav = $("#navbar"),
        nav_height = nav.outerHeight();

    function activeMenuItem() {
        var cur_pos = $(window).scrollTop() + 2;
        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("ul > li > a").parent().removeClass("active");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("active");
            } else if (cur_pos === 2) {
                nav.find("ul > li > a").parent().removeClass("active");
            }
        });
    }

    // smooth-scrolling
    $(function () {
        $("#navbar > ul > li > a[href^='#']").on("click", function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - 60
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }

            return false;
        });
    });


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
    $(window).on("scroll", function () {
        var header = $("#header");
        var scroll = $(window).scrollTop();
        var top = $(".hero").height();

        if (scroll > top) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    });


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });


    /*------------------------------------------
        = BIGDAY COUNTDOWN
    -------------------------------------------*/
    if ($("#clock").length) {
        $('#clock').countdown('2023/08/27', function (event) {
            var $this = $(this).html(event.strftime(''
                + '<div class="box"><div>%D</div> <span>Days</span> </div>'
                + '<div class="box"><div>%H</div> <span>Hours</span> </div>'
                + '<div class="box"><div>%M</div> <span>Minutes</span> </div>'
                + '<div class="box"><div>%S</div> <span>Seconds</span> </div>'));
        });
    }


    /*------------------------------------------
        = THE WEDDING
    -------------------------------------------*/
    function eventClothFadeOut() {
        if ($(".events .event-boxes").length) {
            var eventBoxes = $('.event-boxes');
            var leftHalf = eventBoxes.find(".left-half");
            var rightHalf = eventBoxes.find(".right-half");
            var clip = eventBoxes.find(".clip");

            // If not ie and ie < 10 then do
            if (isIE() && !isIE() < 10) {
                leftHalf.css({
                    left: "-100%"
                });
                rightHalf.css({
                    right: "-100%"
                });

                clip.css({
                    opacity: 0
                })
            } else { // Not ie or geter than ie 10
                leftHalf.css({
                    left: 0
                });
                rightHalf.css({
                    right: 0
                });
            }

            eventBoxes.appear();
            $(document.body).on('appear', '.event-boxes', function () {
                if (!leftHalf.hasClass('appeared') || rightHalf.hasClass("appeared")) {
                    leftHalf.addClass('appeared slideOutLeft');
                    rightHalf.addClass('appeared slideOutRight');
                    clip.addClass('appeared clip-fade-out');
                }
            });

            $(document.body).on('disappear', '.event-boxes', function () {
                if (rightHalf.hasClass('appeared') || leftHalf.hasClass('appeared')) {
                    rightHalf.removeClass('appeared slideOutRight');
                    leftHalf.removeClass('appeared slideOutLeft');
                    clip.removeClass('appeared clip-fade-out');
                }
            });
        };
    }







    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            wrapCSS: "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid = $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    }




    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/
    /*  function map() {
 
         var locations = [
             ['Rumah Mempelai ', -7.827793943826596, 110.39055688099077, 1],
             // ['City inn khulna', 22.820884, 89.551216,2],
         ];
 
         var map = new google.maps.Map(document.getElementById('map'), {
             center: new google.maps.LatLng(-7.827793943826596, 110.39055688099077),
             zoom: 12,
             scrollwheel: false,
             mapTypeId: google.maps.MapTypeId.ROADMAP
 
         });
 
         var infowindow = new google.maps.InfoWindow();
 
         var marker, i;
 
         for (i = 0; i < locations.length; i++) {
             marker = new google.maps.Marker({
                 position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                 map: map,
                 icon: 'images/map-marker.png'
             });
 
             google.maps.event.addListener(marker, 'click', (function (marker, i) {
                 return function () {
                     infowindow.setContent(locations[i][0]);
                     infowindow.open(map, marker);
                 }
             })(marker, i));
         }
     };
 
  */
    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/


    // if ($("#rsvp-form").length) {
    //     $("#rsvp-form").validate({
    //         rules: {
    //             name: {
    //                 required: true,
    //                 minlength: 2
    //             },
    //             email: "required",

    //             guest: {
    //                 required: true
    //             },

    //             events: {
    //                 required: true
    //             }

    //         },

    //         messages: {
    //             name: "Please enter your name",
    //             email: "Please enter your email",
    //             guest: "Select your number of guest",
    //             events: "Select your event list"
    //         },

    //         submitHandler: function (form) {
    //             $("#loader").css("display", "inline-block");
    //             $.ajax({
    //                 type: "POST",
    //                 url: "mail.php",
    //                 data: $(form).serialize(),
    //                 success: function () {
    //                     $( "#loader").hide();
    //                     $( "#success").slideDown( "slow" );
    //                     setTimeout(function() {
    //                     $( "#success").slideUp( "slow" );
    //                     }, 3000);
    //                     form.reset();
    //                 },
    //                 error: function() {
    //                     $( "#loader").hide();
    //                     $( "#error").slideDown( "slow" );
    //                     setTimeout(function() {
    //                     $( "#error").slideUp( "slow" );
    //                     }, 3000);
    //                 }
    //             });
    //             return false; // required to block normal submit since you used ajax
    //         }

    //     });
    // }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
    const awal = () => {
        /*   $(window).on('load', function () {         */
        preloader();

        bgParallax();

        sliderBgSetting();

        parallaxFlower();

        masonryGridSetting();

        eventClothFadeOut();

       /*  if ($(".map").length) {
            map();
        } */
    }
    //   });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function () {
        activeMenuItem();

        bgParallax();

        parallaxFlower();
    });

    $("#btbuka").click(function () {
        $("#isi").show();
        $("#bukaan").hide();
        playAudio();
        awal();
       
    });



   


})(window.jQuery);

const url = window.location.href;
const urlParams = new URLSearchParams(url);
const tamu = urlParams.get('tamu');
const div = document.getElementById("tamu");
div.innerHTML = (tamu) ? tamu : "Dita Via Tyasmala";

let myAudio = new Audio('hbd.mp3');
   
const playAudio = () => { 
    myAudio.pause();
    myAudio.autoplay = true;
    myAudio.loop = true;
    myAudio.play()
}
function pauseAudio() {

    myAudio.pause();
} 
const salin = (btn, msg = null) => {
    copyToClipboard(btn.getAttribute('data-nomer'));
    let tmp = btn.innerHTML;
    btn.innerHTML = msg ?? 'Tersalin';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = tmp;
        btn.disabled = false;
        btn.focus();
    }, 1500);
}; 
  
function copyToClipboard(textToCopy) {
    const temp = document.createElement("input")
    temp.type = "text"
    temp.value = textToCopy
  
    document.body.appendChild(temp)
    temp.select()
    document.execCommand("Copy")
    document.body.removeChild(temp)
  }



/*
function salin(btn, msg = null) {
    const tmp = btn.innerHTML;
    btn.innerHTML = msg ?? "Tersalin";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = tmp;
        btn.disabled = false;
        btn.focus();
        document.execCommand("copy", false, btn.getAttribute("data-nomer"));
    }, 1500);
} */
   /*  
const salin = (btn, msg = null) => {
    navigator.clipboard.writeText(btn.getAttribute('data-nomer'));
    let tmp = btn.innerHTML;
    btn.innerHTML = msg ?? 'Tersalin';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = tmp;
        btn.disabled = false;
        btn.focus();
    }, 1500);
}; */


const resetForm = () => {
    document.getElementById('kirim').style.display = 'block';
    document.getElementById('hadiran').style.display = 'block';
    document.getElementById('labelhadir').style.display = 'block';
    document.getElementById('batal').style.display = 'none';
    document.getElementById('kirimbalasan').style.display = 'none';
    document.getElementById('idbalasan').value = null;
    document.getElementById('balasan').innerHTML = null;
    document.getElementById('formnama').value = null;
    document.getElementById('hadiran').value = 0;
    document.getElementById('formpesan').value = null;
};

const parseRequest = (method, token = null, body = null) => {
    let req = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        req.headers['Authorization'] = 'Bearer ' + token;
    }

    if (body) {
        req.body = JSON.stringify(body);
    }

    return req;
};

const getUrl = (optional = null) => {
    let url = document.querySelector('body').getAttribute('data-url');

    if (optional) {
        return url + optional;
    }

    return url;
};

const balasan = async (button, msg = null) => {
    button.disabled = true;
    let tmp = button.innerText;
    button.innerText = msg ?? 'Loading...';

    let id = button.getAttribute('data-uuid').toString();
    let token = localStorage.getItem('token') ?? '';

    if (token.length == 0) {
        alert('Terdapat kesalahan, token kosong !');
        window.location.reload();
        return;
    }

    const BALAS = document.getElementById('balasan');
    BALAS.innerHTML = renderLoading(1);
    document.getElementById('hadiran').style.display = 'none';
    document.getElementById('labelhadir').style.display = 'none';

    await fetch(getUrl('https://undangan9.000webhostapp.com/komen/' + id), parseRequest('GET'))
        .then((res) => res.json())
        .then((res) => {
            if (res.code == 200) {
                document.getElementById('kirim').style.display = 'none';
                document.getElementById('batal').style.display = 'block';
                document.getElementById('kirimbalasan').style.display = 'block';
                document.getElementById('idbalasan').value = id;

                BALAS.innerHTML = `
                <div class="card-body bg-light shadow p-3 my-2 rounded-4">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <p class="text-dark text-truncate m-0 p-0" style="font-size: 0.95rem;">
                            <strong>${escapeHtml(res.data.nama)}</strong>
                        </p>
                        <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${res.data.created_at}</small>
                    </div>
                    <hr class="text-dark my-1">
                    <p class="text-dark m-0 p-0" style="white-space: pre-line">${escapeHtml(res.data.komentar)}</p>
                </div>`;
            }

            if (res.error.length != 0) {
                if (res.error[0] == 'Expired token') {
                    alert('Terdapat kesalahan, token expired !');
                    window.location.reload();
                    return;
                }

                alert(res.error[0]);
            }
        })
        .catch((err) => {
            resetForm();
            alert(err);
        });

    document.getElementById('ucapan').scrollIntoView({ behavior: 'smooth' });
    button.disabled = false;
    button.innerText = tmp;
};

const kirimBalasan = async () => {
    let nama = document.getElementById('formnama').value;
    let komentar = document.getElementById('formpesan').value;
    let token = localStorage.getItem('token') ?? '';
    let id = document.getElementById('idbalasan').value;

    if (token.length == 0) {
        alert('Terdapat kesalahan, token kosong !');
        window.location.reload();
        return;
    }

    if (nama.length == 0) {
        alert('nama tidak boleh kosong');
        return;
    }

    if (nama.length >= 35) {
        alert('panjangan nama maksimal 35');
        return;
    }

    if (komentar.length == 0) {
        alert('pesan tidak boleh kosong');
        return;
    }

    document.getElementById('formnama').disabled = true;
    document.getElementById('formpesan').disabled = true;

    document.getElementById('batal').disabled = true;
    document.getElementById('kirimbalasan').disabled = true;
    let tmp = document.getElementById('kirimbalasan').innerHTML;
    document.getElementById('kirimbalasan').innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`;

    let isSuccess = false;
    await fetch(
        getUrl('https://undangan9.000webhostapp.com/komen'),
        parseRequest('POST',  {
            nama: nama,
            id: id,
            komentar: komentar
        }))
        .then((res) => res.json())
        .then((res) => {
            if (res.code == 201) {
                isSuccess = true;
            }

            if (res.error.length != 0) {
                if (res.error[0] == 'Expired token') {
                    alert('Terdapat kesalahan, token expired !');
                    window.location.reload();
                    return;
                }

                alert(res.error[0]);
            }
        })
        .catch((err) => {
            resetForm();
            alert(err);
        });

    if (isSuccess) {
        await ucapan();
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        resetForm();
    }

    document.getElementById('batal').disabled = false;
    document.getElementById('kirimbalasan').disabled = false;
    document.getElementById('kirimbalasan').innerHTML = tmp;
    document.getElementById('formnama').disabled = false;
    document.getElementById('formpesan').disabled = false;
};

const innerCard = (comment) => {
    let result = '';

    comment.forEach((data) => {
        result += `
        <div class="card-body border-start bg-light py-2 ps-2 pe-0 my-2 ms-2 me-0" id="${data.uuid}">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
                <p class="text-dark text-truncate m-0 p-0" style="font-size: 0.95rem;">
                    <strong>${escapeHtml(data.nama)}</strong>
                </p>
                <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${data.created_at}</small>
            </div>
            <hr class="text-dark my-1">
            <p class="text-dark mt-0 mb-1 mx-0 p-0" style="white-space: pre-line">${escapeHtml(data.komentar)}</p>
            <button style="font-size: 0.8rem;" onclick="balasan(this)" data-uuid="${data.uuid}" class="btn btn-sm btn-outline-dark rounded-4 py-0">Balas</button>
            ${innerCard(data.comment)}
        </div>`;
    });

    return result;
};

const renderCard = (data) => {
    const DIV = document.createElement('div');
    DIV.classList.add('mb-3');
    DIV.innerHTML = `
    <div class="card-body bg-light shadow p-3 m-0 rounded-4" id="${data.uuid}">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
            <p class="text-dark text-truncate m-0 p-0" style="font-size: 0.95rem;">
                <strong class="me-1">${escapeHtml(data.nama)}</strong><i class="fa-solid ${data.hadir ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'}"></i>
            </p>
            <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${data.created_at}</small>
        </div>
        <hr class="text-dark my-1">
        <p class="text-dark mt-0 mb-1 mx-0 p-0" style="white-space: pre-line">${escapeHtml(data.komentar)}</p>
        <button style="font-size: 0.8rem;" onclick="balasan(this)" data-uuid="${data.uuid}" class="btn btn-sm btn-outline-dark rounded-4 py-0">Balas</button>
        ${innerCard(data.comment)}
    </div>`;
    return DIV;
};

const renderLoading = (num) => {
    let hasil = '';
    for (let index = 0; index < num; index++) {
        hasil += `
        <div class="mb-3">
            <div class="card-body bg-light shadow p-3 m-0 rounded-4">
                <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-glow">
                    <span class="placeholder bg-secondary col-5"></span>
                    <span class="placeholder bg-secondary col-3"></span>
                </div>
                <hr class="text-dark my-1">
                <p class="card-text placeholder-glow">
                    <span class="placeholder bg-secondary col-6"></span>
                    <span class="placeholder bg-secondary col-5"></span>
                    <span class="placeholder bg-secondary col-12"></span>
                </p>
            </div>
        </div>`;
    }

    return hasil;
};

const pagination = (() => {

    const perPage = 10;
    let pageNow = 0;
    let resultData = 0;

    let disabledPrevious = () => {
        document.getElementById('previous').classList.add('disabled');
    };

    let disabledNext = () => {
        document.getElementById('next').classList.add('disabled');
    };

    let buttonAction = async (button) => {
        let tmp = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`;
        await ucapan();
        button.disabled = false;
        button.innerHTML = tmp;
        document.getElementById('daftarucapan').scrollIntoView({ behavior: 'smooth' });
    };

    return {
        getPer: () => {
            return perPage;
        },
        getNext: () => {
            return pageNow;
        },
        reset: async () => {
            pageNow = 0;
            resultData = 0;
            await ucapan();
            document.getElementById('next').classList.remove('disabled');
            disabledPrevious();
        },
        setResultData: (len) => {
            resultData = len;
            if (resultData < perPage) {
                disabledNext();
            }
        },
        previous: async (button) => {
            if (pageNow < 0) {
                disabledPrevious();
            } else {
                pageNow -= perPage;
                disabledNext();
                await buttonAction(button);
                document.getElementById('next').classList.remove('disabled');
                if (pageNow <= 0) {
                    disabledPrevious();
                }
            }
        },
        next: async (button) => {
            if (resultData < perPage) {
                disabledNext();
            } else {
                pageNow += perPage;
                disabledPrevious();
                await buttonAction(button);
                document.getElementById('previous').classList.remove('disabled');
            }
        }
    };
})();

const ucapan = async () => {
    const UCAPAN = document.getElementById('daftarucapan');
    UCAPAN.innerHTML = renderLoading(pagination.getPer());
    /* let token = localStorage.getItem('token') ?? '';

    if (token.length == 0) {
        alert('Terdapat kesalahan, token kosong !');
        window.location.reload();
        return;
    } */

    await fetch(getUrl('https://undangan9.000webhostapp.com/komen?'+`per=${pagination.getPer()}&nex=${pagination.getNext()}`), parseRequest('GET'))
        .then((res) => res.json())
        .then((res) => {
            if (res.code == 200) {
                UCAPAN.innerHTML = null;
                res.data.forEach((data) => UCAPAN.appendChild(renderCard(data)));
                pagination.setResultData(res.data.length);

                if (res.data.length == 0) {
                    UCAPAN.innerHTML = `<div class="h6 text-center">Tidak ada data</div>`;
                }
            }

            if (res.error.length != 0) {
                if (res.error[0] == 'Expired token') {
                    alert('Terdapat kesalahan, token expired !');
                    window.location.reload();
                    return;
                }

                alert(res.error[0]);
            }
        })
        .catch((err) => alert(err));
};

const login = async () => {
    document.getElementById('daftarucapan').innerHTML = renderLoading(pagination.getPer());
    let body = document.querySelector('body');

    await fetch(
        getUrl('/api/login'),
        parseRequest('POST', null, {
            email: body.getAttribute('data-email'),
            password: body.getAttribute('data-password')
        }))
        .then((res) => res.json())
        .then((res) => {
            if (res.code == 200) {
                localStorage.removeItem('token');
                localStorage.setItem('token', res.data.token);
                ucapan();
            }

            if (res.error.length != 0) {
                alert('Terdapat kesalahan, ' + res.error[0]);
                window.location.reload();
                return;
            }
        })
        .catch(() => {
            alert('Terdapat kesalahan, otomatis reload halaman');
            window.location.reload();
            return;
        });
};

const kirim = async () => {
    let nama = document.getElementById('formnama').value;
    let hadir = document.getElementById('hadiran').value;
    let komentar = document.getElementById('formpesan').value;
    /* let token = localStorage.getItem('token') ?? '';

    if (token.length == 0) {
        alert('Terdapat kesalahan, token kosong !');
        window.location.reload();
        return;
    } */

    if (nama.length == 0) {
        alert('nama tidak boleh kosong');
        return;
    }

    if (nama.length >= 35) {
        alert('panjangan nama maksimal 35');
        return;
    }

    if (hadir == 0) {
        alert('silahkan pilih kehadiran');
        return;
    }

    if (komentar.length == 0) {
        alert('pesan tidak boleh kosong');
        return;
    }

    document.getElementById('formnama').disabled = true;
    document.getElementById('hadiran').disabled = true;
    document.getElementById('formpesan').disabled = true;

    document.getElementById('kirim').disabled = true;
    let tmp = document.getElementById('kirim').innerHTML;
    document.getElementById('kirim').innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`;

    await fetch(
        getUrl('https://undangan9.000webhostapp.com/komen'),
        parseRequest('POST',  {
            name: nama,
            hadir: hadir == 1,
            komentar: komentar
        }))
        .then((res) => res.json())
        .then((res) => {
            if (res.code == 201) {
                resetForm();
                pagination.reset();
            }

            if (res.error.length != 0) {
                if (res.error[0] == 'Expired token') {
                    alert('Terdapat kesalahan, token expired !');
                    window.location.reload();
                    return;
                }

                alert(res.error[0]);
            }
        })
        .catch((err) => {
            resetForm();
            alert(err);
        });

    document.getElementById('formnama').disabled = false;
    document.getElementById('hadiran').disabled = false;
    document.getElementById('formpesan').disabled = false;
    document.getElementById('kirim').disabled = false;
    document.getElementById('kirim').innerHTML = tmp;
};

$(".abarx").on("click", function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
            $("html, body").animate({
                scrollTop: target.offset().top - 60
            }, 1000, "easeInOutExpo");
            $('.abarx').removeClass('active');
           // $(this).addClass('active');

            var href = $(this).attr("href");
            $('a[href="'+href+'"]').addClass('active');

            return false;
        }
    }

    return false;
});

