(()=>{"use strict";var t={484:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.displayCoordinates=void 0,e.displayCoordinates=function(t,e){document.getElementById("coord-x").textContent=`Re: ${t.toFixed(15)}`,document.getElementById("coord-y").textContent=`Im: ${e.toFixed(15)}`}},133:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.resetConfigs=e.bindConfig=void 0;const i=[];e.bindConfig=function(t,e){const r=Number(t.min),s=Number(t.max),n=Number(t.value);i.push(t);const h=()=>{let i=Number(t.value);""===t.value&&(i=n,t.value=i.toString()),i<r?(i=r,t.value=i.toString()):i>s&&(i=s,t.value=i.toString()),i>=r&&i<=s&&e(i)};t.addEventListener("input",h),t.addEventListener("change",h)},e.resetConfigs=function(){i.forEach((t=>{t.value="";const e=document.createEvent("Event");e.initEvent("input"),t.dispatchEvent(e)}))}},750:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GestureDecoder=void 0,e.GestureDecoder=class{constructor(t){this.cache=[],this.x=0,this.y=0,this.delta=0,t.addEventListener("pointerdown",this.handlePointerDown.bind(this)),t.addEventListener("pointermove",this.handlePointerMove.bind(this)),t.addEventListener("pointerup",this.handlePointerUp.bind(this)),t.addEventListener("pointercancel",this.handlePointerUp.bind(this)),t.addEventListener("pointerout",this.handlePointerUp.bind(this)),t.addEventListener("pointerleave",this.handlePointerUp.bind(this))}on(t,e){switch(t){case"dragstart":this.dragStartHandler=e;break;case"dragupdate":this.dragUpdateHandler=e;break;case"dragstop":this.dragStopHandler=e;break;case"zoomstart":this.zoomStartHandler=e;break;case"zoomupdate":this.zoomUpdateHandler=e;break;case"zoomstop":this.zoomStopHandler=e}}handlePointerDown(t){switch(this.cache.push(t),this.cache.length){case 1:this.startDrag();break;case 2:this.stopDrag(),this.startZoom();break;case 3:this.stopZoom()}}handlePointerMove(t){for(let e=0;e<this.cache.length;++e)if(this.cache[e].pointerId==t.pointerId){this.cache[e]=t;break}switch(this.cache.length){case 1:this.updateDrag();break;case 2:this.updateZoom()}}handlePointerUp(t){let e=!1;switch(this.cache.length){case 1:this.stopDrag();break;case 2:this.stopZoom(),e=!0;break;case 3:this.startZoom()}for(let e=0;e<this.cache.length;++e)if(this.cache[e].pointerId==t.pointerId){this.cache.splice(e,1);break}e&&this.startDrag()}startDrag(){this.x=this.cache[0].clientX,this.y=this.cache[0].clientY,null!=this.dragStartHandler&&this.dragStartHandler({x:this.cache[0].clientX-this.x,y:this.cache[0].clientY-this.y})}updateDrag(){null!=this.dragUpdateHandler&&this.dragUpdateHandler({x:this.cache[0].clientX-this.x,y:this.cache[0].clientY-this.y})}stopDrag(){null!=this.dragStopHandler&&this.dragStopHandler({x:this.cache[0].clientX-this.x,y:this.cache[0].clientY-this.y})}startZoom(){const t=this.cache[0].clientX-this.cache[1].clientX,e=this.cache[0].clientY-this.cache[1].clientY;if(this.delta=Math.sqrt(t*t+e*e),null!=this.zoomStartHandler){const t=(this.cache[0].clientX+this.cache[1].clientX)/2,e=(this.cache[0].clientY+this.cache[1].clientY)/2;this.zoomStartHandler({x:t,y:e,scale:1})}}updateZoom(){if(null!=this.zoomUpdateHandler){const t=(this.cache[0].clientX+this.cache[1].clientX)/2,e=(this.cache[0].clientY+this.cache[1].clientY)/2,i=this.cache[0].clientX-this.cache[1].clientX,r=this.cache[0].clientY-this.cache[1].clientY,s=Math.sqrt(i*i+r*r);this.zoomUpdateHandler({x:t,y:e,scale:s/this.delta})}}stopZoom(){if(null!=this.zoomStopHandler){const t=(this.cache[0].clientX+this.cache[1].clientX)/2,e=(this.cache[0].clientY+this.cache[1].clientY)/2,i=this.cache[0].clientX-this.cache[1].clientX,r=this.cache[0].clientY-this.cache[1].clientY,s=Math.sqrt(i*i+r*r);this.zoomStopHandler({x:t,y:e,scale:s/this.delta})}}}},233:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.setupFullviewQuad=e.compileProgram=e.compileShader=void 0,e.compileShader=function(t,e,i){const r=t.createShader(e);if(null==r)throw new Error(`Failed to create a shader of type: ${e}`);if(t.shaderSource(r,i),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const e="Failed to compile shader:\n"+t.getShaderInfoLog(r);throw t.deleteShader(r),new Error(e)}return r},e.compileProgram=function(t,e,i){const r=t.createProgram();if(null==r)throw new Error("Failed to create a GL program");const s=t.createShader(t.VERTEX_SHADER);if(!s)throw t.deleteProgram(r),new Error("Failed to create vertex shader!");const n=t.createShader(t.FRAGMENT_SHADER);if(!n)throw t.deleteProgram(r),t.deleteShader(s),new Error("Failed to create fragment shader!");if(t.shaderSource(s,e),t.shaderSource(n,i),t.attachShader(r,s),t.attachShader(r,n),t.compileShader(s),t.compileShader(n),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS)){let e="Failed to link shader program:";const i=t.getProgramInfoLog(r);i&&(e+="\n"+i);const h=t.getShaderInfoLog(s);h&&(e+="Vertex shader log:\n"+h);const a=t.getShaderInfoLog(n);throw a&&(e+="Fragment shader log:\n"+a),t.deleteShader(s),t.deleteShader(n),t.deleteProgram(r),new Error(e)}return t.deleteShader(s),t.deleteShader(n),r},e.setupFullviewQuad=function(t,e,i){let r;if(r="string"==typeof i?i:t.getAttribLocation(e,i),-1==r)throw new Error(`Attribute ${i} was not found in the provided program.`);const s=t.createBuffer();if(null==s)throw new Error("Failed to create a buffer.");const n=new Float32Array([-1,-1,-1,1,1,-1,1,1]);return t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(r),s}},680:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.init_gpu_renderer=void 0;const r=i(233);class s{constructor(t,e,i){this.rect=new DOMRect(-1,-1,2,2),this.canvas=t,this.gl=t.getContext("webgl"),this.program=r.compileProgram(this.gl,e,i),r.setupFullviewQuad(this.gl,this.program,"aPos");const s=this.canvas.width/this.canvas.height;this.rect.width*=s,this.rect.x*=s,this.gl.useProgram(this.program),this.uniforms={uPos:this.gl.getUniformLocation(this.program,"uPos"),uDims:this.gl.getUniformLocation(this.program,"uDims"),uLim:this.gl.getUniformLocation(this.program,"uLim"),uEscapeD:this.gl.getUniformLocation(this.program,"uEscapeD"),uInsideColor:this.gl.getUniformLocation(this.program,"uInsideColor")}}resize(t,e){const i=t/e;this.rect.height*=e/this.canvas.height,this.rect.width=this.rect.height*i,this.canvas.width=t,this.canvas.height=e,this.gl.viewport(0,0,t,e),this.cachedConfig&&this.draw(this.cachedConfig)}pan(t,e){this.rect.x-=t/this.canvas.width*this.rect.width,this.rect.y+=e/this.canvas.height*this.rect.height,this.cachedConfig&&this.draw(this.cachedConfig)}zoom(t,e,i){this.rect.x+=t/this.canvas.width*(this.rect.width-this.rect.width*i),this.rect.y+=(1-e/this.canvas.height)*(this.rect.height-this.rect.height*i),this.rect.width*=i,this.rect.height*=i,this.cachedConfig&&this.draw(this.cachedConfig)}draw(t){this.gl.useProgram(this.program),this.gl.uniform2f(this.uniforms.uPos,this.rect.x+.5*this.rect.width,this.rect.y+.5*this.rect.height),this.gl.uniform2f(this.uniforms.uDims,.5*this.rect.width,.5*this.rect.height),this.gl.uniform1i(this.uniforms.uLim,t.limit),this.gl.uniform1f(this.uniforms.uEscapeD,2*t.escapeR),this.gl.uniform4f(this.uniforms.uInsideColor,0,0,0,1),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.cachedConfig=t}}e.init_gpu_renderer=function(t,e){return Promise.all([fetch("shaders/identity.vs",{mode:"same-origin"}).then((t=>t.text())),fetch(`shaders/${e}.fs`,{mode:"same-origin"}).then((t=>t.text()))]).then((([e,i])=>new s(t,e,i)))}},940:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(t,e,r){this.width=i.DEFAULT_WIDTH,this.menu=t,this.button=e,null!=r&&(this.width=r.width||i.DEFAULT_WIDTH,this.maxWidth=r.max_rel_width),this.button.addEventListener("click",this.toggle.bind(this)),this.close()}open(){null!=this.maxWidth&&window.innerWidth*this.maxWidth<this.width?this.menu.style.width="100%":this.menu.style.width=`${this.width}px`}close(){this.menu.style.width="0px"}toggle(){"0px"===this.menu.style.width?this.open():this.close()}}e.default=i,i.DEFAULT_WIDTH=400}},e={};function i(r){var s=e[r];if(void 0!==s)return s.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,i),n.exports}(()=>{const t=i(484),e=i(133),r=i(750),s=i(680),n=i(940),h=document.getElementById("canvas");let a,o=null,c=0,d=0,l=0;function u(){o&&a&&o.draw(a)}function g(t){c==t.x&&d==t.y||!o||o.pan(t.x-c,t.y-d),c=t.x,d=t.y}function m(t){g(t),t.scale!=l&&o&&o.zoom(t.x,t.y,l/t.scale),l=t.scale}(()=>{h.width=window.innerWidth,h.height=window.innerHeight,s.init_gpu_renderer(h,"mandel").then((t=>{o=t,requestAnimationFrame(u)}));const t=new r.GestureDecoder(h);t.on("dragstart",(t=>{c=t.x,d=t.y})),t.on("dragupdate",g),t.on("dragstop",g),t.on("zoomstart",(t=>{c=t.x,d=t.y,l=t.scale})),t.on("zoomupdate",m),t.on("zoomstop",m),h.addEventListener("wheel",(t=>null==o?void 0:o.zoom(t.clientX,t.clientY,1+.001*t.deltaY))),window.addEventListener("resize",(()=>null==o?void 0:o.resize(window.innerWidth,window.innerHeight)))})(),window.onload=()=>{new n.default(document.getElementById("side-menu"),document.getElementById("toggle-menu"),{width:400,max_rel_width:.6});{a={limit:0,escapeR:0};const t=document.getElementById("limit");a.limit=Number(t.value),e.bindConfig(t,(t=>{a.limit=t,requestAnimationFrame(u)}));const i=document.getElementById("escaper");a.escapeR=Number(i.value),e.bindConfig(i,(t=>{a.escapeR=t,requestAnimationFrame(u)}))}{const t=document.getElementById("toggle_fs");document.fullscreenEnabled?t.onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}:t.remove()}document.getElementById("redraw").onclick=u,document.getElementById("reset").onclick=()=>{if(e.resetConfigs(),o){const e=h.width/h.height;o.rect.y=-1,o.rect.height=2,o.rect.x=-e,o.rect.width=2*e,t.displayCoordinates(o.rect.x+.5*o.rect.width,o.rect.y+.5*o.rect.height)}},h.addEventListener("mousemove",(e=>{o&&t.displayCoordinates(o.rect.x+e.clientX/h.width*o.rect.width,o.rect.y+e.clientY/h.height*o.rect.height)})),h.addEventListener("mouseleave",(()=>{o&&t.displayCoordinates(o.rect.x+.5*o.rect.width,o.rect.y+.5*o.rect.height)})),o&&t.displayCoordinates(o.rect.x+.5*o.rect.width,o.rect.y+.5*o.rect.height)}})()})();