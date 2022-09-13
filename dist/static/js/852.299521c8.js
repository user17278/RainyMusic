"use strict";(self["webpackChunkrainymusic"]=self["webpackChunkrainymusic"]||[]).push([[852],{852:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"reg-user-page-mask",on:{click:function(t){return t.target!==t.currentTarget?null:e.clickOtherAreaToClose.apply(null,arguments)}}},[s("div",{staticClass:"reg-user-page"},[e._m(0),s("div",{staticClass:"user-name"},[s("button",{ref:"loginNext",staticClass:"reg-user-next"},[s("i",{staticClass:"fa fa-angle-right",attrs:{"aria-hidden":"true"}})]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],ref:"userIdInput",attrs:{type:"text",placeholder:"请输入1-10位的用户名 "},domProps:{value:e.userName},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.idCheck(e.userName)},input:function(t){t.target.composing||(e.userName=t.target.value)}}}),s("router-view")],1),s("div",{staticClass:"user-tips"},[e._v(e._s(e.checkTip))]),s("button",{directives:[{name:"show",rawName:"v-show",value:e.userPassword,expression:"userPassword"}],ref:"regBtn",staticClass:"reg-btn",on:{click:e.regUser}},[e._v("注 册 "),s("i",{staticClass:"fa fa-angle-double-right",attrs:{"aria-hidden":"true"}})]),s("div",{staticClass:"reg-tips"},[s("div",{staticClass:"separator"}),e._m(1),e._m(2),s("div",[e._v("我已有 RainyMusic ID。 "),s("router-link",{attrs:{to:"/login"}},[e._v("马上登录 "),s("i",{staticClass:"fa fa-angle-double-right",attrs:{"aria-hidden":"true"}})])],1)])])])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"reg-user-title"},[s("span",[e._v("注册")]),s("span",[e._v("RainyMusic ID")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"privacy-img"},[i("img",{attrs:{src:s(518),alt:""}})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"privacy-tips"},[e._v("您的 RainyMusic ID 信息被用于确保您能够安全登录并访问您的数据。"),s("a",{attrs:{href:""}},[e._v("了解数据的管理方式。")])])}],a={name:"RegUser",data(){return{userName:"",userPassword:"",checkTip:""}},methods:{idCheck:function(e){this.$axios.post("http://127.0.0.1:3000/user/regUserNameCheck",{username:e}).then((e=>{this.checkTip=e.data.message,this.checkTip||(this.$refs.userIdInput.style.borderBottomLeftRadius="0px",this.$refs.userIdInput.style.borderBottomRightRadius="0px",this.$router.push({name:"regPassword"}),this.$refs.loginNext.style.top="45px")}))},regUser(){this.$axios.post("http://127.0.0.1:3000/user/userReg",{username:this.userName,password:this.userPassword}).then((e=>{console.log(this.userName),this.$router.push({name:"regSuccess",params:{username:this.userName}})}))},clickOtherAreaToClose:function(){this.$router.push("/")}},mounted(){this.$bus.$on("getPwdMsg",((e,t)=>{this.checkTip=e,this.userPassword=t}))}},u=a,c=s(1),n=(0,c.Z)(u,i,r,!1,null,"11c774d9",null),l=n.exports},518:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAsCAMAAAD2FNAsAAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkQ2QUIzRkQ0NEU0MTFFOEIxOUJGNDk3QTI1QjA5RDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkQ2QUIzRkU0NEU0MTFFOEIxOUJGNDk3QTI1QjA5RDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRDZBQjNGQjQ0RTQxMUU4QjE5QkY0OTdBMjVCMDlENiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRDZBQjNGQzQ0RTQxMUU4QjE5QkY0OTdBMjVCMDlENiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiiTWBsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAOVBMVEUAev8Aev8Aev8Aev8Aev8Aev8Aev9HcEwAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev+VHsjdAAAAEnRSTlNmDIZZb+4pAHpiRRg43VCql72+Oec6AAAB6klEQVRIx62W25KEIAxEA0RM5Cr//7GLzoiAYG1tbb9MzeVUIN2JA+tXWu7L4uK2jmU2xaw2c72H7yulr4IYYZ4IEYloa7mYitwAVBIYAJhR+ppTqVJ4YFYe1CmWtuKWmku6wwQiFA7x5myDJdmXo1Iui3ThZMvtHbcR1NxWuNhyru9KzfHvOT+rxy0X3u7HZAtnWo47Trf1zO1DqLHlYTzfBZl85Z+oDXxG1BDyhZGoc6ZdwWAQT53jeXKSTJtrEz8ldzscB+GPUBN60c1D/moDZL3OZLTV+r45rH/TxXFwbpf65ZfCHpNrG87sE+uqc6LMo0sSqn4K92LCZQV9JpdQFG6fZ/POdnFQXZxPr65/yt0BPbtwcO59S/TRRvhwWxPqZXLMbuKhC3VKo8AIbCbXH5xY3rfLc8Ngbil0xxx3tJ14zgeFfiml5N+6ea0KqM2bFVTNMTOnMud6LsXX2x0X5BVMekp2GPRCA9uAq6fX5J5wz5EGSEPtcAyp0XnOnxiQBUozhbwAaEQdOxvinLMKJiIPYcrtQOXZxV09D0/7KmPy9/mcBH1hVE8OTai5fEVlNPUGghuYZ+P308gEx3+I33B0Do4GGUP02gyeLCe3vIdl/U+OM/e0bTS3Ehvlp0xYOuGoHnIj9D863lG9zwFCHAAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=852.299521c8.js.map