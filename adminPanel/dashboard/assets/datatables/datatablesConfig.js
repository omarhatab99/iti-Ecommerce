$(function() {
    'use strict';

    var dt_basic_table = $('.datatables-basic');

    // DataTable with buttons
    // --------------------------------------------------------------------

    if (dt_basic_table.length) {
    var dt_basic = dt_basic_table.DataTable({

        order: [[2, 'desc']],
        dom: '<"flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        displayLength: 7,
        lengthMenu: [7, 10, 25, 50, 75, 100],
        buttons: [
        {
            extend: 'collection',
            className: 'btn btn-label-primary dropdown-toggle me-5',
            text: '<i class="ti ti-file-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
            buttons: [
            {
                extend: 'print',
                text: '<i class="ti ti-printer me-1" ></i>Print',
                className: 'dropdown-item',
                exportOptions: { columns: [0 , 1 , 2] }
            },
            {
                extend: 'csv',
                text: '<i class="ti ti-file-text me-1" ></i>Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [0 , 1 , 2] }
            },
            {
                extend: 'pdf',
                text: '<i class="ti ti-file-description me-1"></i>Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [0 , 1 , 2] }
            },
            {
                extend: 'copy',
                text: '<i class="ti ti-copy me-1" ></i>Copy',
                className: 'dropdown-item',
                exportOptions: { columns: [0 , 1 , 2] }
            }
            ]
        },
        ]
    });
    }
});