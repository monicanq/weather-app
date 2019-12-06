class minMax{
    sortData(data){
        const today = data[0].dt_txt.substring(0,10);
        let newday = '';
        const temperatures = [{'max': data[0].main.temp_max, 'min': data[0].main.temp_min, 'desc': data[0].weather[0].main}];
        let i = 0;
        data.forEach(record=>{
            if (record.dt_txt.substring(0,10)===today){
                console.log('We do not need this data');
            } else {
                if (record.dt_txt.substring(0,10) !== newday){
                    i++;
                    newday=record.dt_txt.substring(0,10);
                    temperatures[i]={'max': record.main.temp_max, 'min': record.main.temp_min};
                } else {
                    if (record.main.temp_max > temperatures[i].max){
                        temperatures[i].max=record.main.temp_max;
                        temperatures[i].desc=record.weather[0].main;
                    }
                    if (record.main.temp_min < temperatures[i].min){
                        temperatures[i].min=record.main.temp_min;
                    }
                }
            }
        });
        return temperatures;
    }

}