"use strict";(self.webpackChunkng_libs=self.webpackChunkng_libs||[]).push([[61],{2061:(le,m,a)=>{a.r(m),a.d(m,{IfNonNullishModule:()=>ie});var c=a(9808),u=a(3191),e=a(5e3),f=a(2916),C=a(8929),y=a(13);let b=(()=>{class i{create(t){return"undefined"==typeof MutationObserver?null:new MutationObserver(t)}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),k=(()=>{class i{constructor(t){this._mutationObserverFactory=t,this._observedElements=new Map}ngOnDestroy(){this._observedElements.forEach((t,n)=>this._cleanupObserver(n))}observe(t){const n=(0,u.fI)(t);return new f.y(s=>{const h=this._observeElement(n).subscribe(s);return()=>{h.unsubscribe(),this._unobserveElement(n)}})}_observeElement(t){if(this._observedElements.has(t))this._observedElements.get(t).count++;else{const n=new C.xQ,s=this._mutationObserverFactory.create(o=>n.next(o));s&&s.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(t,{observer:s,stream:n,count:1})}return this._observedElements.get(t).stream}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t))}_cleanupObserver(t){if(this._observedElements.has(t)){const{observer:n,stream:s}=this._observedElements.get(t);n&&n.disconnect(),s.complete(),this._observedElements.delete(t)}}}return i.\u0275fac=function(t){return new(t||i)(e.LFG(b))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),M=(()=>{class i{constructor(t,n,s){this._contentObserver=t,this._elementRef=n,this._ngZone=s,this.event=new e.vpe,this._disabled=!1,this._currentSubscription=null}get disabled(){return this._disabled}set disabled(t){this._disabled=(0,u.Ig)(t),this._disabled?this._unsubscribe():this._subscribe()}get debounce(){return this._debounce}set debounce(t){this._debounce=(0,u.su)(t),this._subscribe()}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();const t=this._contentObserver.observe(this._elementRef);this._ngZone.runOutsideAngular(()=>{this._currentSubscription=(this.debounce?t.pipe((0,y.b)(this.debounce)):t).subscribe(this.event)})}_unsubscribe(){var t;null===(t=this._currentSubscription)||void 0===t||t.unsubscribe()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(k),e.Y36(e.SBq),e.Y36(e.R0b))},i.\u0275dir=e.lG2({type:i,selectors:[["","cdkObserveContent",""]],inputs:{disabled:["cdkObserveContentDisabled","disabled"],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]}),i})(),x=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[b]}),i})();var r=a(508),g=a(3075),O=a(6360),w=a(5583);const D=["thumbContainer"],A=["toggleBar"],I=["input"],Z=function(i){return{enterDuration:i}},R=["*"],S=new e.OlP("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1})});let E=0;const F={provide:g.JU,useExisting:(0,e.Gpc)(()=>v),multi:!0};class V{constructor(l,t){this.source=l,this.checked=t}}const q=(0,r.sb)((0,r.pj)((0,r.Kr)((0,r.Id)(class{constructor(i){this._elementRef=i}}))));let v=(()=>{class i extends q{constructor(t,n,s,o,h,ne){super(t),this._focusMonitor=n,this._changeDetectorRef=s,this.defaults=h,this._onChange=ae=>{},this._onTouched=()=>{},this._uniqueId="mat-slide-toggle-"+ ++E,this._required=!1,this._checked=!1,this.name=null,this.id=this._uniqueId,this.labelPosition="after",this.ariaLabel=null,this.ariaLabelledby=null,this.change=new e.vpe,this.toggleChange=new e.vpe,this.tabIndex=parseInt(o)||0,this.color=this.defaultColor=h.color||"accent",this._noopAnimations="NoopAnimations"===ne}get required(){return this._required}set required(t){this._required=(0,u.Ig)(t)}get checked(){return this._checked}set checked(t){this._checked=(0,u.Ig)(t),this._changeDetectorRef.markForCheck()}get inputId(){return`${this.id||this._uniqueId}-input`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t||Promise.resolve().then(()=>this._onTouched())})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}_onChangeEvent(t){t.stopPropagation(),this.toggleChange.emit(),this.defaults.disableToggleValue?this._inputElement.nativeElement.checked=this.checked:(this.checked=this._inputElement.nativeElement.checked,this._emitChangeEvent())}_onInputClick(t){t.stopPropagation()}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}focus(t,n){n?this._focusMonitor.focusVia(this._inputElement,n,t):this._inputElement.nativeElement.focus(t)}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(new V(this,this.checked))}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(e.SBq),e.Y36(w.tE),e.Y36(e.sBO),e.$8M("tabindex"),e.Y36(S),e.Y36(O.Qb,8))},i.\u0275cmp=e.Xpm({type:i,selectors:[["mat-slide-toggle"]],viewQuery:function(t,n){if(1&t&&(e.Gf(D,5),e.Gf(A,5),e.Gf(I,5)),2&t){let s;e.iGM(s=e.CRH())&&(n._thumbEl=s.first),e.iGM(s=e.CRH())&&(n._thumbBarEl=s.first),e.iGM(s=e.CRH())&&(n._inputElement=s.first)}},hostAttrs:[1,"mat-slide-toggle"],hostVars:12,hostBindings:function(t,n){2&t&&(e.Ikx("id",n.id),e.uIk("tabindex",null)("aria-label",null)("aria-labelledby",null),e.ekj("mat-checked",n.checked)("mat-disabled",n.disabled)("mat-slide-toggle-label-before","before"==n.labelPosition)("_mat-animation-noopable",n._noopAnimations))},inputs:{disabled:"disabled",disableRipple:"disableRipple",color:"color",tabIndex:"tabIndex",name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedby:["aria-describedby","ariaDescribedby"],required:"required",checked:"checked"},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[e._Bn([F]),e.qOj],ngContentSelectors:R,decls:16,vars:20,consts:[[1,"mat-slide-toggle-label"],["label",""],[1,"mat-slide-toggle-bar"],["toggleBar",""],["type","checkbox","role","switch",1,"mat-slide-toggle-input","cdk-visually-hidden",3,"id","required","tabIndex","checked","disabled","change","click"],["input",""],[1,"mat-slide-toggle-thumb-container"],["thumbContainer",""],[1,"mat-slide-toggle-thumb"],["mat-ripple","",1,"mat-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered","matRippleRadius","matRippleAnimation"],[1,"mat-ripple-element","mat-slide-toggle-persistent-ripple"],[1,"mat-slide-toggle-content",3,"cdkObserveContent"],["labelContent",""],[2,"display","none"]],template:function(t,n){if(1&t&&(e.F$t(),e.TgZ(0,"label",0,1),e.TgZ(2,"span",2,3),e.TgZ(4,"input",4,5),e.NdJ("change",function(o){return n._onChangeEvent(o)})("click",function(o){return n._onInputClick(o)}),e.qZA(),e.TgZ(6,"span",6,7),e._UZ(8,"span",8),e.TgZ(9,"span",9),e._UZ(10,"span",10),e.qZA(),e.qZA(),e.qZA(),e.TgZ(11,"span",11,12),e.NdJ("cdkObserveContent",function(){return n._onLabelTextChange()}),e.TgZ(13,"span",13),e._uU(14,"\xa0"),e.qZA(),e.Hsn(15),e.qZA(),e.qZA()),2&t){const s=e.MAs(1),o=e.MAs(12);e.uIk("for",n.inputId),e.xp6(2),e.ekj("mat-slide-toggle-bar-no-side-margin",!o.textContent||!o.textContent.trim()),e.xp6(2),e.Q6J("id",n.inputId)("required",n.required)("tabIndex",n.tabIndex)("checked",n.checked)("disabled",n.disabled),e.uIk("name",n.name)("aria-checked",n.checked)("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-describedby",n.ariaDescribedby),e.xp6(5),e.Q6J("matRippleTrigger",s)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",!0)("matRippleRadius",20)("matRippleAnimation",e.VKq(18,Z,n._noopAnimations?0:150))}},directives:[r.wG,M],styles:[".mat-slide-toggle{display:inline-block;height:24px;max-width:100%;line-height:24px;white-space:nowrap;outline:none;-webkit-tap-highlight-color:transparent}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(16px, 0, 0)}[dir=rtl] .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(-16px, 0, 0)}.mat-slide-toggle.mat-disabled{opacity:.38}.mat-slide-toggle.mat-disabled .mat-slide-toggle-label,.mat-slide-toggle.mat-disabled .mat-slide-toggle-thumb-container{cursor:default}.mat-slide-toggle-label{-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.mat-slide-toggle-content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-bar{order:2}[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-bar,.mat-slide-toggle-bar{margin-right:8px;margin-left:0}[dir=rtl] .mat-slide-toggle-bar,.mat-slide-toggle-label-before .mat-slide-toggle-bar{margin-left:8px;margin-right:0}.mat-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0, 0, 0);transition:all 80ms linear;transition-property:transform}._mat-animation-noopable .mat-slide-toggle-thumb-container{transition:none}[dir=rtl] .mat-slide-toggle-thumb-container{left:auto;right:0}.mat-slide-toggle-thumb{height:20px;width:20px;border-radius:50%;display:block}.mat-slide-toggle-bar{position:relative;width:36px;height:14px;flex-shrink:0;border-radius:8px}.mat-slide-toggle-input{bottom:0;left:10px}[dir=rtl] .mat-slide-toggle-input{left:auto;right:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}._mat-animation-noopable .mat-slide-toggle-bar,._mat-animation-noopable .mat-slide-toggle-thumb{transition:none}.mat-slide-toggle .mat-slide-toggle-ripple{position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-slide-toggle .mat-slide-toggle-ripple .mat-ripple-element:not(.mat-slide-toggle-persistent-ripple){opacity:.12}.mat-slide-toggle-persistent-ripple{width:100%;height:100%;transform:none}.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:.04}.mat-slide-toggle:not(.mat-disabled).cdk-keyboard-focused .mat-slide-toggle-persistent-ripple{opacity:.12}.mat-slide-toggle-persistent-ripple,.mat-slide-toggle.mat-disabled .mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:0}@media(hover: none){.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{display:none}}.cdk-high-contrast-active .mat-slide-toggle-thumb,.cdk-high-contrast-active .mat-slide-toggle-bar{border:1px solid}.cdk-high-contrast-active .mat-slide-toggle.cdk-keyboard-focused .mat-slide-toggle-bar{outline:2px dotted;outline-offset:5px}\n"],encapsulation:2,changeDetection:0}),i})(),_=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({}),i})(),L=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[_,r.si,r.BQ,x],_,r.BQ]}),i})();var N=a(5834),T=a(353),G=a(4241);function $(i){const{subscriber:l,counter:t,period:n}=i;l.next(t),this.schedule({subscriber:l,counter:t+1,period:n},n)}var d=a(4850),p=a(5778);let J=(()=>{class i{constructor(t,n){this.viewContainerRef=t,this.templateRef=n,this.hasNoData=!0,this.fallbackTemplate=null,this.viewState="clear"}set ifNonNullish(t){this.hasNoData=this.isNullish(t),this.updateView(null!=t?t:this.default)}set ifNonNullishDefault(t){this.default=t,this.hasNoData&&this.updateView(this.default)}set ifNonNullishFallback(t){this.fallbackTemplate=null!=t?t:null,this.hasNoData&&this.isNullish(this.default)&&this.createFallbackView()}static ngTemplateContextGuard(t,n){return!0}updateView(t){this.isNullish(t)?this.switchToFallbackView():this.switchToRegularView(t)}switchToRegularView(t){this.upsertContext(t),"regular"!==this.viewState&&this.createRegularView()}switchToFallbackView(){"fallback"!==this.viewState&&this.createFallbackView()}upsertContext(t){this.context?this.context.$implicit=this.context.ifNonNullish=t:this.context={$implicit:t,ifNonNullish:t}}createRegularView(){this.clearView(),this.viewContainerRef.createEmbeddedView(this.templateRef,this.context),this.viewState="regular"}createFallbackView(){this.clearView(),this.fallbackTemplate&&(this.viewContainerRef.createEmbeddedView(this.fallbackTemplate),this.viewState="fallback")}clearView(){"clear"!==this.viewState&&(this.viewContainerRef.clear(),this.viewState="clear")}isNullish(t){return null==t}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(e.s_b),e.Y36(e.Rgc))},i.\u0275dir=e.lG2({type:i,selectors:[["","ifNonNullish",""]],inputs:{ifNonNullish:"ifNonNullish",ifNonNullishDefault:"ifNonNullishDefault",ifNonNullishFallback:"ifNonNullishFallback"}}),i})();const Y=["fallbackTemplateA"],j=["fallbackTemplateB"];function z(i,l){if(1&i&&(e.TgZ(0,"h3",7),e._uU(1),e.qZA()),2&i){const t=l.ifNonNullish;e.xp6(1),e.hij(" ",t," ")}}function Q(i,l){1&i&&e.GkF(0)}function H(i,l){1&i&&(e.TgZ(0,"h3",7),e._uU(1,"A"),e.qZA())}function K(i,l){1&i&&(e.TgZ(0,"h3",7),e._uU(1,"B"),e.qZA())}const W=[{path:"",component:(()=>{class i{constructor(){this.interval$=function U(i=0,l=T.P){return(!(0,G.k)(i)||i<0)&&(i=0),(!l||"function"!=typeof l.schedule)&&(l=T.P),new f.y(t=>(t.add(l.schedule($,i,{subscriber:t,counter:0,period:i})),t))}(1e3),this.hasData=!1,this.hasDefaultValue=!1,this.hasFallbackTemplate=!1,this.data$=this.interval$.pipe((0,d.U)(t=>!!(t%2)),(0,d.U)(t=>this.hasData?t:null),(0,p.x)()),this.defaultValue$=this.interval$.pipe((0,d.U)(t=>t%2),(0,d.U)(t=>this.hasDefaultValue?t:null),(0,p.x)()),this.fallbackTemplate$=this.interval$.pipe((0,d.U)(t=>t%2?this.fallbackTemplateA:this.fallbackTemplateB),(0,d.U)(t=>this.hasFallbackTemplate?t:null),(0,p.x)())}useData(t){this.hasData=t}useDefaultValue(t){this.hasDefaultValue=t}useFallbackTemplate(t){this.hasFallbackTemplate=t}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-if-non-nullish"]],viewQuery:function(t,n){if(1&t&&(e.Gf(Y,5),e.Gf(j,5)),2&t){let s;e.iGM(s=e.CRH())&&(n.fallbackTemplateA=s.first),e.iGM(s=e.CRH())&&(n.fallbackTemplateB=s.first)}},decls:33,vars:18,consts:[[1,"title"],[1,"layout"],[1,"output"],["class","result",4,"ifNonNullish","ifNonNullishDefault","ifNonNullishFallback"],[1,"slides"],[1,"slide"],[3,"change"],[1,"result"],[4,"ngTemplateOutlet"],[1,"footer"],["href","https://github.com/avine/ng-libs/blob/main/src/app/if-non-nullish/if-non-nullish.component.html","target","_blank",1,"link","link--external"],["fallbackTemplateA",""],["fallbackTemplateB",""]],template:function(t,n){1&t&&(e.TgZ(0,"h2",0),e._uU(1,"IfNonNullishDirective"),e.qZA(),e.TgZ(2,"div",1),e.TgZ(3,"div",2),e.YNc(4,z,2,1,"h3",3),e.ALo(5,"async"),e.ALo(6,"async"),e.ALo(7,"async"),e.qZA(),e.TgZ(8,"div",4),e.TgZ(9,"div",5),e.TgZ(10,"mat-slide-toggle",6),e.NdJ("change",function(o){return n.useData(o.checked)}),e._uU(11,"Data"),e.qZA(),e.TgZ(12,"h3",7),e._uU(13),e.ALo(14,"async"),e.qZA(),e.qZA(),e.TgZ(15,"div",5),e.TgZ(16,"mat-slide-toggle",6),e.NdJ("change",function(o){return n.useDefaultValue(o.checked)}),e._uU(17,"Default value"),e.qZA(),e.TgZ(18,"h3",7),e._uU(19),e.ALo(20,"async"),e.qZA(),e.qZA(),e.TgZ(21,"div",5),e.TgZ(22,"mat-slide-toggle",6),e.NdJ("change",function(o){return n.useFallbackTemplate(o.checked)}),e._uU(23,"Fallback template"),e.qZA(),e.YNc(24,Q,1,0,"ng-container",8),e.ALo(25,"async"),e.qZA(),e.qZA(),e.TgZ(26,"div",9),e.TgZ(27,"a",10),e._uU(28,"view demo source code"),e.qZA(),e.qZA(),e.qZA(),e.YNc(29,H,2,0,"ng-template",null,11,e.W1O),e.YNc(31,K,2,0,"ng-template",null,12,e.W1O)),2&t&&(e.xp6(4),e.Q6J("ifNonNullish",e.lcZ(5,6,n.data$))("ifNonNullishDefault",e.lcZ(6,8,n.defaultValue$))("ifNonNullishFallback",e.lcZ(7,10,n.fallbackTemplate$)),e.xp6(9),e.Oqu(e.lcZ(14,12,n.data$)),e.xp6(6),e.Oqu(e.lcZ(20,14,n.defaultValue$)),e.xp6(5),e.Q6J("ngTemplateOutlet",e.lcZ(25,16,n.fallbackTemplate$)))},directives:[J,v,c.tP],pipes:[c.Ov],styles:[".title[_ngcontent-%COMP%]{margin:16px 0 36px;line-height:48px;text-align:center;font-size:36px}@media (max-width: 479px){.title[_ngcontent-%COMP%]{font-size:28px}}.layout[_ngcontent-%COMP%]{margin:36px auto;max-width:600px}.output[_ngcontent-%COMP%]{padding:48px;background-color:#f5f5f5;text-align:center;min-height:28px}.output[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{margin:0;line-height:28px;font-size:28px}.slides[_ngcontent-%COMP%]{margin-top:36px}.slides[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{min-height:28px;color:gray}.footer[_ngcontent-%COMP%]{margin-top:36px;text-align:center}@media (max-width: 719px){.slides[_ngcontent-%COMP%]{padding:0 36px}.slide[_ngcontent-%COMP%]{margin-bottom:16px;display:flex;justify-content:space-between;align-items:center}.slide[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{margin:0;padding-left:16px;line-height:1em}}@media (min-width: 720px){.slides[_ngcontent-%COMP%]{display:flex;justify-content:space-around}.slides[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{margin-top:18px;text-align:center}}"],changeDetection:0}),i})()}];let X=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[N.Bz.forChild(W)],N.Bz]}),i})(),ee=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[c.ez]]}),i})();const te=[L];let ie=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[c.ez,X,ee,te]]}),i})()}}]);