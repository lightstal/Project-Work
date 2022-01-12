$(document).ready(function () {
    let jwtToken = localStorage.getItem('jwt_token');
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && jwtToken) {
        $('.header-right ul li').last().remove();
        $('.header-right ul').append(`
            <li><a href="/profile"><span class="fa fa-user"></span></a></li>
        `);
        $('.header-right ul').append(`
            <li><a href="#" class="logout-btn"><span class="fa fa-sign-out-alt"></span></a></li>
        `);
        if (user.role == 'admin') {
            $('#navigation').append(`
                <li><a href="/admin">Admin</a></li>
            `)
        }
    }

    $('form[action="/search"]').submit(function (e) {
        e.preventDefault();
        let query = $('form[action="/search"] input[name="search"]').val();
        window.location = `/search/${query}`;
    });

    $('.logout-btn').click(function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location = '/';
    });
});