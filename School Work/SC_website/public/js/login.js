$(document).ready(function () {
    $('form[action="/login"]').submit(function (e) {
        e.preventDefault();

        let data = $(this).serializeObject();
        if (!data.username || !data.password) {
            $('.err-msg').addClass('text-danger');
            return $('.err-msg').html('missing username or password');
        }

        $.post({
            url: '/login',
            data: data 
        }).done(function(res) {
            localStorage.setItem('jwt_token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            window.location = '/';
        }).fail(function(err) {
            $('.err-msg').addClass('text-danger');
            $('.err-msg').html(err.responseJSON.message);
        });
    });
});