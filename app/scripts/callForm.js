// create mailForm module
createNamespaces('APP.modules.mailForm');

APP.modules.mailForm = ({
    input: $('.call-form .form-field'),
    ajaxLoader: $('.call-form .ajax-loader'),
    btn: $('#call-send'),
    form: $('.call-form'),
    maskTelField: function () {
        //mask jquery plugin
        $("#call-phone").mask("+7 (999) 999-99-99")
            .on("blur", function() {
                var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
                if( last.length == 3 ) {
                    var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
                    var lastfour = move + last;
                    var first = $(this).val().substr( 0, 9 );
                    $(this).val( first + '-' + lastfour );
                }
            });
    },
    send: function () {
        var that = this;
        $.ajax({
            url: 'second.php',
            type: 'POST',
            data: that.form.serialize(),
            beforeSend: function () {
                that.addSpinner();
                that.disabledForm();
            },
            success: function (data) {
                var dataObj = data || {};
                if(dataObj != 'success') {
                    that.onServerEvent(dataObj);
                }else{
                    that.onServerEvent('success');
                    that.clearForm();
                }
                that.removeSpinner();
                that.enabledForm();
            },
            error: function () {
                that.onServerEvent('error');
                that.removeSpinner();
                that.enabledForm();
            }
        });
    },
    disabledForm: function () {
        this.btn.attr('disabled', true);
    },
    enabledForm: function () {
        this.btn.attr('disabled', false);
    },
    onServerEvent: function (msg) {
        if(msg === 'success') {
            //success
            $('.call-form  .server-success').removeClass('hide').hide().fadeIn(500);
        }else if(msg === 'error'){
            //server error
            $('.call-form  .server-error').removeClass('hide').hide().fadeIn(500);
        }else{
            //server error
            $('.call-form  .server-error').removeClass('hide').hide().html(msg).fadeIn(500);
        }
    },
    clearForm: function () {
        this.form.find('input').val('');
    },
    addSpinner: function () {
        this.ajaxLoader.removeClass('hide');
    },
    removeSpinner: function () {
        this.ajaxLoader.addClass('hide');
    },
    showValidateError: function ($el) {
        $el.prev().addClass('error-field');
    },
    removeValidateError: function ($el) {
        $el.prev().removeClass('error-field');
    },
    validateFields: function () {
        var result = true,
            that = this;

        this.input.each(function (i, el) {
            var $el = $(el);
            if($el.val().length == 0) {
                that.showValidateError($el);
                result = false;
            }else{
                that.removeValidateError($el);
            }
        });
        return result;
    },
    init: function () {
        var that = this;
        this.maskTelField();
        that.btn.click(function (e) {
            if(that.validateFields()) {
                that.send();
            }
            e.preventDefault();
        });
        return this;
    }
}).init();


