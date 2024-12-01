(function(s,p){typeof exports=="object"&&typeof module<"u"?module.exports=p(require("mithril")):typeof define=="function"&&define.amd?define(["mithril"],p):(s=typeof globalThis<"u"?globalThis:s||self,s.ModernCalendar=p(s.m))})(this,function(s){"use strict";const p={view:function(){return s(".hourList",Array.from({length:24},(n,t)=>{const e=String(t).padStart(2,"0");return s(".hour-item",`${e}:00`)}))}},E={view:function(n){return s(".popup after",[s(".popup-content minimize-scrollbar",[s("span",`+ ${n.attrs.events.length} events`),s(".more-events",n.attrs.events.map(t=>s(".more-event",[s("p",t.title),s("p.event-datetime",[s("span",`${formatDate(t.startDate)}`),s("",`${formatHour(new Date(t.startDate))} à ${formatHour(new Date(t.endDate))}`)])]))),s("i.fas.fa-xmark",{onclick:n.attrs.onClose})])])}},m={view:function(n){return s(".see-more-btn.flex after",{onclick:n.attrs.onClick},[s("i.far.fa-plus"),s("p",`${n.attrs.length} events`)])}},F={oninit:function(n){this.showPopup=!1},view:function(n){return n.attrs.events.length>0&&s(".see-more-container",[s(m,{onClick:()=>{this.showPopup=!this.showPopup},length:n.attrs.events.length}),this.showPopup&&s(E,{visible:this.showPopup,events:n.attrs.events,onClose:()=>{this.showPopup=!1}})])}},O={view:function(n){const t=[];for(let e=0;e<24;e++)t.push(s(".see-more-grid-cell.after",{key:e},s(F,{events:n.attrs.moreCases[e]})));return s(".see-more-grid",t)}},P={resetDisplayedEvents(){this.displayedEvents.clear()},getEventKey(n,t){return`${n.title}-${n.startDate}-${n.endDate}-${t}`},createEventVNode(n,t,e,a){return s(".event",{style:t,key:`event-${e}-${a}`},[s("span",n.title),s("p",[s("span",formatDateForDayEvent(n.startDate)),s("span"," à "),s("span",formatDateForDayEvent(n.endDate))])])},view(n){this.displayedEvents=new Set,this.resetDisplayedEvents();const t=[];return n.attrs.day.cases.forEach((e,a)=>{e.forEach((r,i)=>{if(r){const l=this.getEventKey(r,i);if(this.displayedEvents.has(l))return;this.displayedEvents.add(l);let c=r.endDate?n.attrs.day.findPosition(r.endDate):1;c=c==0?96:c;const o=n.attrs.day.buildEventStyle(r,a,c);t.push(this.createEventVNode(r,o,a,i))}})}),s(".events.calendar-grid",t)}},A={renderCell:function(n,t){let e="";return e=n%4===0?" active after":"",e+=n===95?" bottom":"",s(".calendar-grid-cell",{key:n,class:e})},view:function(n){const t=[];return n.attrs.day.cases.forEach((e,a)=>{e.forEach((r,i)=>{t.push(this.renderCell(a,i))})}),s(".grid-container",[s(".calendar-grid.grid-background",[t,s(P,n.attrs)]),s(O,{moreCases:n.attrs.day.seemoreCases})])}};function w(n){const t=Date.parse(n);return!isNaN(t)}function v(n){return new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds())}class S{constructor(){this._events=null,this._cases=null,this._date=null,this._cases=Array(96).fill(null).map(()=>Array(3).fill(null)),this._seemoreCases=Array(24).fill(null).map(()=>[])}isCurrentDayEvent(t){if(!t.startDate||!w(t.startDate)||t.endDate&&!w(t.endDate))return!1;const e=v(new Date(t.startDate+"Z")),a=v(new Date(t.endDate+"Z")),r=this._date,i=o=>o.getDate()===r.getDate()&&o.getMonth()===r.getMonth()&&o.getFullYear()===r.getFullYear(),l=o=>o.getFullYear()>r.getFullYear()||o.getFullYear()===r.getFullYear()&&o.getMonth()>r.getMonth()||o.getFullYear()===r.getFullYear()&&o.getMonth()===r.getMonth()&&o.getDate()>r.getDate(),c=o=>o.getFullYear()<r.getFullYear()||o.getFullYear()===r.getFullYear()&&o.getMonth()<r.getMonth()||o.getFullYear()===r.getFullYear()&&o.getMonth()===r.getMonth()&&o.getDate()<r.getDate();return i(e)?!0:c(e)&&(i(a)||l(a))}findPosition(t){const e=v(new Date(t)),a=v(new Date(this._date.getTime()));a.setHours(0,0,0);const r=new Date(this._date.getTime());if(r.setHours(23,59,59),e<a||e>r)return 0;const i=e.getHours()*60+e.getMinutes();return e.getMinutes()%15!=0?Math.floor(i/15)+1:Math.floor(i/15)}fillCases(t,e,a){let r=-1;e==a&&a++,t.endDate&&v(new Date(t.endDate)).getMinutes()%15!=0&&a++;for(let i=0;i<3;i++){let l=!0;for(let c=e;c<a;c++)if(this._cases[c][i]){l=!1;break}if(l){r=i;break}}if(r!=-1)for(let i=e;i<a;i++)this._cases[i][r]=t;else{let i=Math.floor(e/4);this._seemoreCases[i]||(this._seemoreCases[i]=[]),this._seemoreCases[i].push(t)}}buildEventStyle(t,e,a){const i=new Set;for(let d=e;d<a;d++)this._cases[d].forEach(f=>{f!==null&&i.add(f)});const l=Math.floor(3/Math.min(i.size,3));let o=this._cases[e].indexOf(t)*l+1;const u=Math.min(o+l,4),D=`grid-row: ${e+1} / ${a+1};`;return`${`grid-column: ${o} / ${u};`} ${D}`}update(t){if(t){if(t.date&&!(t.date instanceof Date))throw new Error(DateParamError);if(!t.events||!Array.isArray(t.events)||!t.events.every(e=>typeof e=="object"))throw new Error(EventsParamError);this._date=t.date instanceof Date?t.date:new Date,this._events=t.events,this._cases=Array(96).fill(null).map(()=>Array(3).fill(null)),this._seemoreCases=Array(24).fill(null).map(()=>[]),this._events.forEach(e=>{if(!this.isCurrentDayEvent(e))return;const a=this.findPosition(e.startDate);if(a==-1)return;let r=e.endDate?this.findPosition(e.endDate):1;r=r==0?95:r,r!=-1&&this.fillCases(e,a,r)})}}getBoardStyle(){return`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(96, 20px);
        border: 1px solid black;
        border-radius: 5px;
        border-top: none;
    `}get date(){return this._date}get cases(){return this._cases}get events(){return this._events}get seemoreCases(){return this._seemoreCases}}const Y={oninit:function(n){this.day=new S,this.day.update({date:n.attrs.date,events:n.attrs.events})},onbeforeupdate:function(n){this.day.update({date:n.attrs.date,events:n.attrs.events})},view:function(n){const{date:t}=n.attrs,e=t.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric"}).split(" ");return e[0]=e[0].replace(".",""),s(".calendar-view",[s(".dayLabel",[s("p.text",e[0]),s("p.number",e[1])]),s(".day minimize-scrollbar",[s(p),s(A,{day:this.day}),s(p)])])}},$={getDayInfo:function(n,t,e,a){let r="",i="";return n<t?(r=a-(t-n-1),i="month-inactive-day"):n>=t&&n<t+e?r=n-t+1:(r=n-t-e+1,i="month-inactive-day"),{day:r,styleClass:i}},renderCell:function(n,t,e,a,r,i,l){const c=n%5===0?" month-grid-border":"",o=Math.floor(n/5)*7+t;if(n%5!==0)return s(".month-grid-cell",{class:c});const{day:u,styleClass:D}=this.getDayInfo(o,r,i,l);let h=`${c} ${D}`;return u===a&&(h+=" current-day"),s(".month-grid-cell",{class:h},s("span",u))},view:function(n){const t=[],e=new Date(n.attrs.date),{year:a,month:r,today:i,isCurrentMonth:l,currentDay:c,firstDay:o,lastDay:u,prevMonthDays:D}=this.getDateInfo(e);return n.attrs.month.cases.forEach((h,d)=>{h.forEach((f,g)=>{t.push(this.renderCell(d,g,e,c,o,u,D))})}),s(".month-grid",t)},getDateInfo:function(n){const t=n.getFullYear(),e=n.getMonth(),a=new Date,r=a.getFullYear()===t&&a.getMonth()===e,i=r?a.getDate():null,l=new Date(t,e,1).getDay(),c=new Date(t,e+1,0).getDate(),o=new Date(t,e,0).getDate();return{year:t,month:e,today:a,isCurrentMonth:r,currentDay:i,firstDay:l,lastDay:c,prevMonthDays:o}}},N={oninit:function(n){n.state.showPopup=!1},view:function(n){return s(".month-see-more-container",{style:n.attrs.style},[s(".see-more-event.flex",{onclick:()=>{n.state.showPopup=!n.state.showPopup}},[s("i.far.fa-plus"),s("p",`${n.attrs.events.length} events`)]),n.state.showPopup&&s(E,{visible:n.state.showPopup,events:n.attrs.events,onClose:()=>{n.state.showPopup=!1}})])}},L={displayedEvents:new Set,resetDisplayedEvents(){this.displayedEvents.clear()},getEventIdentifier(n){return JSON.stringify(n)},createEventVNode(n,t,e,a){const r=n.start===!0?"event-start":"event-continue";return s(".event",{style:t,class:r},[s("span",n.start===!0&&n.event.title)])},view(n){this.resetDisplayedEvents();const t=n.attrs.month,e=[];return t.cases.forEach((a,r)=>{a.forEach((i,l)=>{if(!i||this.displayedEvents.has(JSON.stringify({event:i.event,newline:i.newLine})))return;this.displayedEvents.add(JSON.stringify({event:i.event,newline:i.newLine}));const c=t.buildEventStyle(i.event,l,r);if(Array.isArray(i))e.push(s(N,{style:c,events:i}));else{const o=this.createEventVNode(i,c,r,l);o&&e.push(o)}})}),s(".month-grid month-events-grid .month-events",e)}},T={view:function(n){return s(".month-grid-container minimize-scrollbar",[s($,n.attrs),s(L,n.attrs)])}},b={view:function(){return s(".month-grid-header",[s("div","Dim"),s("div","Lun"),s("div","Mar"),s("div","Mer"),s("div","Jeu"),s("div","Ven"),s("div","Sam")])}};class x{constructor(){this._caseSubdivisions=5,this._cases=Array(6*this._caseSubdivisions).fill(null).map(()=>Array(7).fill(null)),this._date=null}isMonthEvent(t){if(!w(t.startDate))return!1;const e=new Date(this._date.getFullYear(),this._date.getMonth(),1),a=new Date(this._date.getFullYear(),this._date.getMonth()+1,0,23,59,59),r=new Date(t.startDate);if(r>a)return!1;if(t.endDate){if(!w(t.endDate)||new Date(t.endDate)<e)return!1}else if(r<e)return!1;return!0}isMonthEvent(t){const e=t.startDate?new Date(t.startDate):null,a=t.endDate?new Date(t.endDate):null;return!e||!w(t.startDate)||a&&!w(t.endDate)?!1:(i=>i>=this._firstOfMonth&&i<=this._lastOfMonth)(e)&&!a?!0:e>a?!1:e<=this._lastOfMonth&&a>=this._firstOfMonth||a&&a>=this._firstOfMonth&&a<=this._lastOfMonth||e&&e<=this._lastOfMonth&&a&&a>=this._firstOfMonth}findPosition(t){const e=v(new Date(t));return this._firstOfMonth.getDay()+e.getDate()-1}fillCases(t,e,a){const r=Math.floor(e/7),i=e%7,l=Math.floor(a/7),c=a%7;r===l&&i===c?this.placeSingleCase(t,r,i):r===l?this.placeSingleLine(t,r,i,c):this.placeMultipleLines(t,r,i,l,c)}tryPlaceInSpecialCase(t,e,a){let r=!0;for(let i=1;i<4;i++)if(this._cases[e*5+i][a]==null){this._cases[e*5+i][a]={event:t,start:!0,end:!0,newLine:0},r=!1;break}return r}placeSingleCase(t,e,a){if(this.tryPlaceInSpecialCase(t,e,a)){let r=this._cases[e*5+4][a];Array.isArray(r)||(r=[]),r.push(t),this._cases[e*5+4][a]=r}}placeSingleLine(t,e,a,r){let i=!1;for(let l=1;l<4;l++){let c=!0;for(let o=a;o<=r;o++)if(this._cases[e*5+l][o]!=null){c=!1;break}if(c){for(let o=a;o<=r;o++)this._cases[e*5+l][o]={event:t,start:o===a,end:o===r,continuation:o!==a,newLine:0};i=!0;break}}if(!i){let l=!1;for(let c=1;c<4;c++)if(this._cases[e*5+c][a]==null){this._cases[e*5+c][a]={event:t,start:!0,end:!0,newLine:0,continuation:!0},l=!0;break}l||(Array.isArray(this._cases[e*5+4][a])||(this._cases[e*5+4][a]=[]),this._cases[e*5+4][a].push(t))}}placeMultipleLines(t,e,a,r,i){let l=!0,c=null;for(let o=e;o<=r;o++){let u=o===e?a:0,D=o===r?i:6;for(let h=1;h<4;h++){for(let d=u;d<=D;d++)if(this._cases[o*5+h][d]!=null){l=!1;break}if(l&&c==null&&(c=h),!l)break}if(!l)break}if(l)for(let o=e;o<=r;o++){let u=o===e?a:0,D=o===r?i:6;for(let h=u;h<=D;h++)this._cases[o*5+c][h]={event:t,start:o===e&&h===a,end:o===r&&h===i,continuation:!(o===e&&h===a),newLine:o}}else{let o=!1;for(let u=1;u<4;u++)if(this._cases[e*5+u][a]==null){this._cases[e*5+u][a]={event:t,start:!0,end:!0,newLine:0},o=!0;break}o||(Array.isArray(this._cases[e*5+4][a])||(this._cases[e*5+4][a]=[]),this._cases[e*5+4][a].push(t))}}buildEventStyle(t,e,a){var h;let r=0,i=0,l=-1;const c=7;for(let d=a;d<a+this._caseSubdivisions-1;d++)for(let f=0;f<c;f++){let g=t==((h=this._cases[d][f])==null?void 0:h.event);typeof(t==null?void 0:t.index)=="number"&&(g=JSON.stringify(t)==JSON.stringify(this._cases[d][f])),this._cases[d][f]&&g&&(r++,r===1&&(i=f,l=d))}const o=r+i,u=`grid-row: ${l+1} / ${l+2};`;return`${`grid-column: ${i+1} / ${o+1};`} ${u}`}update(t){if(!t||!t.date||!t.events||t.events.length==0)return-1;this._date=t.date,this._firstOfMonth=new Date(this._date.getFullYear(),this._date.getMonth(),1),this._lastOfMonth=new Date(this._date.getFullYear(),this._date.getMonth()+1,0,23,59,59),this._cases=Array(6*this._caseSubdivisions).fill(null).map(()=>Array(7).fill(null)),this._date=null,t.events.forEach(e=>{if(!this.isMonthEvent(e)||!e.startDate)return;const a=this.findPosition(e.startDate),r=e.endDate?this.findPosition(e.endDate):a;this.fillCases(e,a,r)})}get date(){return this._date}get cases(){return this._cases}}const I={oninit:function(n){const{date:t,events:e}=n.attrs;this.month=new x,this.month.update({date:t,events:e})},onbeforeupdate:function(n){const{date:t,events:e}=n.attrs;return t!==this.date||e!==this.events?(this.month.update({date:t,events:e}),!0):!1},view:function(n){const{date:t,events:e}=n.attrs;return s(".month",[s(b),s(T,{date:t,month:this.month})])}},V={getWeekDays:function(){const n=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"],t=new Date,e=t.getDay(),a=new Date(t),r=(e===0?-6:1)-e;return a.setDate(t.getDate()+r),Array.from({length:7},(i,l)=>{const c=new Date(a);c.setDate(a.getDate()+l);const o=n[c.getDay()===0?6:c.getDay()-1],u=String(c.getDate()).padStart(2,"0");return{dayName:o,dayNumber:u}})},view:function(){return s(".weekDaysList",this.getWeekDays().map(n=>s(".day-item",[s("span",n.dayName),s("p",n.dayNumber)])))}},j={view:function(n){return s(".week-grid",Array.from({length:168}).map((e,a)=>s(".week-cell")))}},B={view:function(n){const{date:t,events:e}=n.attrs,a=t.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric"}).split(" ");return a[0]=a[0].replace(".",""),s(".week-view",[s(V),s(".week flex minimize-scrollbar",[s(p),s(j,{day:this.day}),s(p)])])}};class C{static generateGridCells(t){const{weeks:e,days:a,firstDayOfMonth:r,startingDayOfWeek:i,lastDayOfPreviousMonth:l,currentYear:c,currentMonth:o,events:u,calendar:D,setCalendarDate:h}=t;let d=1,f=1;const g=[];for(let M=0;M<e;M++)for(let _=0;_<a;_++){const y=this.generateCellContent({dayCounter:d,startingDayOfWeek:i,week:M,day:_,lastDayOfPreviousMonth:l,nextMonthDayCounter:f,currentYear:c,currentMonth:o,events:u,calendar:D});y.isCurrentMonth?d++:f++;const X=[y.isCurrentMonth?y.isToday?"today":"":"non-current-month",y.isSelected?"selected":"",y.eventPoints.length>0?"with-dots":""].join(" ");g.push(s(".cell",{class:X,onclick:()=>h(new Date(c,o,y.content))},[s("p",[s("span",y.content),y.eventPoints.length>0?s(".event-points",y.eventPoints.map((R,tt)=>s("span.point",{key:tt},R))):null])]))}return g}static generateCellContent(t){const{dayCounter:e,startingDayOfWeek:a,week:r,day:i,lastDayOfPreviousMonth:l,nextMonthDayCounter:c,currentYear:o,currentMonth:u,events:D,calendar:h}=t;let d=e,f=!0,g=!1,M=!1,_=[];if(r===0&&i<a?(d=l-(a-i-1),f=!1):e>this.getDaysInMonth(o,u)&&(d=c,f=!1),f){g=o===new Date().getFullYear()&&u===new Date().getMonth()&&e===new Date().getDate(),M=e===h.date.getDate()&&u===h.date.getMonth()&&o===h.date.getFullYear();const y=this.getEventsCountForDay(new Date(o,u,e),D);_=Array(Math.min(y,5)).fill("•")}return{content:d,isCurrentMonth:f,isToday:g,isSelected:M,eventPoints:_}}static getDaysInMonth(t,e){return new Date(t,e+1,0).getDate()}static getEventsCountForDay(t,e){const a=new S;return a._date=t,e.filter(r=>a.isCurrentDayEvent(r)).length}}const W={oninit:function(n){n.attrs.date.getFullYear(),this.events=n.attrs.events,this.calendar=n.attrs.calendar},setCalendarDate:function(n){this.calendar.setCurrentDate(n),this.calendar.switchMode("day")},view:function(n){const r=[];for(let i=0;i<12;i++){const l=new Date(n.attrs.date.getFullYear(),i,1),c=l.getDay(),o=C.getDaysInMonth(n.attrs.date.getFullYear(),i-1),u=C.generateGridCells({weeks:6,days:7,firstDayOfMonth:l,startingDayOfWeek:c,lastDayOfPreviousMonth:o,currentYear:n.attrs.date.getFullYear(),currentMonth:i,events:this.events,calendar:this.calendar,setCalendarDate:this.setCalendarDate.bind(this)});r.push(s("",[s("h4",new Date(n.attrs.date.getFullYear(),i).toLocaleString("default",{month:"long"})),s(".year-month-view",[s(b),s(".year-month-grid",u)])]))}return s(".year-view .year-grid minimize-scrollbar",r)}},G={view:function(n){const{currentMode:t,date:e}=n.attrs.calendar;switch(t){case"day":return s(Y,{date:e,events:n.attrs.events});case"month":return s(I,{date:e,events:n.attrs.events});case"year":return s(W,{date:e,events:n.attrs.events,calendar:n.attrs.calendar});case"week":return s(B,{date:e,events:n.attrs.events});default:return s(Y,{date:e,events:n.attrs.events})}}},H={formatDate:function(n,t){let e;switch(t){case"month":e={year:"numeric",month:"short"};break;case"year":e={year:"numeric"};break;default:e={year:"numeric",month:"short",day:"numeric"}}return n.toLocaleDateString("fr-FR",e)},adjustDate:function(n,t,e){const a=new Date(n);switch(e){case"month":a.setMonth(a.getMonth()+t);break;case"year":a.setFullYear(a.getFullYear()+t);break;default:a.setDate(a.getDate()+t)}return a},setToday:function(n){const t=new Date;switch(n){case"month":t.setDate(1);break;case"year":t.setMonth(0,1);break}return t},view:function(n){const{calendar:t}=n.attrs,e=t.currentMode;return s(".top-bar-date.flex",[s("span",{onclick:()=>{t.setCurrentDate(this.setToday(e))}},"Today"),s(".chevrons.flex",[s("i.fas.fa-chevron-left",{onclick:()=>{t.setCurrentDate(this.adjustDate(t.date,-1,e))}}),s("i.fas.fa-chevron-right",{onclick:()=>{t.setCurrentDate(this.adjustDate(t.date,1,e))}})]),s("p",this.formatDate(t.date,e))])}},U={view:function(n){const{calendar:t}=n.attrs;return s(".top-bar-mode.flex",[s("span",{class:t.currentMode==="day"?"active":"",onclick:()=>t.switchMode("day")},"Day"),s("span",{class:t.currentMode==="week"?"active":"",onclick:()=>t.switchMode("week")},"Week"),s("span",{class:t.currentMode==="month"?"active":"",onclick:()=>t.switchMode("month")},"Month"),s("span",{class:t.currentMode==="year"?"active":"",onclick:()=>t.switchMode("year")},"Year")])}},J={view:function(n){return s(".top-bar-search",[s("i.fas.fa-magnifying-glass"),s("input[type=text][placeholder=Rechercher...]",{oninput:function(t){}})])}},z={view:function(n){const{calendar:t}=n.attrs;return s(".top-bar.flex",[s("div.flex",{style:" gap: 12px; "},[s("i.fas.fa-bars menu-icon",{onclick:()=>n.attrs.toggleSideBarVisibility(),style:"cursor: pointer;"}),s(H,{calendar:t})]),s(U,{calendar:t}),s(J)])}};class K{constructor(t={}){if(t.date&&!(t.date instanceof Date))throw new Error("Invalid date");if(!t.events||!Array.isArray(t.events)||!t.events.every(e=>typeof e=="object"))throw new Error("Invalid events");this._currentDate=t.date instanceof Date?t.date:new Date,this._events=this.configureEvents(t.events,t.attributeNames||{}),this._validModes=["day","month","year","week"],this._currentMode=this._validModes.includes(t.mode)?t.mode:"day"}configureEvents(t,e){const{title:a,startDate:r,endDate:i}={title:"title",startDate:"startDate",endDate:"endDate",...e};return t.map(l=>({title:l[a],startDate:l[r],endDate:l[i]}))}switchMode(t){this._validModes.includes(t)?this._currentMode=t:this._currentMode="day"}setCurrentDate(t){if(t===void 0)throw new Error("Date parameter is required");if(!(t instanceof Date)||isNaN(t.getTime()))throw new Error("Invalid date");this._currentDate=t}updateEvents(t,e){this._events=this.configureEvents(t,e)}get date(){return this._currentDate}get events(){return this._events}get currentMode(){return this._currentMode}}const q={view:function(n){const{date:t,updateDate:e}=n.attrs;return s(".sidebar-navigation",[s(".nav-button",{onclick:()=>e(-1)},"<"),s("div",`${t.toLocaleString("default",{month:"long"})} ${t.getFullYear()}`),s(".nav-button",{onclick:()=>e(1)},">")])}},Z={oninit:function(n){this.date=new Date,this.currentMonth=this.date.getMonth(),this.currentYear=this.date.getFullYear(),this.currentDay=this.date.getDate(),this.events=n.attrs.calendar.events,this.calendar=n.attrs.calendar},updateDate:function(n){this.currentMonth+=n,this.currentMonth<0?(this.currentMonth=11,this.currentYear--):this.currentMonth>11&&(this.currentMonth=0,this.currentYear++),this.date=new Date(this.currentYear,this.currentMonth,this.currentDay)},setCalendarDate:function(n){this.calendar.setCurrentDate(n)},view:function(n){const a=new Date(this.currentYear,this.currentMonth,1),r=a.getDay(),i=C.getDaysInMonth(this.currentYear,this.currentMonth-1),l=C.generateGridCells({weeks:6,days:7,firstDayOfMonth:a,startingDayOfWeek:r,lastDayOfPreviousMonth:i,currentYear:this.currentYear,currentMonth:this.currentMonth,events:this.events,calendar:this.calendar,setCalendarDate:this.setCalendarDate.bind(this)});return s(".sidebar-month-view",[s(q,{date:this.date,updateDate:this.updateDate.bind(this)}),s(b),s(".sidebar-month-grid",l)])}};let k=!1;const Q=()=>{k=!k};return{oninit:function(n){const t=new Date;n.state.calendar=new K({date:t,events:n.attrs.events,mode:"month",attributeNames:n.attrs.attributeNames})},view:function(n){return s(".all-calendar",[s(".sidebar-container",[k&&s(".sidebar",s(Z,{calendar:n.state.calendar}))]),s(".app",[s(z,{calendar:n.state.calendar,toggleSideBarVisibility:Q}),s(G,{calendar:n.state.calendar,events:n.attrs.events})])])}}});
