$(document).ready(function () {
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
    $('.profile-form').submit(function(e) {
        e.preventDefault();

        let data = $(this).serializeObject();
        let cipherPass = CryptoJS.AES.encrypt(data.password, config.secretKey);
        console.log(cipherPass)
        console.log(data)
        if (data.password != data['confirm-password']) {
            $('.err-msg').html(`your passwords do not match`);
            return;
        }
        
        $.post({
            url: `/api/users`,
            data: data
        }).done(function (res) {
            $('.err-msg').html('User account created! Click <a href="/login" class="text-danger font-weight-bold">here</a> to log in!');
        }).fail(function (err) {
            $('.err-msg').html('An error occurred! Maybe try a different email/username?');
        });
    });

    $('.update-btn').click(function(e) {
        e.preventDefault();
        $('.profile-form').submit();
    });
});
