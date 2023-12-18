

//get data from any form

export const getFormData = (form) =>{

    const dataForm = new FormData(form);

    const dataFormArr = [...dataForm];

    const currentObject = new Object();


    dataFormArr.forEach((element) => {

        currentObject[element[0]] = element[1]

    });

    return currentObject;

}