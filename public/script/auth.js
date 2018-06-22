/*eslint-disable */
(function ($, document, window) {
    var APP_ID = `57456d63-124d-4733-b363-42facb124422`;
    var RETURN_URI = 'http://127.0.0.1:4200/';
    var AUTH_CALL = `https://api-sandbox.fintecture.com/oauth/token/authorize?app_id=${APP_ID}&redirect_uri=${RETURN_URI}&response_type=code`;
    $(document).ready(function () {
        if ($("#modal").length) {
            console.log('modal');
            $("#send").click(function (e) {
                e.preventDefault;
                var bankID = $("select option:selected").attr("data-id");
                if (document.location.search.length) {
                    console.log('search location');
                    var params = (new URL(location)).searchParams;
                    var code = params.get('code')
                    console.log('code', code);
                    if (code) {
                        sessionStorage.setItem('code', code);
                        $.ajax({
                            url: "http://127.0.0.1:4200/code",
                            type: "post",
                            data: {
                                code: code,
                                bankID: bankID,
                            },
                            headers: {},
                            success: function (res) {
                                console.log('success', res);
                                window.open(res.url, "_self");
                            },
                            error: function (res) {
                                console.log(res);
                                
                            }
                        });
                    }
                }
            })

        } else {
            console.log('waiting modal');
            window.open(AUTH_CALL, "_self")
        }

    });
    $(window).load(function () {});
})(jQuery, document, window);