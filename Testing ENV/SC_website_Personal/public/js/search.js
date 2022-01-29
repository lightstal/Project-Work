$(document).ready(function () {
    let search = window.location.pathname.replace('/search/', '');

    if (search.startsWith('/search')) {
        $('.popular-list').append(`
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 offset-md-3 offset-sm-3 offset-xl-4 offset-lg-4 text-center">
                <p>Enter something into the search field to begin searching!</p>
            </div>
        `)
        return;
    }

    // Decode to search properly
    search = decodeURIComponent(search);
    console.log(search)
    $.post({
        url: '/api/products/search',
        data: { search }
    }).done(function (res) {
        if (res.length < 1) {
            $('.popular-list').append(`
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 offset-md-3 offset-sm-3 offset-xl-4 offset-lg-4 text-center">
                    <p>No results found for <b>'${search}'</b></p>
                </div>
            `)
        }

        for (let product of res) {
            if (!product.image_url) product.image_url = 'no-image.png';

            $('.popular-list').append(`
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div class="single-popular-items mb-50 text-center">
                        <div class="popular-img">
                            <img src="/img/products/${product.image_url}" alt="${product.name}">
                            <div class="img-cap">
                                <span><a href="/products/${product.id}">${product.quantity} left</a></span>
                            </div>
                        </div>
                        <div class="popular-caption">
                            <h3><a href="/products/${product.id}">${product.name}</a></h3>
                            <span>$${product.price}</span>
                        </div>
                    </div>
                </div>
            `);
        }
    }).fail(function (err) {
        $('.popular-list').append(`
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 offset-md-3 offset-sm-3 offset-xl-4 offset-lg-4 text-center">
                <p>An error occurred while searching for <b>'${search}'</b>.</p>
            </div>
        `)
    });
});