// create mailForm module
createNamespaces('APP.modules.mainForm');

APP.modules.mainForm = ({
    input: $('.main-form .form-field'),
    ajaxLoader: $('.main-form .ajax-loader'),
    btn: $('.main-form #send-mail'),
    form: $('.main-form'),
    validateMail: function () {
        var field = this.input.parent().find('#email'),
            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(field.val());
    },
    maskTelField: function () {
        //mask jquery plugin
        $("#phone").mask("+7 (999) 999-99-99")
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
            url: 'main.php',
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
            $('.main-form  .server-success').removeClass('hide').hide().fadeIn(500);
        }else if(msg === 'error'){
            //server error
            $('.main-form  .server-error').removeClass('hide').hide().fadeIn(500);
        }else{
            //server error
            $('.main-form  .server-error').removeClass('hide').hide().html(msg).fadeIn(500);
        }

    },
    clearForm: function () {
        this.form.find('input').val('');
        this.form.find('textarea').val('');
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
        if(!this.validateMail()){
            that.showValidateError($('#email'));
            result = false;
        }

        if(!that.validateCheckboxes()){
            result = false;
        }

        return result;
    },
    validateCheckboxes: function () {

        if($('#exhibition').prop('checked')==false && $('#conference').prop('checked')==false){
            $('.checkbox-wrap').find('label').addClass('error-field');
            return false;
        }
        $('.checkbox-wrap').find('label').removeClass('error-field');
        return true;
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



