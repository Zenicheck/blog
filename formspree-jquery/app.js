$(document).ready(function () {

    const contactForm = $('#contact-form');

    contactForm.length && contactForm.on("submit", function (e) {
        e.preventDefault();
        $('.contact-form-status').remove();
        const form = $(this);
        const route = form.attr('action');
        const btn = form.find('#submit-btn');

        const _replyto = form.find('input[name="_replyto"]');
        const contactName = form.find('input[name="contactName"]');
        const contactMessage = form.find('#contactMessage');
        const newsletter = form.find('#newsletter').prop('checked');

        removeClass([_replyto, contactName, contactMessage]);

        if (validateFields([_replyto, contactName, contactMessage]) !== undefined) {
            return false;
        }

        btn.prop('disabled', true);
        btn.html('Envoi en cours...');
        $.ajax({
            url: route,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                _replyto: _replyto.val(),
                contactName: contactName.val(),
                contactMessage: contactMessage.val()
            }),
            dataType: 'json',
            processData: false,
            success: function () {
                if (newsletter) {
                    // call to newsletter api
                }
                btn.html('Envoyer');
                btn.prop('disabled', false);
                form.prepend('<div class="alert alert-success contact-form-status" role="alert">' +
                    'Message envoyé ! Je reviens vers vous au plus vite !</div>');
                contactForm.trigger('reset');
            },
            error: function () {
                btn.html('Renvoyer');
                btn.prop('disabled', false);
                form.prepend('<div class="alert alert-danger contact-form-status" role="alert">' +
                    'Erreur lors de l\'envoi du message !</div>');
            }
        });
        return false;
    });

    function validateFields(fields) {
        return fields.map(function (e) {
            const val = e.val();
            if (val == undefined || val == null || val == '') {
                e.addClass('is-invalid');
                return true;
            }
            return false;
        }).find(function (e) {
            return e == true;
        });
    }

    function removeClass(fields) {
        fields.map(function (e) {
            e.removeClass('is-invalid');
        });
    }

});
