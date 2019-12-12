class timeConvert{
    addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    convertTime(timestamp){
        var a = new Date(timestamp * 1000);
        var hour = this.addZero(a.getHours());
        var min = this.addZero(a.getMinutes());
        var sec = this.addZero(a.getSeconds());
        var time = hour + ':' + min + ':' + sec ;
    
        return time;
    };
    convertTimeDate(timestamp){
        var a = new Date(timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year ;

        return time;
    };
    convertDay(timestamp, addedDays){
        const a = new Date(Date.now());
        const weekday = a.getDay();
        const week = ['Mon','Tue', 'Wed', 'Thu','Fri','Sat', 'Sun'];
        
        if (weekday+addedDays<=7){
            return week[weekday+addedDays-1];
        } else{
            return week[weekday+addedDays-8];
        }
        
    }
}