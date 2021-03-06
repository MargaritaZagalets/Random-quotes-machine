$(function () {
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    var colors = ['#6C4475', '#0C6483', '#FF8800', '#B0BB1E', '#8B3A62', '#36454F', '#FF084A', '#009246', "#CE2B37", "#00ABA9", "#FF8000", "#326ADA"];
    var currentQuote = '', currentAuthor = '';

    function openURL(url) {
        window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
    }

    function getQuote() {
        $.ajax({
            headers: {
                "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
            success: function (r) {
                if (typeof r === 'string') {
                    r = JSON.parse(r);
                }
                if (Array.isArray(r)) {
                    r = r[0];
                }
                currentQuote = r.quote;
                currentAuthor = r.author;
                if (inIframe()) {
                    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
                }
                $(".quote-text").animate({
                        opacity: 0
                    }, 500,
                    function () {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#text').text(r.quote);
                    });

                $(".quote-author").animate({
                        opacity: 0
                    }, 500,
                    function () {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#author').html(r.author);
                    });

                var color = Math.floor(Math.random() * colors.length);
                $("html body").animate({
                    backgroundColor: colors[color],
                    color: colors[color]
                }, 1000);
                $(".btn").animate({
                    color: colors[color],
                    borderColor: colors[color]
                }, 1000);
                $(".fa-twitter").animate({
                    color: colors[color]
                }, 1000);
            }
        });
    }

    $(function () {
        getQuote();
        $('#get-another-quote-button').on('click', getQuote);
        $('#tweet-quote').on('click', function () {
            if (!inIframe()) {
                openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
            }
        });
    });
});