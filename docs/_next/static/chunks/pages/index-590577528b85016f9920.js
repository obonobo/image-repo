(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4808:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return y}});var r=t(5893),i=t(9163),a=t(809),o=t.n(a),u=t(2447),c=t(282),s=t(6084),l=t(9669),d=t.n(l),f=t(7294),p=t(2557),h=function(){var e=(0,u.Z)(o().mark((function e(n,t){var r,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=d()({method:"post",url:(0,p.uH)("/images"),headers:{"Content-Type":"application/json"},data:{file:{filename:n,bytes:t}}}),e.next=3,r;case 3:return i=e.sent,e.abrupt("return",i.data);case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),m=i.ZP.div.withConfig({displayName:"UploadFile__Root",componentId:"x0jnfu-0"})(["flex:unset;max-width:90vw;min-width:590px;height:8em;margin:1em 0;border-radius:1em;border:1px solid rgba(128,128,128,0.521);padding:1em;display:flex;place-content:center;place-items:center;& > span{margin-right:0.5em;}"]),v=(0,i.ZP)(c.Z).attrs({variant:"contained",color:"secondary",component:"label"}).withConfig({displayName:"UploadFile__UploadButtonBase",componentId:"x0jnfu-1"})(["height:2em;"]),w=function(e){var n=e.refresh,t=void 0===n?function(){}:n,i=(0,f.useRef)(null),a=(0,f.useCallback)((function(){return i.current&&i.current.click()}),[i]),o=(0,f.useCallback)((function(e){e.stopPropagation(),e.preventDefault();var n,r=e.target.files[0];(n=r,new Promise((function(e,t){var r=new FileReader;r.readAsDataURL(n),r.onload=function(){return e(r.result)},r.onerror=function(e){return t(e)}}))).then((function(e){h(r.name,e).then(t).catch((function(e){return console.error(e)}))})).catch((function(e){return console.error(e)}))}),[t]);return(0,r.jsx)(m,{children:(0,r.jsx)("span",{children:(0,r.jsxs)(v,{onClick:a,children:["Upload File",(0,r.jsx)("input",{hidden:!0,ref:i,type:"file",onChange:o})]})})})},x=function(){var e=(0,u.Z)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d().get((0,p.uH)("/images"));case 3:return n=e.sent,console.log(n.data.data),e.abrupt("return",n.data.data.map((function(e){return{id:e.file,name:e.file,size:e.size,lastModified:e.lastModified,downloadLink:(0,p.uH)("/images/".concat(e.file))}})));case 8:return e.prev=8,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),g=function(e){var n=e.link;return(0,r.jsx)(c.Z,{variant:"outlined",color:"secondary",href:n,children:"Download"})},_=[{field:"name",headerName:"Name",width:130},{field:"size",headerName:"Size",width:130},{field:"lastModified",headerName:"Last Modified",width:200},{field:"downloadLink",headerName:"Download",disableClickEventBubbling:!0,width:130,renderCell:function(e){var n=e.value;return(0,r.jsx)(g,{link:n})}}],j=(0,i.ZP)(s._$r).attrs({columns:_}).withConfig({displayName:"FileGrid__FileGridBase",componentId:"sc-1ejhzoz-0"})(["&&&{flex:unset;max-width:90vw;min-width:590px;height:70vh;margin:0;}"]),k=function(){var e=(0,f.useState)([]),n=e[0],t=e[1],i=(0,f.useCallback)((function(){x().then((function(e){console.log(e),t(e)}))}),[t]);return(0,f.useEffect)((function(){i();var e=setTimeout(i,3e3);return function(){return clearTimeout(e)}}),[i]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w,{refresh:i}),(0,r.jsx)(j,{rows:n})]})},b=i.ZP.div.withConfig({displayName:"pages__Content",componentId:"wp8vpb-0"})(["justify-content:center;flex-direction:column;justify-items:center;display:flex;& > *{margin-top:7rem;}"]),y=function(){return(0,r.jsx)("main",{children:(0,r.jsx)(b,{children:(0,r.jsx)(k,{})})})}},2557:function(e,n,t){"use strict";t.d(n,{uH:function(){return a},Vc:function(){return o}});var r=t(4155),i={invokeUrl:"https://2z7v041j87.execute-api.us-east-1.amazonaws.com/dev/"},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";return"".concat(i.invokeUrl).concat(e)},o=r.env.ASSET_PREFIX||""},5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(4808)}])}},function(e){e.O(0,[774,314,351,163,171],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);