"use strict";(self["webpackChunkrainymusic"]=self["webpackChunkrainymusic"]||[]).push([[846],{846:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{directives:[{name:"model",rawName:"v-model",value:e.pwdInput,expression:"pwdInput"}],attrs:{type:"password"},domProps:{value:e.pwdInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.pwdCheck(e.pwdInput)},input:function(t){t.target.composing||(e.pwdInput=t.target.value)}}})},s=[],r={name:"RegPassword",data:function(){return{pwdInput:""}},methods:{pwdCheck:function(e){var t=this;this.$axios.post("/user/regPasswordCheck",{password:e}).then((function(n){t.$bus.$emit("getPwdMsg",n.data.message,e)}))}}},a=r,p=n(1001),i=(0,p.Z)(a,u,s,!1,null,null,null),o=i.exports}}]);