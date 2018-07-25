

<template>
  <section class="date_container">
    <div class="date_content_all" v-if="showday">

      <div class="date_top_changge">
        <li @click="PreMonth()">
          <div class="date_jiantou1"></div>
        </li>
        <li class="date_content_li">{{dateTop}}</li>
        <li @click="NextMonth()">
          <div class="date_jiantou2"></div>
        </li>
      </div>

      <div class="date_content">
        <div class="date_content_item" v-for="tag in textTop">
          <div>
            {{tag}}
          </div>
        </div>
      </div>

      <div class="date_content">
        <div class="date_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <div>
            <li class="date_nextDayShow" v-if="(isHideOtherday&&item.nextDayShow)||item.otherMonth||item.dayHide" v-bind:class="[{isToday_now:item.isTodayNow},setClass(item)]">
              {{item.id}}
            </li>
            <li v-else="(isHideOtherday&&item.nextDayShow)||item.otherMonth||item.dayHide" v-bind:class="[{ wh_isToday: item.isToday,wh_isMark:item.isMark,isTodayNow:item.isTodayNow},setClass(item)]">
              {{item.id}}
            </li>
          </div>
        </div>
      </div>
    </div>

    <div class="date_content_hms" v-if="showhms">
      <div class="back" title="back" @click.stop="showhms=false,showday=true" v-if="showdaystatus"></div>
      <div class="next" title="enter" @click.stop="getcurtime"></div>
      <div class="date_content_hms_tit">
        <ul v-if="hmscon.hstatus">
          <li>时</li>
          <li>{{curhour}}</li>
        </ul>
        <ul v-if="hmscon.mstatus">
          <li>分</li>
          <li>{{curmin}}</li>
        </ul>
        <ul v-if="hmscon.sstatus">
          <li>秒</li>
          <li>{{cursec}}</li>
        </ul>
      </div>
      <div class="date_content_hms_list">
        <ul v-if="hmscon.hstatus">
          <li v-for="(ele,index) in hmscon.hours" @click.stop="selhms(index,'h')" :class="{'on':index==curhour}">{{index>9?index:"0"+index}}</li>
        </ul>
        <ul v-if="hmscon.mstatus">
          <li v-for="(ele,index) in hmscon.minutes" @click.stop="selhms(index,'m')" :class="{'on':index==curmin}">{{index>9?index:"0"+index}}</li>
        </ul>
        <ul v-if="hmscon.sstatus">
          <li v-for="(ele,index) in hmscon.seconds" @click.stop="selhms(index,'s')" :class="{'on':index==cursec}">{{index>9?index:"0"+index}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="css" scoped>@import './datepicker.css';</style>
<script src="./datepicker.js"></script>