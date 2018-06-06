<template>
    <div class="content">
        <div class="example">
            <h5>时间格式：{{options.format}} </h5>
            <p>时间：{{options.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options"></Datepicker>
        </div>

        <div class="example">
            <h5>时间格式：{{options1.format}} </h5>
            <p>时间：{{options1.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options1"></Datepicker>
        </div>

        <div class="example">
            <h5>时间格式：{{options2.format}} </h5>
            <p>时间：{{options2.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options2"></Datepicker>
        </div>

        <div class="example">
            <h5>时间格式：{{options3.format}} </h5>
            <p>时间：{{options3.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options3"></Datepicker>
        </div>

        <div class="example">
            <h5>时间格式：{{options4.format}} </h5>
            <p>时间：{{options4.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options4"></Datepicker>
        </div>

        <div class="example">
            <h5>时间格式：{{options5.format}} </h5>
            <p>时间：{{options5.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options5"></Datepicker>
        </div>

        <div class="example">
            <h5>时间格式：{{options6.format}} </h5>
            <p>时间：{{options6.curtime}}</p>
            <Datepicker ref="Datepicker" :options.asyn="options6"></Datepicker>
        </div>
    </div>
</template>

<script>
    import Datepicker from '../vueDatepicker/index';
    export default {
        data() {
            return {

                options:{
                    curtime:"2018/06/10 10:02:03",  //为空时，获取当前时间  （参数是必须项，但可以不赋值）
                    format:"yyyy/mm/dd hh:mm:ss",   //时间格式   （必选项）
                    isHideOtherday:false,           //是否禁止选择未标记的日期（true禁止)  （可选项）
                    markList:[                  //需要标记的日期和自定义的标记样式只能为某日标记，不能添加时分秒 （可选项）
                        {
                            date: '2018-06-02', //日期
                            className: "label1"  //自定义class选择器名称
                        }, {
                            date: '2018/4/2',
                            className: "label1"
                        }, {
                            date: '2018/06/13',
                            className: "label2"
                        }
                    ]
                },
                options1:{
                    curtime:"2018-06-10 10:02:03",
                    format:"yyyy-mm-dd hh:mm:ss",
                    markList:[
                        {
                            date: '2018-06-05',
                            className: "label1"
                        }
                    ]
                },
                options2:{
                    curtime:"",
                    curtime:"2018-06-13",
                    format:"yyyy-mm-dd",
                },
                options3:{
                    curtime:"10:02:45",
                    format:"hh:mm:ss",
                    isHideOtherday:true
                },
                options4:{
                    curtime:"2018-06-10 09",
                    format:"yyyy-mm-dd hh",
                },
                options5:{
                    curtime:"2018-06-10 09:53",
                    format:"yyyy-mm-dd hh:mm"
                },
                options6:{
                    curtime:"09:53",
                    format:"hh:mm"
                },
            }
        },
        watch:{
            'options.curtime':function(){
                console.log("66666666")
                console.log(this.options.curtime)
                //alert(this.options.curtime)
            },
            'options1.curtime':function(){
                console.log("66666666")
                console.log(this.options1.curtime)
                //alert(this.options1.curtime)
            },
            'options2.curtime':function(){
                console.log("66666666")
                console.log(this.options2.curtime)
                //alert(this.options2.curtime)
            },
            'options3.curtime':function(){
                console.log("66666666")
                console.log(this.options3.curtime)
                //alert(this.options3.curtime)
            },
            'options4.curtime':function(){
                console.log("66666666")
                console.log(this.options4.curtime)
                //alert(this.options.curtime)
            },
            'options5.curtime':function(){
                console.log("66666666")
                console.log(this.options5.curtime)
            },
            'options6.curtime':function(){
                console.log("66666666")
                console.log(this.options6.curtime)
            }
        },
        components: {
            Datepicker
        },
        methods: {
            
        },
        created() {
        }
    }
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
    h3 {
        text-align: center;
        width: 90%;
        margin: auto;
    }
    .example{
        position:relative;
        float:left;
        width:500px;
        margin:20px;
    }

    .example h5{
        line-height: 30px;
    }
    .example p{
        line-height: 30px;
    }

    .div {
        margin: auto;
        width: 220px;
        height: 44px;
        line-height: 44px;
        background: #0fc37c;
        color: #fff;
        font-size: 17px;
        text-align: center;
        margin-top: 20px;
    }

    .label1 {
        background-color: red;
    }

    .label2 {
        background-color: blue;
    }
</style>