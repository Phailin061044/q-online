 function pagination(pageSize, currentPage, data) {
    let value = data.slice(pageSize * (currentPage - 1 ), pageSize * currentPage).slice(0, pageSize); //นำ data มาดึงตามจำนวน page

    return {
        statusCode: 200,
        taskStatus: true,
        message: 'Success',
        pagin: {
            totalRow: data.length, //การนับจำนวน [] จำนวน object
            pageSize: pageSize, //บอกว่าเราต้องการดึงข้อมูลเท่าไหร่ต่อหน้า
            currentPage: currentPage, //ข้อมูลที่เราทำการส่งมา
            totalPage: Math.ceil(data.length / pageSize), //การคำนวณว่าเรามีทั้งหมดกี่หน้า 
        },
        data: value,
    };
}
function success(){
    return { statusCode: 200, taskStatus: true, message: 'success'};
}
function error(statusCode = 500, message = 'Unsuccess') {
    return { statusCode: statusCode, taskStatus: false, message: message };
}
function single(data){
    return { statusCode: 200, taskStatus: true, message: 'success', data: data[0]}
}
function multi(data){
    return { statusCode: 200, taskStatus: true, message: 'Success', data: data };
}

module.exports = { pagination, success, error, single, multi};

