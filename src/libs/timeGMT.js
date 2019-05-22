module.exports = class timeGTM{
    constructor(){
        this.nowDateUtf = new Date(new Date().valueOf() + new Date().getTimezoneOffset() * 60000);
    }
    teste(){
        console.log('teste do time gmt', this.nowDateUtf)
    }
    getDay(){
        return this.nowDateUtf.getDate();
    }
    getMonth(){
        return this.nowDateUtf.getMonth() + 1;
    }
    getYear(){
        return this.nowDateUtf.getFullYear();
    }
    getHour(){
        return this.nowDateUtf.getHours();
    }
    getMinutes(){
        return this.nowDateUtf.getMinutes();
    }
    

}