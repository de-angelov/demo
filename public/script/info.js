/*eslint-disable */
(function ($, document, window) {
    var APP_ID = `57456d63-124d-4733-b363-42facb124422`;
    var RETURN_URI = 'http://127.0.0.1:4200/';
    var AUTH_CALL = `https://api-sandbox.fintecture.com/oauth/token/authorize?app_id=${APP_ID}&redirect_uri=${RETURN_URI}&response_type=code`;
    $(document).ready(function () {
        var params = (new URL(location)).searchParams;
        var customer_id = params.get('customer_id')
        if (customer_id) {
            code = sessionStorage.getItem('code');
            console.log('customer_id', customer_id);
            console.log('code', code);
            $.ajax({
                url: "http://127.0.0.1:4200/id",
                type: "post",
                data: {
                    code: code,
                    customer_id: customer_id,
                },
                headers: {},
                success: function (res) {
                    console.log('success', res);
                },
                error: function (res) {
                    console.log(res);
                }
            });
        }

    });
    $(window).load(function () {});
})(jQuery, document, window);