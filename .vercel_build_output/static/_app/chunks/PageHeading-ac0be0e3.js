import{S as R,i as q,s as w,e as g,t as E,k as H,c as v,a as T,h as N,d as c,m as L,b as p,g as S,F as h,j as A,r as b,G as B,P as D,Q as O,o as U,p as I,q as j}from"./index-189a526a.js";import{T as _,a as P}from"./constants-3bd77219.js";import{f as m}from"./index-8edb78f7.js";function k(a){let e,i,r,n,s;return{c(){e=g("subtitle"),i=E(a[1]),this.h()},l(l){e=v(l,"SUBTITLE",{class:!0});var f=T(e);i=N(f,a[1]),f.forEach(c),this.h()},h(){p(e,"class","font-serif text-xl italic")},m(l,f){S(l,e,f),h(e,i),s=!0},p(l,f){a=l,(!s||f&2)&&A(i,a[1])},i(l){s||(B(()=>{n&&n.end(1),r=D(e,m,{y:20,duration:_,delay:P+250}),r.start()}),s=!0)},o(l){r&&r.invalidate(),n=O(e,m,{y:-20,duration:_}),s=!1},d(l){l&&c(e),l&&n&&n.end()}}}function C(a){let e,i,r,n,s,l,f=Boolean(a[1]),d,t=f&&k(a);return{c(){e=g("div"),i=g("h1"),r=E(a[0]),l=H(),t&&t.c(),this.h()},l(u){e=v(u,"DIV",{class:!0});var o=T(e);i=v(o,"H1",{class:!0});var y=T(i);r=N(y,a[0]),y.forEach(c),l=L(o),t&&t.l(o),o.forEach(c),this.h()},h(){p(i,"class","mb-8 text-6xl"),p(e,"class","relative my-4 h-52 w-full text-center")},m(u,o){S(u,e,o),h(e,i),h(i,r),h(e,l),t&&t.m(e,null),d=!0},p(u,[o]){a=u,(!d||o&1)&&A(r,a[0]),o&2&&(f=Boolean(a[1])),f?t?(t.p(a,o),o&2&&b(t,1)):(t=k(a),t.c(),b(t,1),t.m(e,null)):t&&(U(),I(t,1,1,()=>{t=null}),j())},i(u){d||(B(()=>{s&&s.end(1),n=D(i,m,{y:40,duration:_,delay:P}),n.start()}),b(t),d=!0)},o(u){n&&n.invalidate(),s=O(i,m,{y:-20,duration:_}),I(t),d=!1},d(u){u&&c(e),u&&s&&s.end(),t&&t.d()}}}function F(a,e,i){let{heading:r}=e,{subheading:n=""}=e;return a.$$set=s=>{"heading"in s&&i(0,r=s.heading),"subheading"in s&&i(1,n=s.subheading)},[r,n]}class Y extends R{constructor(e){super(),q(this,e,F,C,w,{heading:0,subheading:1})}}export{Y as P};