// Call the dataTables jQuery plugin
$(document).ready(function () {
    const hourTable = $('#hourTable')
    const flash = $('.flash')

    hourTable.length && hourTable.DataTable();

    flash.length && flash.each(function () {
        $(this).fadeOut(2999);
    });

    $('.clockpicker').clockpicker()

});
