"use strict";(self.webpackChunkng_libs=self.webpackChunkng_libs||[]).push([[978],{7978:(x,u,l)=>{l.r(u),l.d(u,{IfNonNullishComponent:()=>f});var o=l(4986),h=l(5963),n=l(4004),r=l(1884),g=l(6895),e=l(4650),_=l(4006),M=l(2687),m=l(3238),v=l(1281);const C=["switch"],D=["*"],Z=new e.OlP("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1})}),A={provide:_.JU,useExisting:(0,e.Gpc)(()=>y),multi:!0};class k{constructor(t,i){this.source=t,this.checked=i}}let I=0;const S=(0,m.sb)((0,m.pj)((0,m.Kr)((0,m.Id)(class{constructor(c){this._elementRef=c}}))));let O=(()=>{class c extends S{constructor(i,d,a,s,w,b,$){super(i),this._focusMonitor=d,this._changeDetectorRef=a,this.defaults=w,this._onChange=G=>{},this._onTouched=()=>{},this._required=!1,this._checked=!1,this.name=null,this.labelPosition="after",this.ariaLabel=null,this.ariaLabelledby=null,this.change=new e.vpe,this.toggleChange=new e.vpe,this.tabIndex=parseInt(s)||0,this.color=this.defaultColor=w.color||"accent",this._noopAnimations="NoopAnimations"===b,this.id=this._uniqueId=`${$}${++I}`}get required(){return this._required}set required(i){this._required=(0,v.Ig)(i)}get checked(){return this._checked}set checked(i){this._checked=(0,v.Ig)(i),this._changeDetectorRef.markForCheck()}get inputId(){return`${this.id||this._uniqueId}-input`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(i=>{"keyboard"===i||"program"===i?this._focused=!0:i||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(i){this.checked=!!i}registerOnChange(i){this._onChange=i}registerOnTouched(i){this._onTouched=i}setDisabledState(i){this.disabled=i,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}}return c.\u0275fac=function(i){e.$Z()},c.\u0275dir=e.lG2({type:c,inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedby:["aria-describedby","ariaDescribedby"],required:"required",checked:"checked"},outputs:{change:"change",toggleChange:"toggleChange"},features:[e.qOj]}),c})(),y=(()=>{class c extends O{constructor(i,d,a,s,w,b){super(i,d,a,s,w,b,"mat-mdc-slide-toggle-"),this._labelId=this._uniqueId+"-label"}get buttonId(){return`${this.id||this._uniqueId}-button`}_handleClick(){this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new k(this,this.checked)))}focus(){this._switchElement.nativeElement.focus()}_createChangeEvent(i){return new k(this,i)}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}}return c.\u0275fac=function(i){return new(i||c)(e.Y36(e.SBq),e.Y36(M.tE),e.Y36(e.sBO),e.$8M("tabindex"),e.Y36(Z),e.Y36(e.QbO,8))},c.\u0275cmp=e.Xpm({type:c,selectors:[["mat-slide-toggle"]],viewQuery:function(i,d){if(1&i&&e.Gf(C,5),2&i){let a;e.iGM(a=e.CRH())&&(d._switchElement=a.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:11,hostBindings:function(i,d){2&i&&(e.Ikx("id",d.id),e.uIk("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),e.ekj("mat-mdc-slide-toggle-focused",d._focused)("mat-mdc-slide-toggle-checked",d.checked)("_mat-animation-noopable",d._noopAnimations))},inputs:{disabled:"disabled",disableRipple:"disableRipple",color:"color",tabIndex:"tabIndex"},exportAs:["matSlideToggle"],features:[e._Bn([A]),e.qOj],ngContentSelectors:D,decls:17,vars:24,consts:[[1,"mdc-form-field"],["role","switch","type","button",1,"mdc-switch",3,"tabIndex","disabled","click"],["switch",""],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-mdc-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],["viewBox","0 0 24 24",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"],[3,"for","click"]],template:function(i,d){if(1&i&&(e.F$t(),e.TgZ(0,"div",0)(1,"button",1,2),e.NdJ("click",function(){return d._handleClick()}),e._UZ(3,"div",3),e.TgZ(4,"div",4)(5,"div",5)(6,"div",6),e._UZ(7,"div",7),e.qZA(),e.TgZ(8,"div",8),e._UZ(9,"div",9),e.qZA(),e.TgZ(10,"div",10),e.O4$(),e.TgZ(11,"svg",11),e._UZ(12,"path",12),e.qZA(),e.TgZ(13,"svg",13),e._UZ(14,"path",14),e.qZA()()()()(),e.kcU(),e.TgZ(15,"label",15),e.NdJ("click",function(s){return s.stopPropagation()}),e.Hsn(16),e.qZA()()),2&i){const a=e.MAs(2);e.ekj("mdc-form-field--align-end","before"==d.labelPosition),e.xp6(1),e.ekj("mdc-switch--selected",d.checked)("mdc-switch--unselected",!d.checked)("mdc-switch--checked",d.checked)("mdc-switch--disabled",d.disabled),e.Q6J("tabIndex",d.tabIndex)("disabled",d.disabled),e.uIk("id",d.buttonId)("name",d.name)("aria-label",d.ariaLabel)("aria-labelledby",d._getAriaLabelledBy())("aria-describedby",d.ariaDescribedby)("aria-required",d.required||null)("aria-checked",d.checked),e.xp6(8),e.Q6J("matRippleTrigger",a)("matRippleDisabled",d.disableRipple||d.disabled)("matRippleCentered",!0),e.xp6(6),e.Q6J("for",d.buttonId),e.uIk("id",d._labelId)}},dependencies:[m.wG],styles:['.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{display:inline-block;outline:0}.mat-mdc-slide-toggle .mdc-switch{width:var(--mdc-switch-track-width, 36px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, #616161)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color, var(--mdc-theme-surface, #fff))}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__focus-ring-wrapper,.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{height:var(--mdc-switch-handle-height, 20px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__handle::after{opacity:var(--mdc-switch-disabled-handle-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{border-radius:var(--mdc-switch-handle-shape, 10px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{width:var(--mdc-switch-handle-width, 20px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle-track{width:calc(100% - var(--mdc-switch-handle-width, 20px))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:var(--mdc-switch-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size, 18px);height:var(--mdc-switch-selected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size, 18px);height:var(--mdc-switch-unselected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-hover-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-hover-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-selected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-selected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-unselected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__ripple{height:var(--mdc-switch-state-layer-size, 48px);width:var(--mdc-switch-state-layer-size, 48px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{height:var(--mdc-switch-track-height, 14px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::after{background:var(--mdc-switch-selected-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::before{background:var(--mdc-switch-unselected-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{border-radius:var(--mdc-switch-track-shape, 7px)}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:"";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:opacity 75ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-elevation-overlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}'],encapsulation:2,changeDetection:0}),c})(),T=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({}),c})(),q=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({imports:[T,m.BQ,m.si,g.ez,T,m.BQ]}),c})();class p{constructor(t,i){this.viewContainerRef=t,this.templateRef=i,this.hasNoData=!0,this.fallbackTemplate=null,this.viewState="clear"}set ifNonNullish(t){this.hasNoData=this.isNullish(t),this.updateView(t??this.default)}set ifNonNullishDefault(t){this.default=t,this.hasNoData&&this.updateView(this.default)}set ifNonNullishFallback(t){this.fallbackTemplate=t??null,this.hasNoData&&this.isNullish(this.default)&&this.createFallbackView()}static ngTemplateGuard_ifNonNullish(t,i){return!0}static ngTemplateContextGuard(t,i){return!0}updateView(t){this.isNullish(t)?this.switchToFallbackView():this.switchToRegularView(t)}switchToRegularView(t){this.upsertContext(t),"regular"!==this.viewState&&this.createRegularView()}switchToFallbackView(){"fallback"!==this.viewState&&this.createFallbackView()}upsertContext(t){this.context?this.context.$implicit=this.context.ifNonNullish=t:this.context={$implicit:t,ifNonNullish:t}}createRegularView(){this.clearView(),this.viewContainerRef.createEmbeddedView(this.templateRef,this.context),this.viewState="regular"}createFallbackView(){this.clearView(),this.fallbackTemplate&&(this.viewContainerRef.createEmbeddedView(this.fallbackTemplate),this.viewState="fallback")}clearView(){"clear"!==this.viewState&&(this.viewContainerRef.clear(),this.viewState="clear")}isNullish(t){return null==t}static#e=this.\u0275fac=function(i){return new(i||p)(e.Y36(e.s_b),e.Y36(e.Rgc))};static#t=this.\u0275dir=e.lG2({type:p,selectors:[["","ifNonNullish",""]],inputs:{ifNonNullish:"ifNonNullish",ifNonNullishDefault:"ifNonNullishDefault",ifNonNullishFallback:"ifNonNullishFallback"},standalone:!0})}var L=l(8874);const F=["fallbackTemplateA"],U=["fallbackTemplateB"];function z(c,t){if(1&c&&(e.TgZ(0,"h3",7),e._uU(1),e.qZA()),2&c){const i=t.ifNonNullish;e.xp6(1),e.hij(" ",i," ")}}function P(c,t){1&c&&e.GkF(0)}function B(c,t){1&c&&(e.TgZ(0,"h3",7),e._uU(1,"A"),e.qZA())}function E(c,t){1&c&&(e.TgZ(0,"h3",7),e._uU(1,"B"),e.qZA())}class f{constructor(){this.interval$=function N(c=0,t=o.z){return c<0&&(c=0),(0,h.H)(c,c,t)}(1e3),this.hasData=!1,this.hasDefaultValue=!1,this.hasFallbackTemplate=!1,this.data$=this.interval$.pipe((0,n.U)(t=>!!(t%2)),(0,n.U)(t=>this.hasData?t:null),(0,r.x)()),this.defaultValue$=this.interval$.pipe((0,n.U)(t=>t%2),(0,n.U)(t=>this.hasDefaultValue?t:null),(0,r.x)()),this.fallbackTemplate$=this.interval$.pipe((0,n.U)(t=>t%2?this.fallbackTemplateA:this.fallbackTemplateB),(0,n.U)(t=>this.hasFallbackTemplate?t:null),(0,r.x)())}useData(t){this.hasData=t}useDefaultValue(t){this.hasDefaultValue=t}useFallbackTemplate(t){this.hasFallbackTemplate=t}static#e=this.\u0275fac=function(i){return new(i||f)};static#t=this.\u0275cmp=e.Xpm({type:f,selectors:[["app-if-non-nullish"]],viewQuery:function(i,d){if(1&i&&(e.Gf(F,5),e.Gf(U,5)),2&i){let a;e.iGM(a=e.CRH())&&(d.fallbackTemplateA=a.first),e.iGM(a=e.CRH())&&(d.fallbackTemplateB=a.first)}},standalone:!0,features:[e.jDz],decls:31,vars:18,consts:[[1,"title"],[1,"layout"],[1,"output"],["class","result",4,"ifNonNullish","ifNonNullishDefault","ifNonNullishFallback"],[1,"slides"],[1,"slide"],[3,"change"],[1,"result"],[4,"ngTemplateOutlet"],["linkHref","https://github.com/avine/ng-libs/blob/main/src/app/if-non-nullish/if-non-nullish.component.html",2,"text-align","center"],["fallbackTemplateA",""],["fallbackTemplateB",""]],template:function(i,d){1&i&&(e.TgZ(0,"h1",0),e._uU(1,"IfNonNullishDirective"),e.qZA(),e.TgZ(2,"div",1)(3,"div",2),e.YNc(4,z,2,1,"h3",3),e.ALo(5,"async"),e.ALo(6,"async"),e.ALo(7,"async"),e.qZA(),e.TgZ(8,"div",4)(9,"div",5)(10,"mat-slide-toggle",6),e.NdJ("change",function(s){return d.useData(s.checked)}),e._uU(11,"Data"),e.qZA(),e.TgZ(12,"h3",7),e._uU(13),e.ALo(14,"async"),e.qZA()(),e.TgZ(15,"div",5)(16,"mat-slide-toggle",6),e.NdJ("change",function(s){return d.useDefaultValue(s.checked)}),e._uU(17,"Default value"),e.qZA(),e.TgZ(18,"h3",7),e._uU(19),e.ALo(20,"async"),e.qZA()(),e.TgZ(21,"div",5)(22,"mat-slide-toggle",6),e.NdJ("change",function(s){return d.useFallbackTemplate(s.checked)}),e._uU(23,"Fallback template"),e.qZA(),e.YNc(24,P,1,0,"ng-container",8),e.ALo(25,"async"),e.qZA()(),e._UZ(26,"app-view-source",9),e.qZA(),e.YNc(27,B,2,0,"ng-template",null,10,e.W1O),e.YNc(29,E,2,0,"ng-template",null,11,e.W1O)),2&i&&(e.xp6(4),e.Q6J("ifNonNullish",e.lcZ(5,6,d.data$))("ifNonNullishDefault",e.lcZ(6,8,d.defaultValue$))("ifNonNullishFallback",e.lcZ(7,10,d.fallbackTemplate$)),e.xp6(9),e.Oqu(e.lcZ(14,12,d.data$)),e.xp6(6),e.Oqu(e.lcZ(20,14,d.defaultValue$)),e.xp6(5),e.Q6J("ngTemplateOutlet",e.lcZ(25,16,d.fallbackTemplate$)))},dependencies:[g.Ov,g.tP,p,q,y,L.t],styles:[".title[_ngcontent-%COMP%]{text-align:center}.layout[_ngcontent-%COMP%]{margin:36px auto;max-width:600px}.output[_ngcontent-%COMP%]{padding:48px;background-color:#f5f5f5;text-align:center;min-height:28px}.output[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{margin:0;line-height:28px;font-size:28px}.slides[_ngcontent-%COMP%]{margin-top:36px}.slides[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{min-height:28px;color:gray}@media (max-width: 719px){.slides[_ngcontent-%COMP%]{padding:0 36px}.slide[_ngcontent-%COMP%]{margin-bottom:16px;display:flex;justify-content:space-between;align-items:center}.slide[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{margin:0;padding-left:16px;line-height:1em}}@media (min-width: 720px){.slides[_ngcontent-%COMP%]{display:flex;justify-content:space-around}.slides[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{margin-top:18px;text-align:center}}"],changeDetection:0})}},8874:(x,u,l)=>{l.d(u,{t:()=>h});var o=l(4650);class h{static#e=this.\u0275fac=function(r){return new(r||h)};static#t=this.\u0275cmp=o.Xpm({type:h,selectors:[["app-view-source"]],inputs:{linkHref:"linkHref"},standalone:!0,features:[o.jDz],decls:3,vars:1,consts:[["target","_blank",1,"link",3,"href"],["src","../../../assets/code-solid.svg","alt","",1,"icon"]],template:function(r,g){1&r&&(o.TgZ(0,"a",0),o._UZ(1,"img",1),o._uU(2,"View Source\n"),o.qZA()),2&r&&o.Q6J("href",g.linkHref,o.LSH)},styles:["[_nghost-%COMP%]{display:block;margin-top:48px}.link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;position:relative;border-radius:4px;padding:.6em .9em;background-color:#eee;text-decoration:none;color:#000}.icon[_ngcontent-%COMP%]{width:1.25em;margin-right:.5em}"],changeDetection:0})}}}]);