import{S as W,i as x,s as $,G as P,e as I,t as z,c as F,a as S,h as M,d as m,b as A,g as O,F as C,j as Q,Q as Z,R as J,k as B,m as G,H as ee,r as H,o as te,p as q,q as ae}from"./index-60c65196.js";import{f as D}from"./index-cc273379.js";var L=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},V={exports:{}};/*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */(function(e,t){(function(f){var i=t,o=e&&e.exports==i&&e,n=typeof L=="object"&&L;(n.global===n||n.window===n)&&(f=n);var d=function(r){this.message=r};d.prototype=new Error,d.prototype.name="InvalidCharacterError";var c=function(r){throw new d(r)},a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=/[\t\n\f\r ]/g,T=function(r){r=String(r).replace(p,"");var v=r.length;v%4==0&&(r=r.replace(/==?$/,""),v=r.length),(v%4==1||/[^+a-zA-Z0-9/]/.test(r))&&c("Invalid character: the string to be decoded is not correctly encoded.");for(var _=0,h,b,w="",s=-1;++s<v;)b=a.indexOf(r.charAt(s)),h=_%4?h*64+b:b,_++%4&&(w+=String.fromCharCode(255&h>>(-2*_&6)));return w},k=function(r){r=String(r),/[^\0-\xFF]/.test(r)&&c("The string to be encoded contains characters outside of the Latin1 range.");for(var v=r.length%3,_="",h=-1,b,w,s,l,u=r.length-v;++h<u;)b=r.charCodeAt(h)<<16,w=r.charCodeAt(++h)<<8,s=r.charCodeAt(++h),l=b+w+s,_+=a.charAt(l>>18&63)+a.charAt(l>>12&63)+a.charAt(l>>6&63)+a.charAt(l&63);return v==2?(b=r.charCodeAt(h)<<8,w=r.charCodeAt(++h),l=b+w,_+=a.charAt(l>>10)+a.charAt(l>>4&63)+a.charAt(l<<2&63)+"="):v==1&&(l=r.charCodeAt(h),_+=a.charAt(l>>2)+a.charAt(l<<4&63)+"=="),_},y={encode:k,decode:T,version:"1.0.0"};if(i&&!i.nodeType)if(o)o.exports=y;else for(var E in y)y.hasOwnProperty(E)&&(i[E]=y[E]);else f.base64=y})(L)})(V,V.exports);var U=V.exports;const N=240,K=250;function X(e){let t,f=(e[3]>120?e[1][1]||"":e[1][0]||"")+"",i,o,n,d;return{c(){t=I("subtitle"),i=z(f),this.h()},l(c){t=F(c,"SUBTITLE",{class:!0});var a=S(t);i=M(a,f),a.forEach(m),this.h()},h(){A(t,"class","font-serif text-xl italic")},m(c,a){O(c,t,a),C(t,i),d=!0},p(c,a){e=c,(!d||a&10)&&f!==(f=(e[3]>120?e[1][1]||"":e[1][0]||"")+"")&&Q(i,f)},i(c){d||(P(()=>{n&&n.end(1),o=Z(t,D,{y:20,duration:N,delay:K+250}),o.start()}),d=!0)},o(c){o&&o.invalidate(),n=J(t,D,{y:-20,duration:N}),d=!1},d(c){c&&m(t),c&&n&&n.end()}}}function Y(e){let t,f;return{c(){t=I("div"),this.h()},l(i){t=F(i,"DIV",{class:!0,style:!0}),S(t).forEach(m),this.h()},h(){A(t,"class","absolute top-0 right-0 bg-stone-800"),A(t,"style",f=`width: ${e[3]*.8}%; height: ${404-e[3]}px`)},m(i,o){O(i,t,o)},p(i,o){o&8&&f!==(f=`width: ${i[3]*.8}%; height: ${404-i[3]}px`)&&A(t,"style",f)},d(i){i&&m(t)}}}function re(e){let t=!1,f=()=>{t=!1},i,o,n,d,c=(e[3]>120?e[0][1]||"":e[0][0]||"")+"",a,p,T,k,y=e[1].some(Boolean),E,r,v,_,h,b,w;P(e[4]);let s=y&&X(e),l=e[3]<450&&Y(e);return{c(){o=I("div"),n=I("div"),d=I("h1"),a=z(c),k=B(),s&&s.c(),E=B(),l&&l.c(),r=B(),v=I("div"),this.h()},l(u){o=F(u,"DIV",{class:!0});var g=S(o);n=F(g,"DIV",{class:!0});var R=S(n);d=F(R,"H1",{class:!0});var j=S(d);a=M(j,c),j.forEach(m),k=G(R),s&&s.l(R),R.forEach(m),E=G(g),l&&l.l(g),g.forEach(m),r=G(u),v=F(u,"DIV",{class:!0,style:!0}),S(v).forEach(m),this.h()},h(){A(d,"class","mb-8 text-6xl"),A(n,"class","relative my-4 h-52 w-full text-center"),A(o,"class","relative h-52 overflow-hidden"),A(v,"class","relative h-80 bg-contain bg-center bg-no-repeat text-red-500"),A(v,"style",_=`background-image: url("data:image/svg;base64,${U.encode(e[2])}"`)},m(u,g){O(u,o,g),C(o,n),C(n,d),C(d,a),C(n,k),s&&s.m(n,null),C(o,E),l&&l.m(o,null),O(u,r,g),O(u,v,g),h=!0,b||(w=ee(window,"scroll",()=>{t=!0,clearTimeout(i),i=setTimeout(f,100),e[4]()}),b=!0)},p(u,[g]){e=u,g&8&&!t&&(t=!0,clearTimeout(i),scrollTo(window.pageXOffset,e[3]),i=setTimeout(f,100)),(!h||g&9)&&c!==(c=(e[3]>120?e[0][1]||"":e[0][0]||"")+"")&&Q(a,c),g&2&&(y=e[1].some(Boolean)),y?s?(s.p(e,g),g&2&&H(s,1)):(s=X(e),s.c(),H(s,1),s.m(n,null)):s&&(te(),q(s,1,1,()=>{s=null}),ae()),e[3]<450?l?l.p(e,g):(l=Y(e),l.c(),l.m(o,null)):l&&(l.d(1),l=null),(!h||g&4&&_!==(_=`background-image: url("data:image/svg;base64,${U.encode(e[2])}"`))&&A(v,"style",_)},i(u){h||(P(()=>{T&&T.end(1),p=Z(d,D,{y:40,duration:N,delay:K}),p.start()}),H(s),h=!0)},o(u){p&&p.invalidate(),T=J(d,D,{y:-20,duration:N}),q(s),h=!1},d(u){u&&m(o),u&&T&&T.end(),s&&s.d(),l&&l.d(),u&&m(r),u&&m(v),b=!1,w()}}}function le(e,t,f){let{headings:i}=t,{subheadings:o=[void 0,void 0]}=t,{illustration:n=void 0}=t,d;function c(){f(3,d=window.pageYOffset)}return e.$$set=a=>{"headings"in a&&f(0,i=a.headings),"subheadings"in a&&f(1,o=a.subheadings),"illustration"in a&&f(2,n=a.illustration)},[i,o,n,d,c]}class oe extends W{constructor(t){super(),x(this,t,le,re,$,{headings:0,subheadings:1,illustration:2})}}export{oe as P,N as T,K as a,L as c};