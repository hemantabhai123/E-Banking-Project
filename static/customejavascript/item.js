$(document).ready(function () {
    // Initialize all select2 with Bootstrap 5 theme
    $('.select2').select2({
        theme: 'bootstrap-5',
        width: '100%'
    });

    // Toggle between Product and Service
    function toggleProductFields(isProduct) {
        $('#trackingRow').toggle(isProduct);
        $('#stock-tab').toggle(isProduct);

        $('#labelProduct').toggleClass('active', isProduct);
        $('#labelService').toggleClass('active', !isProduct);

        $('#pricing-tab').tab('show');
    }

    // Set initial state
    $('#toggleSwitch').prop('checked', false);
    toggleProductFields(true);

    // Listen to toggle switch change
    $('#toggleSwitch').on('change', function () {
        toggleProductFields(!$(this).prop('checked'));
    });

    // Apply Bootstrap styling to all form labels
    $('form label').addClass('form-check-label');

    // ==============================
    // Category Select2 Initialization
    // ==============================
    $('#categorySelect').select2({
        theme: 'bootstrap-5',
        placeholder: "Select Category",
        width: '100%',
        dropdownAutoWidth: true,
        templateResult: formatCategoryOption,
        templateSelection: formatCategorySelection
    });

    function formatCategoryOption(option) {
        if (!option.id) return option.text;

        const dataType = $(option.element).data('type');
        if (dataType === "add") {
            return $('<div><i class="fas fa-plus"></i> <strong>Add New Category</strong></div>');
        }

        const selected = $('#categorySelect').val() === option.id;
        return $(`
            <div style="display: flex; align-items: center;">
                <input type="checkbox" style="margin-right: 8px;" ${selected ? 'checked' : ''} />
                <span>${option.text}</span>
            </div>
        `);
    }

    function formatCategorySelection(option) {
        if (!option.id) return option.text;
        if (option.id === "add_new") return "+ Add New Category";
        return option.text;
    }

    $('#categorySelect').on('select2:select', function (e) {
        if (e.params.data.id === "add_new") {
            $('#categorySelect').val(null).trigger('change');
            const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
            addCategoryModal.show();
        }
    });










    

    // ==============================
    // Unit Select2 Initialization
    // ==============================
    $('#unitSelect').select2({
        theme: 'bootstrap-5',
        placeholder: "Select Unit",
        width: '100%',
        dropdownAutoWidth: true,
        templateResult: formatUnitOption,
        templateSelection: formatUnitSelection
    });

    function formatUnitOption(option) {
        if (!option.id) return option.text;

        const dataType = $(option.element).data('type');
        if (dataType === "add") {
            return $('<div><i class="fas fa-plus"></i> <strong>Add New Unit</strong></div>');
        }

        const selected = $('#unitSelect').val() === option.id;
        return $(`
            <div style="display: flex; align-items: center;">
                <input type="checkbox" style="margin-right: 8px;" ${selected ? 'checked' : ''} />
                <span>${option.text}</span>
            </div>
        `);
    }

    function formatUnitSelection(option) {
        if (!option.id) return option.text;
        if (option.id === "add_new") return "+ Add New Unit";
        return option.text;
    }

    $('#unitSelect').on('select2:select', function (e) {
        if (e.params.data.id === "add_new") {
            $('#unitSelect').val(null).trigger('change');
            alert("Open your add new unit modal here!");
        }
    });
});
