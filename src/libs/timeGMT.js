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

    getDayBefore(){
        // situation Ok
        if(this.getDay() - 1 != 0){
            return this.getDay() - 1
        }
        let dayBefore;
        let monthBefore = this.getMonth() - 1;
        // is not january actually
        if(monthBefore != 0){
            let monthWith28 = [2];
            let monthWith30 = [4,6,9,11];
            let monthWith31 = [1,3,5,7,8,10,12];
            if(monthWith31.indexOf(monthBefore) != -1){
                return 31;
            }
            if(monthWith30.indexOf(monthBefore) != -1){
                return 30;
            }
            if(monthWith28.indexOf(monthBefore) != -1){
                return 28;
           }
        }
        // returning 31 december, bacause is 01/01 today..
        return 31;
    }
    // getMonthBefore(){
    //     if(this.getDayBefore(){

    //     }
    // }
}