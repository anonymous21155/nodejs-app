/*let month = undefined;
let day = undefined;
let hour = undefined;
let minute = undefined;
let second = undefined;
const date = new Date();
const year = date.getFullYear();
let endAsync = undefined;
let startAsync = undefined;

async function endDateTimeAsync(){

    if(date.getUTCMonth() + 1 < 10){
        let currentMonth = date.getUTCMonth() + 1;
        month = '0' + currentMonth;
    }
    else{
        month = date.getUTCMonth() + 1;  
    }
    if(date.getUTCDate() < 10){
        day = '0' + date.getUTCDate();
    }
    else{
        day = date.getUTCDate();
    }
    if(date.getUTCHours() + 1 < 10){
        let hourlater = date.getUTCHours() + 1;
        hour = '0' + hourlater;
    }
    else if(date.getUTCHours() + 1 == 24){
       hour = '00';  
    }
    else{
        hour = date.getUTCHours() + 1;
    }
    if(date.getUTCMinutes() < 10){
        minute = '0' + date.getUTCMinutes();
    }
    else{
        minute = date.getUTCMinutes();
    }
    if(date.getUTCSeconds() < 10){
        second = '0' + date.getUTCSeconds();
    }
    else{
        second = date.getUTCSeconds();
    }
   
    endAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second; 
    return endAsync;
}
async function startDateTimeAsync(){

    if(date.getUTCMonth() + 1 < 10){
        let currentMonth = date.getUTCMonth() + 1;
        month = '0' + currentMonth;
    }
    else{
        month = date.getUTCMonth() + 1;  
    }
    if(date.getUTCDate() < 10){
        day = '0' + date.getUTCDate();
    }
    else{
        day = date.getUTCDate();
    }
    if(date.getUTCHours() < 10){
        hour = '0' + date.getUTCHours();
    }
    else{
       hour = date.getUTCHours();  
    }
    if(date.getUTCMinutes() < 10){
        minute = '0' + date.getUTCMinutes();
    }
    else{
        minute = date.getUTCMinutes();
    }
    if(date.getUTCSeconds() < 10){
        second = '0' + date.getUTCSeconds();
    }
    else{
        second = date.getUTCSeconds();
    }
   
    startAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second; 
    return startAsync;
}

export {startDateTimeAsync, endDateTimeAsync};*/

let month 
let second
let day 
let hour
let minute
const date = new Date();
const year = date.getFullYear();
let endAsync
let startAsync

async function endDateTimeAsync() {
    const endDate = new Date(date); // Clone the original date
    endDate.setUTCMinutes(endDate.getUTCMinutes() + 15); // Add 15 minutes

    // Format the date and time components
    month = endDate.getUTCMonth() + 1 < 10 ? '0' + (endDate.getUTCMonth() + 1) : endDate.getUTCMonth() + 1;
    day = endDate.getUTCDate() < 10 ? '0' + endDate.getUTCDate() : endDate.getUTCDate();
    hour = endDate.getUTCHours() < 10 ? '0' + endDate.getUTCHours() : endDate.getUTCHours();
    minute = endDate.getUTCMinutes() < 10 ? '0' + endDate.getUTCMinutes() : endDate.getUTCMinutes();
    second = endDate.getUTCSeconds() < 10 ? '0' + endDate.getUTCSeconds() : endDate.getUTCSeconds();

    endAsync = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    return endAsync;
}

async function startDateTimeAsync() {
    // Format the date and time components
    month = date.getUTCMonth() + 1 < 10 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1;
    day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();
    hour = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
    minute = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
    second = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds();

    startAsync = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    return startAsync;
}

export { startDateTimeAsync, endDateTimeAsync };
