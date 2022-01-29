$(document).ready(function () {
    let jwtToken = localStorage.getItem('jwt_token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (!jwtToken || !user) {
        $('.comment-form').hide();
    }

    $.get({
        url: '/api/comments'
    }).done(function (res) {
        let count = 0;
        for (let comment of res) {
            let date = new Date(comment.created_at);
            $('.comments-area').append(`
                <div class="comment-list">
                    <div class="single-comment justify-content-between d-flex">
                        <div class="user justify-content-between d-flex">
                            <div class="desc">
                                <p class="comment">${comment.comment}</p>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex align-items-center">
                                    <h5>${comment.firstname} ${comment.lastname}</h5>
                                    <p class="date">${date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            count++;
        }

        if (count < 1) {
            $('.comments-area').append(`
                <p>There are no comments! Write one!</p>
            `);
        }
        $('.comment-count').html(`${count} Comments`);
    }).fail(function (err) {
        console.log(err.responseJSON.message);
    });

    $('form[action="/api/comments"]').submit(function(e) {
        e.preventDefault();
        let comment = $('form[action="/api/comments"] textarea').val();

        $.post({
            url: `/api/comments`,
            data: { comment, userId: user.id }
        }).done(function (res) {
            $('.err-msg').html('Comment added!');
            setTimeout(() => window.location.reload(), 2000);
        }).fail(function (err) {
            $('.err-msg').html(err.responseJSON.message);
        });
    });
});