$(document).ready(function () {
    $.get({
        url: '/api/products'
    }).done(function(res) {
        for (let product of $(res).shuffle()) {
            if (!product.image_url) product.image_url = 'no-image.png';
            
            if ($('.new-product-list').children().length < 3) {
                $('.new-product-list').append(`
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div class="single-new-pro mb-30 text-center">
                            <div class="product-img">
                                <img src="/img/products/${product.image_url}" alt="${product.name}">
                            </div>
                            <div class="product-caption">
                                <h3><a href="/products/${product.id}">${product.name}</a></h3>
                                <span>$${product.price}</span>
                            </div>
                        </div>
                    </div>
                `);
            } else if ($('.popular-list').children().length < 3) {
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
                `)
            }
        }
    }).fail(function(err) {
        console.log(err.responseJSON.message);
    });
});