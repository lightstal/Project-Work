$(document).ready(function () {
    function placeholderCheck() {
        let inputs = $('.product-form input, .product-form textarea');
        for (let input of inputs) {
            if ($(input).val())
                $(input).next('span[class="placeholder"]').hide();
            else
                $(input).next('span[class="placeholder"]').show();
        }
    }

    $.get({
        url: `/api/users`
    }).done(function (res) {
        for (let user of res) {
            $('.users-table tbody').append(`
                <tr>
                    <th scope="row">${user.id}</th>
                    <td>${user.username}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                </tr>
            `)
        }
    }).fail(function (err) {
        console.log(err);
    });
    
    $.get({
        url: `/api/products`
    }).done(function (res) {
        for (let product of res) {
            $('.products-table tbody').append(`
                <tr>
                    <th scope="row">${product.id}</th>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td><a href="#" class="genric-btn danger-border delete-product" data-value="${product.id}" data-toggle="modal" data-target="#deleteProductModal">Delete</a></td>
                </tr>
            `);
        
          

            $(`.delete-product[data-value="${product.id}"]`).click(function (e) {
                $('.delete-product-form .delete-name').html(product.name);
                $('.delete-product-form input[name="id"]').val(product.id);
            });
        }
    }).fail(function (err) {
        console.log(err);
    });

    $('.product-form input, .product-form textarea').focusout(placeholderCheck);
    $('.product-form textarea').focusin(function () {
        $('.product-form textarea').next('span[class="placeholder"]').hide();
    });

    $('.add-product-form').submit(function (e) {
        e.preventDefault();

        let data = $(this).serializeObject();

        $.post({
            url: `/api/products`,
            data: data
        }).done(function (res) {
            $('.err-msg').html('Product sucessfully added!');
            setTimeout(() => window.location = '/admin', 2000);
        }).fail(function (err) {
            $('.err-msg').html(err.responseJSON.message);
        });
    });

   

    $('.delete-product-form').submit(function (e) {
        e.preventDefault();

        let data = $(this).serializeObject();

        $.ajax({
            url: `/api/products/${data.id}`,
            method: 'delete'
        }).done(function (res) {
            $('.err-msg').html('Product sucessfully deleted!');
            setTimeout(() => window.location = '/admin', 2000);
        }).fail(function (err) {
            $('.err-msg').html(err.responseJSON.message);
        });
    });
});
