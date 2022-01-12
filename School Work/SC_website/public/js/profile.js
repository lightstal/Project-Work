$(document).ready(function () {
    let jwtToken = localStorage.getItem('jwt_token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (!user || !jwtToken) {
        window.location = '/';
    }

    function placeholderCheck() {
        let inputs = $('.profile-form input');
        for (let input of inputs) {
            if ($(input).val())
                $(input).next('span[class="placeholder"]').hide();
            else
                $(input).next('span[class="placeholder"]').show();
        }
    }

    $('.profile-form input').focusout(placeholderCheck);

    $.get({
        url: `/api/users/${user.id}`
    }).done(function (res) {
        let date = new Date(res.created_at);
        $('.info-list').html(`
            <li>
                Welcome back, <b>${res.firstname}</b>.
            </li>
            <li>
                You have joined us since ${date.toLocaleDateString()}.
            </li>
        `);

        $('.profile-form input[name="username"]').val(res.username);
        $('.profile-form input[name="firstname"]').val(res.firstname);
        $('.profile-form input[name="lastname"]').val(res.lastname);
        $('.profile-form input[name="email"]').val(res.email);
        placeholderCheck();
    }).fail(function (err) {
        window.location = '/';
    });

    $('.profile-form').submit(function(e) {
        e.preventDefault();

        let data = $(this).serializeObject();
        if (data.password != data['confirm-password']) {
            $('.err-msg').html(`your passwords do not match`);
            return;
        }
        
        $.ajax({
            url: `/api/users/${user.id}`,
            method: 'put',
            data: data
        }).done(function (res) {
            $('.err-msg').html('Profile sucessfully updated!');
        }).fail(function (err) {
            $('.err-msg').html(err.responseJSON.message);
        });
    });

    $('.update-btn').click(function(e) {
        e.preventDefault();
        $('.profile-form').submit();
    });
});
