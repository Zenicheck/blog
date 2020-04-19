// Call the dataTables jQuery plugin
$(document).ready(function () {
    const offerTable = $('#offerTable')
    const flash = $('.flash')

    offerTable.length && offerTable.DataTable();

    flash.length && flash.each(function () {
        $(this).fadeOut(2999);
    });

});
