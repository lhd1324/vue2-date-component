
  export default {
    name: 'vue-Datepicker',
    data() {
      return {
        textTop: ['一', '二', '三', '四', '五', '六', '日'],
        myDate: [],
        list: [],
        dateTop: '',

        hmscon:{
          hours:24,
          minutes:60,
          seconds:60,
          hstatus:true,
          mstatus:true,
          sstatus:true,
        },
        
        curhour:"00",
        curmin:"00",
        cursec:"00",


        showday:true,
        showdaystatus:true,
        showhms:false,
        showhmsstatus:true,

        markDate: [],
        markList: [],
        agoDayHide: 0,
        futureDayHide:  '15181550670000' ,
        isHideOtherday: true,

        curtimeformat:"",
        curdaytem:""

      };
    },
    props: {
      options:{
        type: Object,
        required: false,
        twoWay: true
      }
    },
    created() {
      this.curtimeformat=this.checkformat(this.options)
      if(this.options.curtime){
        let curtimedata=this.options.curtime.replace(/-/g,"/")
        if(this.curtimeformat=='dayh'){
          curtimedata=curtimedata+":00"
        }
        if(!this.curtimeformat.match('day')){
          let curymd=new Date();
          curtimedata=curymd.getFullYear()+"/"+(curymd.getMonth()+1)+"/"+curymd.getDate()+" "+(this.curtimeformat=='h'?curtimedata+":00":curtimedata)
        }
        this.myDate = new Date(curtimedata);
        this.curhour=this.myDate.getHours()>=10?this.myDate.getHours():'0'+this.myDate.getHours()
        this.curmin=this.myDate.getMinutes()>=10?this.myDate.getMinutes():'0'+this.myDate.getMinutes()
        this.cursec=this.myDate.getSeconds()>=10?this.myDate.getSeconds():'0'+this.myDate.getSeconds()
      }else{
        this.myDate = new Date();
      }
      this.markList=this.options.markList||[]
      this.isHideOtherday=this.options.isHideOtherday||false
      this.init(this.options)
    },
    methods: {
      init: function(options){
        
        let that = this;
        if(options.format){
          options.format=options.format.toLocaleLowerCase();
          
          that.getList(that.myDate);
        }else{
          console.log("未设置时间格式")
          return;
        }
      },
      checkformat: function(options){
        let that = this;
        options.format=options.format.toLocaleLowerCase();
        let val=options.format;
        
        let formatarr=val.split(" ")
        if(formatarr.length>=2){
          that.showhmsstatus=true;
          if(formatarr[1]=="hh:mm"){
            that.hmscon.sstatus=false;
            return 'dayhm'
          }
          if(formatarr[1]=="hh"){
            that.hmscon.sstatus=false;
            that.hmscon.mstatus=false;
            return 'dayh'
          }
          return 'dayhms'
        }else if(formatarr[0]=='yyyy-mm-dd'||formatarr[0]=='yyyy/mm/dd'){
          that.showdaystatus=true
          that.showhmsstatus=false
          return 'day'
        }else{
          that.showday=false;
          that.showdaystatus=false;
          that.showhms=true;
          that.showhmsstatus=true;
          if(formatarr[0]=="hh:mm"){
            that.hmscon.sstatus=false;
            return 'hm'
          }
          if(formatarr[0]=="hh"){
            that.hmscon.sstatus=false;
            that.hmscon.mstatus=false;
            return 'h'
          }
          return 'hms'
        }
        
      },
      setClass(data) {
        let obj = {};
        obj[data.markClassName] = data.markClassName;
        return obj;
      },
      selhms: function(index,type){
        let that = this;
        if(type=='h'){
          that.curhour=index>=10?index:'0'+index;
        }
        if(type=='m'){
          that.curmin=index>=10?index:'0'+index;
        }
        if(type=='s'){
          that.cursec=index>=10?index:'0'+index;
        }
      },
      clickDay: function (item, index) {
        let that = this;
        if(item.otherMonth){
          return;
        }
        if (!(this.isHideOtherday && item.nextDayShow) && !item.dayHide) {
          that.curdaytem=item.date;
          if(that.options.format.match(/-/g)){
            that.curdaytem=item.date.replace(/\//g,"-")
          }else{
            that.curdaytem=item.date;
          }
          if(that.showhmsstatus){
            that.showhms=true;
            that.showday=false;
          }else{
            that.options.curtime=that.curdaytem;
          }
        }
        if (item.otherMonth) {
          item.otherMonth < 0 ? this.PreMonth(item.date) : this.NextMonth(item.date);
        } else {
          if (!(this.isHideOtherday && item.nextDayShow) && !item.dayHide) {
            for (let i = 0; i < this.list.length; i++) {
              if (i == index) {
                this.list[i].isToday = true;
              } else {
                this.list[i].isToday = false;
              }
            }
          }
        }
      },
      getcurtime: function(){
        let that = this;
        if(that.curtimeformat==(that.showdaystatus?'dayh':'h')){
          that.options.curtime=(that.showdaystatus?(that.curdaytem+" "):"")+that.curhour 
          return;
        }
        if(that.curtimeformat==(that.showdaystatus?'dayhm':'hm')){
          that.options.curtime=(that.showdaystatus?(that.curdaytem+" "):"")+that.curhour+":"+that.curmin
          return;
        }
        if(that.curtimeformat==(that.showdaystatus?'dayhms':'hms')){
          that.options.curtime=(that.showdaystatus?(that.curdaytem+" "):"")+that.curhour+":"+that.curmin+":"+that.cursec
          return;
        }
      },
      ChoseMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myDate = new Date(date);
        this.$emit('changeMonth', this.dateFormat(this.myDate));
        this.getList(this.myDate, date, isChosedDay);
      },
      PreMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myDate = this.getPreMonth(this.myDate);
        this.$emit('changeMonth', this.dateFormat(this.myDate));
        this.getList(this.myDate, date, isChosedDay);
      },
      NextMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myDate = this.getNextMonth(this.myDate);
        this.$emit('changeMonth', this.dateFormat(this.myDate));
        this.getList(this.myDate, date, isChosedDay);
      },
      getPreMonth: function (date) {
        let timeArray = this.dateFormat(date).split('/');
        let year = timeArray[0];
        let month = timeArray[1];
        let day = timeArray[2];
        let days = new Date(year, month, 0);
        days = days.getDate();
        let year2 = year;
        let month2 = parseInt(month) - 1;
        if (month2 == 0) {
          year2 = parseInt(year2) - 1;
          month2 = 12;
        }
        let day2 = day;
        let days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }
        if (day2 < 10) {
          day2 = '0' + day2;
        }
        let t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
      },
      getNextMonth: function (date) {
        let arr = this.dateFormat(date).split('/');
        let year = arr[0]; //获取当前日期的年份
        let month = arr[1]; //获取当前日期的月份
        let day = arr[2]; //获取当前日期的日
        let days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        let year2 = year;
        let month2 = parseInt(month) + 1;
        if (month2 == 13) {
          year2 = parseInt(year2) + 1;
          month2 = 1;
        }
        let day2 = day;
        let days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }
        if (day2 < 10) {
          day2 = '0' + day2;
        }
        let t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
      },
      getDaysInOneMonth: function (date) {//当前月的天数
        let getyear = date.getFullYear();
        let getmonth = date.getMonth() + 1;
        let d = new Date(getyear, getmonth, 0);
        return d.getDate();
      },
      getMonthweek: function (date) { //向前空几个
        let getyear = date.getFullYear();
        let getmonth = date.getMonth() + 1;
        let dateOne = new Date(getyear + '/' + getmonth + '/1');
        return dateOne.getDay() == 0 ? 6 : dateOne.getDay() - 1;
      },
      getList: function (date, chooseDay, isChosedDay = true) {
        const mygetMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        this.dateTop = date.getFullYear() + '年' + mygetMonth + '月';
        let array = [];
        const onMonthDays = this.getDaysInOneMonth(date);
        for (let i = 0; i < onMonthDays; i++) {
          const nowTime = date.getFullYear() + '/' + (date.getMonth()>=9?date.getMonth() + 1:'0'+(date.getMonth() + 1)) + '/' + (i>=9?i + 1:'0'+(i+1));
          let markClassName = "";
          for (const k of this.markList) {
            k.date=k.date.replace(/-/g,"/")
            if (new Date(k.date).getTime() == new Date(nowTime).getTime()) {
              markClassName = k.className;
            }
          }
          let listObj = {
            id: i + 1,
            date: nowTime,
            isMark: this.markDate.indexOf(nowTime) >= 0,
            dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
            markClassName: markClassName,
            nextDayShow:
              new Date(nowTime).getTime() >
              new Date().getTime()
          }
          if (this.dateFormat(new Date(this.myDate)) == this.dateFormat(new Date(nowTime)) && !chooseDay) {
            listObj = Object.assign(listObj, {
              isTodayNow: true,
              isToday: true,
            })
            this.$emit(
              'isToday',
              this.dateFormat(nowTime)
            );
          }
          else {
            listObj = Object.assign(listObj, {
              isTodayNow: false,
              isToday: chooseDay == nowTime && isChosedDay
            })
          }
          array.push(listObj);
        }
        const leftArr = this.getLeftArr(date);
        const rightArr = this.getRightArr(date, array);
        array = [...leftArr, ...array, ...rightArr];
        this.list = array;
      },
      getLeftArr: function (date) {
        let array = [];
        const leftNum = this.getMonthweek(date);
        const num = this.getDaysInOneMonth(this.getPreMonth(date)) - leftNum + 1;
        const preDate = this.getPreMonth(date);
        //上个月多少开始
        for (let i = 0; i < leftNum; i++) {
          const nowTime = preDate.getFullYear() + '/' + (preDate.getMonth() + 1) + '/' + (num + i);
          array.push(
            {
              id: num + i,
              date: nowTime,
              dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
              nextDayShow:
                new Date(nowTime).getTime() >
                new Date().getTime(),
              otherMonth: -1
            });
        }
        return array;
      },
      getRightArr: function (date, arr) {
        let array = [];
        const nextDate = this.getNextMonth(date);
        const _length = 7 - arr.length % 7;
        //向后添加数据
        if (_length < 7) {
          for (let i = 0; i < _length; i++) {
            const nowTime = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1);
            array.push({
              id: i + 1,
              date: nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1),
              dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
              nextDayShow:
                new Date(nowTime).getTime() >
                new Date().getTime(),
              otherMonth: 1
            });
          }
        }
        return array;
      },
      dateFormat: function (date) {
        date = new Date(date)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      }
    },
    mounted() {
      //this.getList(this.myDate);
    },
    watch: {
      markDate(val, oldVal) {
        this.getList(this.myDate);
      },
      markList(val, oldVal) {
        this.getList(this.myDate);
      }
    }
  };