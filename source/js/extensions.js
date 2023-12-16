

export function getDataForm(form) {

    const dataForm = new FormData(form);

    const dataFormArr = [...dataForm];

    const dataObject = new Object();

    dataFormArr.forEach((element) => {
        dataObject[element[0]] = element[1]
    });

    dataObject.description = tinymce.activeEditor.getContent();
    dataObject.createdAt = `${new Date()}`;
    dataObject.lastUpdatedAt = "";
    
    return dataObject;

}

export function setDataForm(form , currentObject) {

    form.ProductName.value = currentObject.ProductName;
    form.Category.value = currentObject.Category;
    tinyMCE.activeEditor.setContent(currentObject.description);
}

export function confirmMessage(message) {

    return new Promise((resolved , rejected) => {

        Swal.fire({
            title: "Are you sure?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            resolved(result);

        });

    });
    
}

