import{S as K,i as M,s as W,G as L,e as b,t as F,c as w,a as y,h as G,d as _,b as c,g as I,F as v,j as Q,Q as X,R as z,k as B,m as H,H as Z,r as q,o as $,p as Y,q as x}from"./index-60c65196.js";import{f as N}from"./index-cc273379.js";const O=240,J=250;function j(e){let t,a=(e[3]>120?e[1][1]||"":e[1][0]||"")+"",i,l,n,u;return{c(){t=b("subtitle"),i=F(a),this.h()},l(o){t=w(o,"SUBTITLE",{class:!0});var r=y(t);i=G(r,a),r.forEach(_),this.h()},h(){c(t,"class","font-serif text-xl italic")},m(o,r){I(o,t,r),v(t,i),u=!0},p(o,r){e=o,(!u||r&10)&&a!==(a=(e[3]>120?e[1][1]||"":e[1][0]||"")+"")&&Q(i,a)},i(o){u||(L(()=>{n&&n.end(1),l=X(t,N,{y:20,duration:O,delay:J+250}),l.start()}),u=!0)},o(o){l&&l.invalidate(),n=z(t,N,{y:-20,duration:O}),u=!1},d(o){o&&_(t),o&&n&&n.end()}}}function C(e){let t,a;return{c(){t=b("div"),this.h()},l(i){t=w(i,"DIV",{class:!0,style:!0}),y(t).forEach(_),this.h()},h(){c(t,"class","absolute top-0 right-0 bg-stone-800"),c(t,"style",a=`width: ${e[3]*.8}%; height: ${404-e[3]}px`)},m(i,l){I(i,t,l)},p(i,l){l&8&&a!==(a=`width: ${i[3]*.8}%; height: ${404-i[3]}px`)&&c(t,"style",a)},d(i){i&&_(t)}}}function ee(e){let t=!1,a=()=>{t=!1},i,l,n,u,o=(e[3]>120?e[0][1]||"":e[0][0]||"")+"",r,k,T,S,A=e[1].some(Boolean),R,p,m,E,g,V,P;L(e[4]);let s=A&&j(e),f=e[3]<450&&C(e);return{c(){l=b("div"),n=b("div"),u=b("h1"),r=F(o),S=B(),s&&s.c(),R=B(),f&&f.c(),p=B(),m=b("div"),this.h()},l(d){l=w(d,"DIV",{class:!0});var h=y(l);n=w(h,"DIV",{class:!0});var D=y(n);u=w(D,"H1",{class:!0});var U=y(u);r=G(U,o),U.forEach(_),S=H(D),s&&s.l(D),D.forEach(_),R=H(h),f&&f.l(h),h.forEach(_),p=H(d),m=w(d,"DIV",{class:!0,style:!0}),y(m).forEach(_),this.h()},h(){c(u,"class","mb-8 text-6xl"),c(n,"class","relative my-4 h-52 w-full text-center"),c(l,"class","relative h-52 overflow-hidden"),c(m,"class","relative h-56 bg-contain bg-center bg-no-repeat text-red-500"),c(m,"style",E=`background-image: url('data:image/svg+xml;utf8,${e[2]}');`)},m(d,h){I(d,l,h),v(l,n),v(n,u),v(u,r),v(n,S),s&&s.m(n,null),v(l,R),f&&f.m(l,null),I(d,p,h),I(d,m,h),g=!0,V||(P=Z(window,"scroll",()=>{t=!0,clearTimeout(i),i=setTimeout(a,100),e[4]()}),V=!0)},p(d,[h]){e=d,h&8&&!t&&(t=!0,clearTimeout(i),scrollTo(window.pageXOffset,e[3]),i=setTimeout(a,100)),(!g||h&9)&&o!==(o=(e[3]>120?e[0][1]||"":e[0][0]||"")+"")&&Q(r,o),h&2&&(A=e[1].some(Boolean)),A?s?(s.p(e,h),h&2&&q(s,1)):(s=j(e),s.c(),q(s,1),s.m(n,null)):s&&($(),Y(s,1,1,()=>{s=null}),x()),e[3]<450?f?f.p(e,h):(f=C(e),f.c(),f.m(l,null)):f&&(f.d(1),f=null),(!g||h&4&&E!==(E=`background-image: url('data:image/svg+xml;utf8,${e[2]}');`))&&c(m,"style",E)},i(d){g||(L(()=>{T&&T.end(1),k=X(u,N,{y:40,duration:O,delay:J}),k.start()}),q(s),g=!0)},o(d){k&&k.invalidate(),T=z(u,N,{y:-20,duration:O}),Y(s),g=!1},d(d){d&&_(l),d&&T&&T.end(),s&&s.d(),f&&f.d(),d&&_(p),d&&_(m),V=!1,P()}}}function te(e,t,a){let{headings:i}=t,{subheadings:l=[void 0,void 0]}=t,{illustration:n=void 0}=t,u;function o(){a(3,u=window.pageYOffset)}return e.$$set=r=>{"headings"in r&&a(0,i=r.headings),"subheadings"in r&&a(1,l=r.subheadings),"illustration"in r&&a(2,n=r.illustration)},[i,l,n,u,o]}class se extends K{constructor(t){super(),M(this,t,te,ee,W,{headings:0,subheadings:1,illustration:2})}}export{se as P,O as T,J as a};
