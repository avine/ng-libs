"use strict";(self.webpackChunkng_libs=self.webpackChunkng_libs||[]).push([[519],{519:(ve,S,o)=>{o.r(S),o.d(S,{RX_DATA_STORE_ROUTES:()=>ge});var g=o(6895),A=o(4859),U=o(9549),Q=o(4144),E=o(455),N=o(8874),e=o(4650),j=o(4707),B=o(8675),z=o(9300),L=o(8372),P=o(3900),m=o(9646),T=o(8505),C=o(262),$=o(8746),X=o(4782),b=o(4004),Y=o(1135),H=o(5684),G=o(1884),O=o(7579),y=o(2843),q=o(5577),W=o(7359),D=o(4482),Z=o(5403),R=o(8421),w=o(4671),J=o(5032),k=o(3269),ee=o(515);class te{constructor(){this.requestsCount=0,this.mutationsQueue$=new O.x,this.mutations$=this.mutationsQueue$.pipe((0,q.z)(i=>i,1),function V(n,i){return(0,D.e)((0,W.U)(n,i,arguments.length>=2,!1,!0))}((i,t)=>(i.push(t),i),[]),(0,b.U)(i=>t=>i.reduce((s,[a,d])=>d?d(s,a):s,t)))}add(i,t,s){this.requestsCount+=1,this.mutationsQueue$.next(i.pipe(function _(...n){const i=(0,k.jO)(n);return(0,D.e)((t,s)=>{const a=n.length,d=new Array(a);let u=n.map(()=>!1),f=!1;for(let c=0;c<a;c++)(0,R.Xf)(n[c]).subscribe((0,Z.x)(s,I=>{d[c]=I,!f&&!u[c]&&(u[c]=!0,(f=u.every(w.y))&&(u=null))},J.Z));t.subscribe((0,Z.x)(s,c=>{if(f){const I=[c,...d];s.next(i?i(...I):I)}}))})}((0,m.of)(t)),(0,C.K)(a=>(s?.(a),ee.E)),(0,$.x)(()=>{this.requestsCount-=1,0===this.requestsCount&&this.mutationsQueue$.complete()})))}}class v{get dataSnapshot(){if(void 0!==this._dataSnapshot)return this._map(this._dataSnapshot)}constructor(i,t,s=!1){this.dataSource=i,this.args=t,this.useCache=s,this.cache=new Map,this.dispatcher$=new j.t(1),this.data$=this.dispatcher$.pipe((0,B.O)(void 0),(0,z.h)(a=>!(void 0===a&&!this.args)),(0,L.b)(0),(0,P.w)(a=>{if(void 0!==a)return(0,m.of)(a);let d;return this.useCache&&(d=this.buildCacheKey(this.args),d&&this.cache.has(d))?(0,m.of)(this.cache.get(d)):(this._pending$.next(!0),this.dataSource(...this.args).pipe((0,T.b)(u=>{this.useCache&&d&&this.cache.set(d,u)}),(0,C.K)(this.handleError.bind(this)),(0,$.x)(()=>this._pending$.next(!1))))}),(0,T.b)(a=>this._dataSnapshot=a),(0,X.d)(1),(0,b.U)(a=>this._map(a))),this._pending$=new Y.X(!1),this.pending$=this._pending$.pipe((0,H.T)(1),(0,G.x)()),this._error$=new O.x,this.error$=this._error$.asObservable()}fetch(...i){this.args=i,this.dispatcher$.next(void 0)}refresh(){if(this.args){if(this.useCache){const i=this.buildCacheKey(this.args);i&&this.cache.delete(i)}this.dispatcher$.next(void 0)}}mutation(i,t){return this._pending$.next(!0),i.pipe((0,T.b)(s=>t&&this.updateData(a=>t(a,s))),(0,C.K)(this.handleError.bind(this)),(0,$.x)(()=>this._pending$.next(!1)))}mutationQueue(i,t){this.requestsQueue||(this.requestsQueue=new te,this.requestsQueue.mutations$.subscribe(s=>{this.requestsQueue=void 0,this.updateData(s,!0)})),this._pending$.next(!0),this.requestsQueue.add(i,t,this.handleError.bind(this))}pending(i=!0){this._pending$.next(i)}setData(i,t=!1){this.dispatcher$.next(i),t&&this._pending$.next(!1)}updateData(i,t=!1){const s=this.dataSnapshot;if(void 0===s)return t&&this._pending$.next(!1),void console.error("RxDataStore: unable to update data because the data snapshot is undefined.");this.setData(i(s),t)}clearCache(){this.cache.clear()}_map(i){return this.map?"noop"!==this.map?this.map(i):i:v.map?v.map(i):i}buildCacheKey(i){try{return JSON.stringify(i)}catch{console.error("RxDataStore: unable to build cache key from arguments",i)}}handleError(i){return this._error$.next(i),(0,y._)(()=>i)}}var ie=o(4986),se=o(7272),K=o(5698),oe=o(9718);function M(n,i){return i?t=>(0,se.z)(i.pipe((0,K.q)(1),function ne(){return(0,D.e)((n,i)=>{n.subscribe((0,Z.x)(i,J.Z))})}()),t.pipe(M(n))):(0,q.z)((t,s)=>(0,R.Xf)(n(t,s)).pipe((0,K.q)(1),(0,oe.h)(t)))}var ae=o(5963);function p(n,i=ie.z){const t=(0,ae.H)(n,i);return M(()=>t)}let re=0;const r=()=>++re;let l=[{userId:1,id:r(),title:"delectus aut autem",completed:!1},{userId:1,id:r(),title:"quis ut nam facilis et officia qui",completed:!1},{userId:1,id:r(),title:"fugiat veniam minus",completed:!1},{userId:1,id:r(),title:"et porro tempora",completed:!0},{userId:1,id:r(),title:"laboriosam mollitia et enim quasi adipisci quia provident illum",completed:!1},{userId:2,id:r(),title:"qui ullam ratione quibusdam voluptatem quia omnis",completed:!1},{userId:2,id:r(),title:"illo expedita consequatur quia in",completed:!1},{userId:2,id:r(),title:"quo adipisci enim quam ut ab",completed:!0},{userId:2,id:r(),title:"molestiae perspiciatis ipsa",completed:!1},{userId:3,id:r(),title:"illo est ratione doloremque quia maiores aut",completed:!0},{userId:3,id:r(),title:"vero rerum temporibus dolor",completed:!0},{userId:3,id:r(),title:"ipsa repellendus fugit nisi",completed:!0},{userId:3,id:r(),title:"et doloremque nulla",completed:!1},{userId:3,id:r(),title:"repellendus sunt dolores architecto voluptatum",completed:!0},{userId:3,id:r(),title:"ab voluptatum amet voluptas",completed:!0},{userId:4,id:r(),title:"accusamus eos facilis sint et aut voluptatem",completed:!0},{userId:4,id:r(),title:"quo laboriosam deleniti aut qui",completed:!0},{userId:4,id:r(),title:"dolorum est consequatur ea mollitia in culpa",completed:!1},{userId:4,id:r(),title:"molestiae ipsa aut voluptatibus pariatur dolor nihil",completed:!0},{userId:4,id:r(),title:"ullam nobis libero sapiente ad optio sint",completed:!0},{userId:5,id:r(),title:"suscipit repellat esse quibusdam voluptatem incidunt",completed:!1},{userId:5,id:r(),title:"distinctio vitae autem nihil ut molestias quo",completed:!0},{userId:5,id:r(),title:"et itaque necessitatibus maxime molestiae qui quas velit",completed:!1}];const F=n=>[...n.map(i=>({...i}))],x=(n,i)=>n.findIndex(({id:t})=>t===i),h=1500,de=n=>(0,m.of)(F(l)).pipe((0,b.U)(i=>i.filter(t=>t.userId===n)),p(h));let me=(()=>{class n extends v{constructor(){super(de),this.map=F}update(t){this.mutationQueue((n=>{const i=x(l,n.id);if(-1===i)return(0,y._)(()=>new Error(`Unable to update todo with id=${n.id}`)).pipe(p(h));const{title:t,completed:s}=n;return l[i]={...l[i],title:t,completed:s},(0,m.of)({...l[i],title:t,completed:s}).pipe(p(h))})(t),(s,a)=>(s[x(s,a.id)]=a,s))}remove(t){this.mutationQueue((n=>{const i=x(l,n);if(-1===i)return(0,y._)(()=>new Error(`Unable to remove todo with id=${n}`)).pipe(p(h));const[t]=l.splice(i,1);return(0,m.of)(t).pipe(p(h))})(t),s=>{const a=x(s,t);return s.splice(a,1),s})}add(t){this.mutationQueue((n=>{const i=r();return l.push({...n,id:i}),(0,m.of)({...n,id:i}).pipe(p(h))})(t),(s,a)=>(s.push(a),s))}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();function pe(n,i){if(1&n&&(e.TgZ(0,"h2"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij("Todo list for user with ID: ",t.userId||"","")}}function he(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"p")(1,"button",7),e.NdJ("click",function(){const d=e.CHM(t).$implicit,u=e.oxw();return e.KtG(u.remove(d.id))}),e._uU(2,"Remove"),e.qZA(),e._uU(3," \xa0 "),e.TgZ(4,"mat-slide-toggle",8),e.NdJ("change",function(){const d=e.CHM(t).$implicit,u=e.oxw();return e.KtG(u.toggleCompleted(d))}),e.qZA(),e._uU(5," \xa0 "),e.TgZ(6,"mat-form-field",9)(7,"input",10,11),e.NdJ("change",function(){const d=e.CHM(t).$implicit,u=e.MAs(8),f=e.oxw();return e.KtG(f.updateTitle(d,u.value))}),e.qZA()(),e._uU(9),e.qZA()}if(2&n){const t=i.$implicit,s=e.oxw();e.xp6(1),e.Q6J("disabled",s.disabledTodoIds.has(t.id)),e.xp6(3),e.Q6J("disabled",s.disabledTodoIds.has(t.id))("checked",t.completed),e.xp6(3),e.Q6J("disabled",s.disabledTodoIds.has(t.id))("value",t.title),e.xp6(2),e.hij(" \xa0 ",t.completed?"\u2714":"\u2716"," ")}}function fe(n,i){if(1&n&&(e.TgZ(0,"pre",12),e._uU(1),e.ALo(2,"json"),e.qZA()),2&n){const t=i.ngIf;e.xp6(1),e.hij("Todos ",e.lcZ(2,1,t),"")}}const ge=[{path:"",component:(()=>{class n{constructor(t){this.demoService=t,this.userId=0,this.disabledTodoIds=new Set,this.subscription=this.demoService.pending$.subscribe(s=>{!1===s&&this.disabledTodoIds.clear()})}ngOnDestroy(){this.subscription.unsubscribe()}fetch(){this.userId=1+this.userId%5,this.demoService.fetch(this.userId)}remove(t){this.demoService.remove(t),this.disabledTodoIds.add(t)}toggleCompleted(t){t.completed=!t.completed,this.demoService.update(t)}updateTitle(t,s){t.title=s,this.demoService.update(t)}trackById(t,{id:s}){return s}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(me))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-demo"]],standalone:!0,features:[e.jDz],decls:25,vars:14,consts:[["mat-raised-button","","color","primary",3,"disabled","click"],[4,"ngIf"],[1,"demo"],[1,"demo__form"],[4,"ngFor","ngForOf","ngForTrackBy"],["class","demo__data",4,"ngIf"],["linkHref","https://github.com/avine/ng-libs/tree/main/src/app/rx-data-store/demo"],["mat-button","",3,"disabled","click"],[3,"disabled","checked","change"],["appearance","fill"],["matInput","",3,"disabled","value","change"],["input",""],[1,"demo__data"]],template:function(t,s){1&t&&(e.TgZ(0,"h1"),e._uU(1,"RxDataStore"),e.qZA(),e.TgZ(2,"p"),e._uU(3," Note that the server simulates a slow internet connection and each request takes 1.5 seconds."),e._UZ(4,"br"),e._uU(5," The request are queued using the "),e.TgZ(6,"code"),e._uU(7,"mutationQueue()"),e.qZA(),e._uU(8," method.\n"),e.qZA(),e.TgZ(9,"p")(10,"button",0),e.NdJ("click",function(){return s.fetch()}),e.ALo(11,"async"),e._uU(12," Fetch todos for the next user "),e.qZA(),e._uU(13," \xa0 "),e.TgZ(14,"span"),e._uU(15),e.ALo(16,"async"),e.qZA()(),e.YNc(17,pe,2,1,"h2",1),e.TgZ(18,"div",2)(19,"div",3),e.YNc(20,he,10,6,"p",4),e.ALo(21,"async"),e.qZA(),e.YNc(22,fe,3,3,"pre",5),e.ALo(23,"async"),e.qZA(),e._UZ(24,"app-view-source",6)),2&t&&(e.xp6(10),e.Q6J("disabled",e.lcZ(11,6,s.demoService.pending$)),e.xp6(5),e.Oqu(e.lcZ(16,8,s.demoService.pending$)?"\u{1f680} Processing...":"\u{1f634} Idle."),e.xp6(2),e.Q6J("ngIf",s.userId),e.xp6(3),e.Q6J("ngForOf",e.lcZ(21,10,s.demoService.data$))("ngForTrackBy",s.trackById),e.xp6(2),e.Q6J("ngIf",e.lcZ(23,12,s.demoService.data$)))},dependencies:[g.Ov,g.Ts,g.O5,g.ax,A.ot,A.lW,U.lN,U.KE,Q.c,Q.Nt,E.rP,E.Rr,N.t],styles:[".demo[_ngcontent-%COMP%]{display:flex}.demo__form[_ngcontent-%COMP%]{flex-shrink:0}.demo__data[_ngcontent-%COMP%]{flex-grow:1;overflow:auto;margin:0 0 0 2rem;padding:.6rem .9rem;border-radius:4px;border:1px solid #eaeaea;background-color:#fafafa;font-size:13px;line-height:16px}@media (max-width: 1280px){.demo[_ngcontent-%COMP%]{flex-direction:column}.demo__data[_ngcontent-%COMP%]{margin-left:0}}"]}),n})()}]}}]);