var antiforgeryTokenCookieIdentifier = 'CSRF-TOKEN';

document.onload = setCookiePresenceText(antiforgeryTokenCookieIdentifier);

function setCookiePresenceText(cname) {
    $('#cookiePresenceHeader').text(getTokenFromCookie(cname) === ""
        ? 'No Antiforgery token detected.'
        : 'Antiforgery token has been generated and added as a Cookie.');
}

function getTokenFromCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$("#generate").click(function (e) {
    e.preventDefault();
    $.ajax({
        url: "/Cookie/Generate/",
        type: "POST",
        success: function () {
        },
        error: function () {
            alert('Post Unsuccessful');
        }
    });
});

$("#formTest").click(function (e) {
    e.preventDefault();
    $.ajax({
        url: "/Cookie/TestForm/",
        type: "POST",
        data: {
            '__RequestVerificationToken': getTokenFromCookie(antiforgeryTokenCookieIdentifier),
            'Test': 'this is a test'
        },
        success: function (result) {
            alert(result);
        },
        error: function () {
            alert('Post Unsuccessful');
        }
    });
});

$("#jsonTest").click(function (e) {
    e.preventDefault();

    //var headers = {};
    //headers['X-CSRF-TOKEN'] = getTokenFromCookie(antiforgeryTokenCookieIdentifier);

    $.ajax({
        url: "/Cookie/TestApi/",
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-CSRF-TOKEN': getTokenFromCookie(antiforgeryTokenCookieIdentifier)
        },
        success: function (result) {
            alert(result);
        },
        error: function () {
            alert('Post Unsuccessful');
        }
    });
});