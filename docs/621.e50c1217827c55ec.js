"use strict";(self.webpackChunkng_libs=self.webpackChunkng_libs||[]).push([[621],{7352:(k,u,l)=>{l.d(u,{t:()=>m});var e=l(5879);let m=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-view-source"]],inputs:{linkHref:"linkHref"},standalone:!0,features:[e.jDz],decls:3,vars:1,consts:[["target","_blank",1,"link",3,"href"],["src","assets/code-solid.svg","alt","",1,"icon"]],template:function(n,p){1&n&&(e.TgZ(0,"a",0),e._UZ(1,"img",1),e._uU(2,"View Source\n"),e.qZA()),2&n&&e.Q6J("href",p.linkHref,e.LSH)},styles:["[_nghost-%COMP%]{display:block;margin-top:48px}.link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;position:relative;border-radius:4px;padding:.6em .9em;background-color:#eee;text-decoration:none;color:#000}.icon[_ngcontent-%COMP%]{width:1.25em;margin-right:.5em}"],changeDetection:0}),a})()},2599:(k,u,l)=>{l.d(u,{Rr:()=>f,rP:()=>A});var e=l(5879),m=l(6223),o=l(4300),a=l(3680),h=l(2495),n=l(6814);const p=["switch"];function y(c,d){1&c&&(e.TgZ(0,"div",12),e.O4$(),e.TgZ(1,"svg",13),e._UZ(2,"path",14),e.qZA(),e.TgZ(3,"svg",15),e._UZ(4,"path",16),e.qZA()())}const M=["*"],I=new e.OlP("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1})}),T={provide:m.JU,useExisting:(0,e.Gpc)(()=>f),multi:!0};class g{constructor(d,s){this.source=d,this.checked=s}}let C=0;const D=(0,a.sb)((0,a.pj)((0,a.Kr)((0,a.Id)(class{constructor(c){this._elementRef=c}}))));let x=(()=>{var c;class d extends D{get required(){return this._required}set required(t){this._required=(0,h.Ig)(t)}get checked(){return this._checked}set checked(t){this._checked=(0,h.Ig)(t),this._changeDetectorRef.markForCheck()}get hideIcon(){return this._hideIcon}set hideIcon(t){this._hideIcon=(0,h.Ig)(t)}get inputId(){return`${this.id||this._uniqueId}-input`}constructor(t,i,r,_,w,b,L){super(t),this._focusMonitor=i,this._changeDetectorRef=r,this.defaults=w,this._onChange=O=>{},this._onTouched=()=>{},this._required=!1,this._checked=!1,this.name=null,this.labelPosition="after",this.ariaLabel=null,this.ariaLabelledby=null,this._hideIcon=!1,this.change=new e.vpe,this.toggleChange=new e.vpe,this.tabIndex=parseInt(_)||0,this.color=this.defaultColor=w.color||"accent",this._noopAnimations="NoopAnimations"===b,this.id=this._uniqueId=`${L}${++C}`,this._hideIcon=w.hideIcon??!1}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{"keyboard"===t||"program"===t?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}}return(c=d).\u0275fac=function(t){e.$Z()},c.\u0275dir=e.lG2({type:c,inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedby:["aria-describedby","ariaDescribedby"],required:"required",checked:"checked",hideIcon:"hideIcon"},outputs:{change:"change",toggleChange:"toggleChange"},features:[e.qOj]}),d})(),f=(()=>{var c;class d extends x{get buttonId(){return`${this.id||this._uniqueId}-button`}constructor(t,i,r,_,w,b){super(t,i,r,_,w,b,"mat-mdc-slide-toggle-"),this._labelId=this._uniqueId+"-label"}_handleClick(){this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new g(this,this.checked)))}focus(){this._switchElement.nativeElement.focus()}_createChangeEvent(t){return new g(this,t)}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}}return(c=d).\u0275fac=function(t){return new(t||c)(e.Y36(e.SBq),e.Y36(o.tE),e.Y36(e.sBO),e.$8M("tabindex"),e.Y36(I),e.Y36(e.QbO,8))},c.\u0275cmp=e.Xpm({type:c,selectors:[["mat-slide-toggle"]],viewQuery:function(t,i){if(1&t&&e.Gf(p,5),2&t){let r;e.iGM(r=e.CRH())&&(i._switchElement=r.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:11,hostBindings:function(t,i){2&t&&(e.Ikx("id",i.id),e.uIk("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),e.ekj("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations))},inputs:{disabled:"disabled",disableRipple:"disableRipple",color:"color",tabIndex:"tabIndex"},exportAs:["matSlideToggle"],features:[e._Bn([T]),e.qOj],ngContentSelectors:M,decls:13,vars:25,consts:[[1,"mdc-form-field"],["role","switch","type","button",1,"mdc-switch",3,"tabIndex","disabled","click"],["switch",""],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-mdc-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],["class","mdc-switch__icons",4,"ngIf"],[1,"mdc-label",3,"for","click"],[1,"mdc-switch__icons"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,i){if(1&t&&(e.F$t(),e.TgZ(0,"div",0)(1,"button",1,2),e.NdJ("click",function(){return i._handleClick()}),e._UZ(3,"div",3),e.TgZ(4,"div",4)(5,"div",5)(6,"div",6),e._UZ(7,"div",7),e.qZA(),e.TgZ(8,"div",8),e._UZ(9,"div",9),e.qZA(),e.YNc(10,y,5,0,"div",10),e.qZA()()(),e.TgZ(11,"label",11),e.NdJ("click",function(_){return _.stopPropagation()}),e.Hsn(12),e.qZA()()),2&t){const r=e.MAs(2);e.ekj("mdc-form-field--align-end","before"==i.labelPosition),e.xp6(1),e.ekj("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled),e.Q6J("tabIndex",i.tabIndex)("disabled",i.disabled),e.uIk("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked),e.xp6(8),e.Q6J("matRippleTrigger",r)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),e.xp6(1),e.Q6J("ngIf",!i.hideIcon),e.xp6(1),e.Q6J("for",i.buttonId),e.uIk("id",i._labelId)}},dependencies:[a.wG,n.O5],styles:['.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mdc-switch{width:var(--mdc-switch-track-width);--mdc-switch-disabled-handle-opacity:0.38;--mdc-switch-disabled-selected-icon-opacity:0.38;--mdc-switch-disabled-track-opacity:0.12;--mdc-switch-disabled-unselected-icon-opacity:0.38;--mdc-switch-handle-height:20px;--mdc-switch-handle-shape:10px;--mdc-switch-handle-width:20px;--mdc-switch-selected-icon-size:18px;--mdc-switch-track-height:14px;--mdc-switch-track-shape:7px;--mdc-switch-track-width:36px;--mdc-switch-unselected-icon-size:18px;--mdc-switch-state-layer-size:40px;--mdc-switch-selected-focus-state-layer-opacity:0.12;--mdc-switch-selected-hover-state-layer-opacity:0.04;--mdc-switch-selected-pressed-state-layer-opacity:0.1;--mdc-switch-unselected-focus-state-layer-opacity:0.12;--mdc-switch-unselected-hover-state-layer-opacity:0.04;--mdc-switch-unselected-pressed-state-layer-opacity:0.1}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color)}.mdc-switch .mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation)}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation)}.mdc-switch .mdc-switch__focus-ring-wrapper,.mdc-switch .mdc-switch__handle{height:var(--mdc-switch-handle-height)}.mdc-switch:disabled .mdc-switch__handle::after{opacity:var(--mdc-switch-disabled-handle-opacity)}.mdc-switch .mdc-switch__handle{border-radius:var(--mdc-switch-handle-shape)}.mdc-switch .mdc-switch__handle{width:var(--mdc-switch-handle-width)}.mdc-switch .mdc-switch__handle-track{width:calc(100% - var(--mdc-switch-handle-width))}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:var(--mdc-switch-selected-icon-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:var(--mdc-switch-unselected-icon-color)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size)}.mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-hover-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-focus-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-pressed-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-hover-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-focus-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-pressed-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-selected-hover-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-selected-focus-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-unselected-hover-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity)}.mdc-switch .mdc-switch__ripple{height:var(--mdc-switch-state-layer-size);width:var(--mdc-switch-state-layer-size)}.mdc-switch .mdc-switch__track{height:var(--mdc-switch-track-height)}.mdc-switch:disabled .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch:enabled .mdc-switch__track::after{background:var(--mdc-switch-selected-track-color)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color)}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color)}.mdc-switch:disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color)}.mdc-switch:enabled .mdc-switch__track::before{background:var(--mdc-switch-unselected-track-color)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color)}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color)}.mdc-switch:disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color)}.mdc-switch .mdc-switch__track{border-radius:var(--mdc-switch-track-shape)}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mat-mdc-slide-toggle .mdc-label{font-family:var(--mat-slide-toggle-label-text-font);font-size:var(--mat-slide-toggle-label-text-size);letter-spacing:var(--mat-slide-toggle-label-text-tracking);line-height:var(--mat-slide-toggle-label-text-line-height);font-weight:var(--mat-slide-toggle-label-text-weight)}.mat-mdc-slide-toggle{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:"";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:opacity 75ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-elevation-overlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}'],encapsulation:2,changeDetection:0}),d})(),v=(()=>{var c;class d{}return(c=d).\u0275fac=function(t){return new(t||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({}),d})(),A=(()=>{var c;class d{}return(c=d).\u0275fac=function(t){return new(t||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({imports:[v,a.BQ,a.si,n.ez,v,a.BQ]}),d})()}}]);