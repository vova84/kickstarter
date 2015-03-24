// global MASTEREXPO obj
var APP = APP || {};

//create namespaces
function createNamespaces(namespace) {
    var parent = APP,
        args = namespace.split('.'),
        parts = (args[0] === 'APP') ? args.slice(1) : args;
    for(var i = 0; i < parts.length; i++) {
        if(typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent =  parent[parts[i]];
    }
    return parent;
}

/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
(function( factory ) {
    // Browser globals
    factory( jQuery.datepicker );
}(function( datepicker ) {

    datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3C;Пред',
        nextText: 'След&#x3E;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    datepicker.setDefaults(datepicker.regional['ru']);

    return datepicker.regional['ru'];

}));

$(function() {
    $( "#startDate" ).datepicker({
        showOn: "button",
        buttonImage: "images/calendar.png",
        buttonImageOnly: true,
        dateFormat: "dd.mm.yy",
        buttonText: "Select date"
    });
    $( "#endDate" ).datepicker({
        showOn: "button",
        buttonImage: "images/calendar.png",
        buttonImageOnly: true,
        dateFormat: "dd.mm.yy",
        buttonText: "Select date"
    });
});

function toggleCheckboxes() {
    $('.checkbox-wrap')
        .on('click', 'input', function(event) {
            $(event.target).parent().find('.checkbox').toggleClass('active');
        })
        .on('click', 'label', function(event) {
            event.preventDefault();
            var input = $(event.target).parent().find('input');
            input.prop('checked', !input.prop("checked"));
            $(event.target).parent().find('.checkbox').toggleClass('active');
        });
}

toggleCheckboxes();
