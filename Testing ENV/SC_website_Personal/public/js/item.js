$(document).ready(function () {
    let productId = window.location.pathname.replace('/products/', '');
    
    // Decode to format properly and check if number
    productId = decodeURIComponent(productId);
    if (isNaN(productId)) {
        $('.product-name').html('404');
        $('.product-description').html(`Item with id of <b>'${productId}'</b> found! Please try again later.`);
        return; // skip ajax call, saves us some network
    }

    $.get({
        url: `/api/products/${productId}`
    }).done(function (res) {
        if (!res.image_url) res.image_url = 'no-image.png';

        $('.single_product_img img').attr('src', `/img/products/${res.image_url}`);
        $('.product-name').html(res.name);
        $('.product-description').html(res.description);
        $('.product-price').html(`Retailing at only $${res.price}, get your's today!`);
    }).fail(function (err) {
        $('.product-name').html('404');
        $('.product-description').html(`Item with id of <b>'${productId}'</b> found! Please try again later.`);
    });
});