(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{12:function(e,n,t){e.exports=t(22)},21:function(e,n,t){},22:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),c=t(11),u=t.n(c),o=t(8),l=t(3),i=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,c=e.handleNameChange,u=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("h1",null,"add a new"),r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:c}),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u}))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.filterByName;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n}))},s=function(e){var n=e.persons,t=e.filter,a=e.filteredName,c=e.deletePerson;return r.a.createElement("div",null,t?a.map((function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number)})):n.map((function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return c(e.id,e.name)}},"delete"))})))},d=t(24),f="/api/persons",b=function(){return d.a.get(f).then((function(e){return e.data}))},h=function(e){return d.a.post(f,e).then((function(e){return e.data}))},v=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(e){return e}))},E=function(e){var n=e.message,t=e.type;return"success"===t?r.a.createElement("div",{className:"success"},n):"error"===t?r.a.createElement("div",{className:"error"},n):null},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),d=Object(l.a)(u,2),f=d[0],j=d[1],O=Object(a.useState)(""),g=Object(l.a)(O,2),w=g[0],N=g[1],y=Object(a.useState)([]),k=Object(l.a)(y,2),C=k[0],S=k[1],P=Object(a.useState)(""),B=Object(l.a)(P,2),D=B[0],I=B[1],J=Object(a.useState)(""),x=Object(l.a)(J,2),A=x[0],L=x[1],T=Object(a.useState)(""),U=Object(l.a)(T,2),q=U[0],z=U[1];Object(a.useEffect)((function(){b().then((function(e){c(e)}))}),[]);var F=function(e,n){L(e),z(n),setTimeout((function(){L(null),z("")}),3e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:A,type:q}),r.a.createElement(m,{filterByName:function(e){var n=e.target.value;I(n),S(t.filter((function(e){return e.name.toLowerCase().includes(n)})))}}),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===f}));if(0===n.length)h({name:f,number:w}).then((function(e){c(t.concat(e)),j(""),N(""),F("Added ".concat(f),"success")})).catch((function(e){return F(e.response.data.error,"error")}));else if(window.confirm("".concat(f," is already added to phonebook,replace the old number with new one?"))){var a=Object(o.a)(Object(o.a)({},n[0]),{},{number:w});console.log(a),v(n[0].id,a).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),F("Updated ".concat(n[0].name,"'s number"),"success"),j(""),N("")})).catch((function(e){return F(e.response.data.error,"error")}))}},newName:f,newNumber:w,handleNameChange:function(e){j(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:t,filter:D,filteredName:C,deletePerson:function(e,n){window.confirm("Delete ".concat(n," ?"))&&p(e).then((function(a){F("Deleted ".concat(n),"error");var r=t.filter((function(n){return n.id!==e}));c(r)})).catch((function(e){F("Information of ".concat(n," has already been removed from server"),"error")}))}}))};t(21);u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.f6e63379.chunk.js.map