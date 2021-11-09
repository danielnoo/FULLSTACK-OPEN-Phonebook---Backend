(this["webpackJsonpreact-phonebook"]=this["webpackJsonpreact-phonebook"]||[]).push([[0],{22:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var c=n(1),r=n.n(c),a=n(17),o=n.n(a),i=(n(22),n(8)),u=n(3),s=n(0),j=function(t){var e=t.entry,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(s.jsxs)("li",{className:"note",children:[e.name,e.number,Object(s.jsx)("button",{onClick:n,children:c})]})},l=function(t){var e=t.message;return null===e?null:Object(s.jsx)("div",{className:"error",children:e})},b=function(){return Object(s.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(s.jsx)("br",{}),Object(s.jsx)("em",{children:"Phonebook app created alongside University of Helsinki's Fullstack open"})]})},f=n(6),m=n.n(f),d="/api/persons",p={getAll:function(){return m.a.get(d).then((function(t){return t.data}))},create:function(t){return m.a.post(d,t).then((function(t){return t.data}))},update:function(t,e){return m.a.put("".concat(d,"/").concat(t),e).then((function(t){return t.data}))}},O=p,h=function(){var t=Object(c.useState)([]),e=Object(u.a)(t,2),n=e[0],r=e[1],a=Object(c.useState)(""),o=Object(u.a)(a,2),f=o[0],m=o[1],d=Object(c.useState)(""),p=Object(u.a)(d,2),h=p[0],x=p[1],g=Object(c.useState)(!1),v=Object(u.a)(g,2),k=v[0],S=v[1],y=Object(c.useState)(null),w=Object(u.a)(y,2),C=w[0],E=w[1],I=Object(c.useState)([]),A=Object(u.a)(I,2),D=A[0],J=A[1];Object(c.useEffect)((function(){O.getAll().then((function(t){r(t)}))}),[]);var M=function(t){"name"===t.target.name?x(t.target.value):m(t.target.value)};return Object(c.useEffect)((function(){var t=k?n:n.filter((function(t){return t.important}));J(t)}),[k,n]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Phonebook Entries - wow!"}),Object(s.jsx)(l,{message:C}),Object(s.jsx)("div",{children:Object(s.jsxs)("button",{onClick:function(){return S(!k)},children:["show ",k?"important":"all"]})}),Object(s.jsx)("ul",{children:D.map((function(t){return Object(s.jsx)(j,{entry:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(i.a)(Object(i.a)({},e),{},{important:!e.important});O.update(t,c).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(t){E("".concat(t.response.data.error)),setTimeout((function(){E(null)}),5e3)}))}(t.id)}},t.id)}))}),Object(s.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={name:h,number:f,date:(new Date).toISOString(),important:Math.random()>.5};O.create(e).then((function(t){r(n.concat(t)),m(""),x("")})).catch((function(t){E("".concat(t.response.data.error)),console.log(t.response.data.error),setTimeout((function(){E(null)}),5e3)}))},children:[Object(s.jsx)("input",{name:"name",type:"name",value:h,onChange:M}),Object(s.jsx)("input",{name:"number",type:"number",value:f,onChange:M}),Object(s.jsx)("button",{type:"submit",children:"save"})]}),Object(s.jsx)(b,{})]})};o.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(h,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.0f3ca086.chunk.js.map