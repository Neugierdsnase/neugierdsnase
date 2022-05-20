import{S as yn,i as vn,s as bn,D as rt,x as _n,y as gn,z as En,A as Sn,B as en,r as Tn,p as Cn,C as jn,P as tn,e as o,t,k as c,c as p,a as l,h as n,d as a,m as u,b as k,T as In,g as i,F as e,n as An}from"../../chunks/index-a4305d86.js";import{B as xn}from"../../chunks/BlogPostLayout-2987b3f1.js";import"../../chunks/Article-1fb784f3.js";import"../../chunks/PageHeading-8fc8889e.js";import"../../chunks/index-e10c4c74.js";function Pn(as){let d,m,T,_,h,w,C,Ia,Bs,es,Aa,Us,W,on=`<code class="language-rust"><span class="token comment">// ...</span>

<span class="token keyword">pub</span> <span class="token keyword">struct</span> <span class="token type-definition class-name">State</span> <span class="token punctuation">&#123;</span>
    entries<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">></span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">Component</span> <span class="token keyword">for</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Message</span> <span class="token operator">=</span> <span class="token class-name">Msg</span><span class="token punctuation">;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Properties</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">fn</span> <span class="token function-definition function">view</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
        <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
            <span class="token operator">&lt;</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span>section<span class="token operator">></span>
                    <span class="token operator">&lt;</span>header<span class="token operator">></span>
                        <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token punctuation">&#123;</span> <span class="token string">"todos"</span> <span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>header<span class="token operator">></span>
                    <span class="token operator">&lt;</span>section<span class="token operator">></span>
                        <span class="token operator">&lt;</span>ul<span class="token operator">></span>
                            <span class="token punctuation">&#123;</span> <span class="token keyword">for</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>val<span class="token closure-punctuation punctuation">|</span></span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">view_entry</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">view_entry</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>idx<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">usize</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">str</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
      <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
          <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">&#123;</span>entry<span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
      <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,Vs,y,xa,bs,Pa,Oa,_s,Ma,La,gs,Da,Ra,Ns,J,Ya,z,Ha,Fs,ts,Wa,Gs,x,Ja,$,za,$a,Ks,ns,qa,Qs,os,Ba,Xs,q,pn=`<code class="language-rust"><span class="token comment">// ...</span>

<span class="token keyword">pub</span> <span class="token keyword">struct</span> <span class="token type-definition class-name">State</span> <span class="token punctuation">&#123;</span>
    entries<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">></span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">Component</span> <span class="token keyword">for</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Message</span> <span class="token operator">=</span> <span class="token class-name">Msg</span><span class="token punctuation">;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Properties</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">fn</span> <span class="token function-definition function">view</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
        <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
            <span class="token operator">&lt;</span>div class<span class="token operator">=</span><span class="token string">"w-2/3 mx-auto"</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>section<span class="token operator">></span>
                    <span class="token operator">&lt;</span>header class<span class="token operator">=</span><span class="token string">"text-center my-4"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>h1 class<span class="token operator">=</span><span class="token string">"text-6xl text-red-600"</span><span class="token operator">></span><span class="token punctuation">&#123;</span> <span class="token string">"todos"</span> <span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>header<span class="token operator">></span>
                    <span class="token operator">&lt;</span>section class<span class="token operator">=</span><span class="token string">"my-4"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>ul<span class="token operator">></span>
                            <span class="token punctuation">&#123;</span> <span class="token keyword">for</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>val<span class="token closure-punctuation punctuation">|</span></span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">view_entry</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">view_entry</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>idx<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">usize</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">str</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
      <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
          <span class="token operator">&lt;</span>li class<span class="token operator">=</span><span class="token string">"p-4 pr-0 my-2 border-b-2 border-slate-200 last:border-0"</span><span class="token operator">></span>
              <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">&#123;</span>entry<span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
      <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,Zs,P,Ua,Es,Va,Na,sa,v,Fa,B,Ga,Ka,U,Qa,Xa,V,Za,se,aa,ps,ae,ea,ls,ee,ta,N,ln=`<code class="language-fish">yarn add -D tailwindcss
npx tailwindcss init</code>`,na,O,te,Ss,ne,oe,oa,F,rn=`<code class="language-json"><span class="token property">"tailwind"</span><span class="token operator">:</span> <span class="token string">"npx tailwindcss -i ./static/input.css -o ./output.css"</span><span class="token punctuation">,</span>
<span class="token property">"tailwind:watch"</span><span class="token operator">:</span> <span class="token string">"npx tailwindcss -i ./static/input.css -o ./output.css --watch"</span><span class="token punctuation">,</span></code>`,pa,M,pe,j,le,Ts,re,ie,ce,la,G,cn=`<code class="language-json"><span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"concurrently "webpack-dev-server --mode development --open" "yarn run tailwind:watch""</span><span class="token punctuation">,</span>
<span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"yarn run tailwind &amp;&amp; webpack --mode production"</span><span class="token punctuation">,</span>
<span class="token property">"build:dev"</span><span class="token operator">:</span> <span class="token string">"yarn run tailwind &amp;&amp; webpack --mode development"</span><span class="token punctuation">,</span></code>`,ra,rs,ue,ia,L,ke,Cs,de,he,ca,K,un=`<code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./src/**/*.rs'</span><span class="token punctuation">,</span> <span class="token string">'./static/index.html'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">extend</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span></code>`,ua,b,fe,js,me,we,Is,ye,ve,As,be,_e,ka,f,ge,xs,Ee,Se,Ps,Te,Ce,Os,je,Ie,Ms,Ae,xe,da,g,Pe,Ls,Oe,Me,Ds,Le,De,ha,is,Re,fa,cs,us,it,ma,ks,Ye,wa,ds,He,ya,E,Rs,I,We,Ys,Je,ze,Hs,$e,qe,Be,Ws,D,Ue,Q,Ve,Ne,X,Fe,Ge,Js,A,Ke,zs,Qe,Xe,$s,Ze,st,va,hs,at,ba,fs,et,_a,Z,tt,ss,nt;return{c(){d=o("p"),m=o("em"),T=t("If you are just looking for a template and don\u2019t care about the jibber-jabber: "),_=o("a"),h=t("Here you go. See ya!"),w=c(),C=o("p"),Ia=t(`One of the reasons Tailwind is great is that it is completely JavaScript-agnostic. As soon as you have DOM elements - however they were created or are being updated - Tailwind just works. This means it can be used with Angular, React, Svelte as much as with Solid, Inferno or whatever other ten-minute old JavaScript frameworks you can think of. But why stop there? If it is true what I just wrote, then not even JavaScript should be the limiting factor here (as it is - quite obviously - for
CSS-in-JS solutions).`),Bs=c(),es=o("p"),Aa=t("This is precisely why I argue it is a great choice for WebAssembly projects. Let\u2019s look at an example. Fear not, you don\u2019t have to fully understand what\u2019s going on here. Just know that Yew is a front-end framework for WebAssembly in Rust, that you can probably compare best with pre-v16 React (no hooks, but lifetime methods)."),Us=c(),W=o("pre"),Vs=c(),y=o("p"),xa=t("This is a (not quite complete) component written in Rust using the Yew framework. Speaking fuzzily about what\u2019s happening here: The "),bs=o("code"),Pa=t("view"),Oa=t(" method uses the "),_s=o("code"),Ma=t("html"),La=t(" macro to render HTML to the screen. You can also see an implementation block, that defines what an entry looks like, which is utilized by the iterator in the "),gs=o("code"),Da=t("ul"),Ra=t(" element."),Ns=c(),J=o("p"),Ya=t("So instead of JavaScript, we are writing our code in a multi-threaded systems-level language (thinking about the performance gains this promises should give you the shivers). This is possible because of the recently standardized WASM compile target, "),z=o("a"),Ha=t("which all major browsers have now implemented."),Fs=c(),ts=o("p"),Wa=t("As their respective ecosystems matured, Rust and WebAssembly developed a special kind of relationship. Rust has now become somewhat of the first choice for intellectually curious web developers if I can trust the information in my bubble."),Gs=c(),x=o("p"),Ja=t("Let\u2019s imagine for a second, that we would have to reinvent things like styled-components and styled-system for Yew and all the other frameworks, languages and frameworks in languages, that can compile to WASM. The horror! Thankfully - "),$=o("a"),za=t("as I have outlined here"),$a=t(" - Tailwind offers much (if not more) of the same functionality at practically no performance overhead."),Ks=c(),ns=o("h2"),qa=t("Rust is complicated enough, let\u2019s not also add CSS files"),Qs=c(),os=o("p"),Ba=t("The question in my mind is: Can we set up Tailwind so that we can style our Yew components like this?"),Xs=c(),q=o("pre"),Zs=c(),P=o("p"),Ua=t("The short answer is: "),Es=o("strong"),Va=t("\u201CYes!\u201D"),Na=t(" The slightly longer answer is: \u201CUhm, sure, but how do I set up my project for this? Will hot-reloading work?\u201D Let\u2019s find out. Spoiler alert: Everything will work just fine in the end."),sa=c(),v=o("p"),Fa=t("As is so often the case in technology, we can just copy the hard parts from the smart kids and some of them have created "),B=o("a"),Ga=t("this project template"),Ka=t(", which sets up Yew with "),U=o("a"),Qa=t("wasm-pack"),Xa=t(", which itself relies on "),V=o("a"),Za=t("webpack"),se=t(" to bundle WebAssembly code with the necessary JavaScript and CSS to make everything flow together."),aa=c(),ps=o("h2"),ae=t("Updating dependencies and scripts"),ea=c(),ls=o("p"),ee=t("To add Tailwind to this, let\u2019s - well - add tailwind."),ta=c(),N=o("pre"),na=c(),O=o("p"),te=t("In the "),Ss=o("code"),ne=t("package.json"),oe=t(" I added these two scripts:"),oa=c(),F=o("pre"),pa=c(),M=o("p"),pe=t("also, I updated the dev and build scripts to include transpiling our CSS (you will need to install "),j=o("a"),le=t("the "),Ts=o("code"),re=t("concurrently"),ie=t(" package"),ce=t(" globally if you haven\u2019t already)."),la=c(),G=o("pre"),ra=c(),rs=o("h2"),ue=t("Overhauling config files"),ia=c(),L=o("p"),ke=t("Now simply tell tailwind which files to include via the "),Cs=o("code"),de=t("tailwind.config.js"),he=t(":"),ca=c(),K=o("pre"),ua=c(),b=o("p"),fe=t("When examining the structure of our project, we can see that the styles are included in our app via the "),js=o("code"),me=t("bootstrap.js"),we=t(" file. So instead of the "),Is=o("code"),ye=t("styles.scss"),ve=t(" (we can delete that), let\u2019s use our "),As=o("code"),be=t("output.css"),_e=t(" file here."),ka=c(),f=o("p"),ge=t("We can also see, that there is some SCSS stuff going on, that we don\u2019t need, so let\u2019s clean that up, by removing the "),xs=o("code"),Ee=t("sass"),Se=t(" and "),Ps=o("code"),Te=t("sass-loader"),Ce=t(" dependencies and telling webpack to test for "),Os=o("code"),je=t("/\\.css$/i"),Ie=t(` instead of
`),Ms=o("code"),Ae=t("/\\.s[ac]ss$/i"),xe=t(" in its config."),da=c(),g=o("p"),Pe=t("Lastly, we don\u2019t need the \u201Ctodomvc\u201D stylesheets, that are currently in the "),Ls=o("code"),Oe=t("index.html"),Me=t("\u2019s "),Ds=o("code"),Le=t("head"),De=t(", so we can delete those too."),ha=c(),is=o("p"),Re=t("There we go! Mission accomplished!"),fa=c(),cs=o("p"),us=o("img"),ma=c(),ks=o("h2"),Ye=t("Some concerns"),wa=c(),ds=o("p"),He=t("There are still two things that need addressing though."),ya=c(),E=o("ol"),Rs=o("li"),I=o("p"),We=t("If you are trying this by yourself, you will quickly realize, that Tailwind\u2019s Intellisense needs an extra invitation to our "),Ys=o("code"),Je=t(".rs"),ze=t(" files. This is easily done by adding "),Hs=o("code"),$e=t('"tailwindCSS.includeLanguages": {"rust": "html"}'),qe=t(" to your settings (this is how it works in VSCode, haven\u2019t tried it in other editors). After a reload tailwind should start working its magic for us in our Yew HTML macros, what a time to be alive!"),Be=c(),Ws=o("li"),D=o("p"),Ue=t("Unfortunately, I haven\u2019t found a solution for this one. In all my other projects I use the "),Q=o("a"),Ve=t("tailwind prettier plugin"),Ne=t(" to enforce its "),X=o("a"),Fe=t("recommended class order."),Ge=c(),Js=o("li"),A=o("p"),Ke=t("You will notice that with every save, the hot-reloading is triggered "),zs=o("em"),Qe=t("twice"),Xe=t(". Presumably, the second reload is triggered by the updated "),$s=o("code"),Ze=t("output.css"),st=t(" file. This is of course not optimal, but I have also not found it to be a huge burden while developing."),va=c(),hs=o("h2"),at=t("Conclusion"),ba=c(),fs=o("p"),et=t("Aside from missing a few luxuries that the incredibly mature JavaScript ecosystem offers, I think this is a very comfortable way to leverage the powers of WebAssembly. In my opinion, the versatility of Tailwind adds immense value here, as both the technical, but also the mental overhead while developing are being kept to a minimum."),_a=c(),Z=o("p"),tt=t("You find the finished setup "),ss=o("a"),nt=t("in this repository."),this.h()},l(s){d=p(s,"P",{});var r=l(d);m=p(r,"EM",{});var ot=l(m);T=n(ot,"If you are just looking for a template and don\u2019t care about the jibber-jabber: "),_=p(ot,"A",{href:!0,rel:!0});var ct=l(_);h=n(ct,"Here you go. See ya!"),ct.forEach(a),ot.forEach(a),r.forEach(a),w=u(s),C=p(s,"P",{});var ut=l(C);Ia=n(ut,`One of the reasons Tailwind is great is that it is completely JavaScript-agnostic. As soon as you have DOM elements - however they were created or are being updated - Tailwind just works. This means it can be used with Angular, React, Svelte as much as with Solid, Inferno or whatever other ten-minute old JavaScript frameworks you can think of. But why stop there? If it is true what I just wrote, then not even JavaScript should be the limiting factor here (as it is - quite obviously - for
CSS-in-JS solutions).`),ut.forEach(a),Bs=u(s),es=p(s,"P",{});var kt=l(es);Aa=n(kt,"This is precisely why I argue it is a great choice for WebAssembly projects. Let\u2019s look at an example. Fear not, you don\u2019t have to fully understand what\u2019s going on here. Just know that Yew is a front-end framework for WebAssembly in Rust, that you can probably compare best with pre-v16 React (no hooks, but lifetime methods)."),kt.forEach(a),Us=u(s),W=p(s,"PRE",{class:!0});var kn=l(W);kn.forEach(a),Vs=u(s),y=p(s,"P",{});var R=l(y);xa=n(R,"This is a (not quite complete) component written in Rust using the Yew framework. Speaking fuzzily about what\u2019s happening here: The "),bs=p(R,"CODE",{});var dt=l(bs);Pa=n(dt,"view"),dt.forEach(a),Oa=n(R," method uses the "),_s=p(R,"CODE",{});var ht=l(_s);Ma=n(ht,"html"),ht.forEach(a),La=n(R," macro to render HTML to the screen. You can also see an implementation block, that defines what an entry looks like, which is utilized by the iterator in the "),gs=p(R,"CODE",{});var ft=l(gs);Da=n(ft,"ul"),ft.forEach(a),Ra=n(R," element."),R.forEach(a),Ns=u(s),J=p(s,"P",{});var pt=l(J);Ya=n(pt,"So instead of JavaScript, we are writing our code in a multi-threaded systems-level language (thinking about the performance gains this promises should give you the shivers). This is possible because of the recently standardized WASM compile target, "),z=p(pt,"A",{target:!0,href:!0});var mt=l(z);Ha=n(mt,"which all major browsers have now implemented."),mt.forEach(a),pt.forEach(a),Fs=u(s),ts=p(s,"P",{});var wt=l(ts);Wa=n(wt,"As their respective ecosystems matured, Rust and WebAssembly developed a special kind of relationship. Rust has now become somewhat of the first choice for intellectually curious web developers if I can trust the information in my bubble."),wt.forEach(a),Gs=u(s),x=p(s,"P",{});var ga=l(x);Ja=n(ga,"Let\u2019s imagine for a second, that we would have to reinvent things like styled-components and styled-system for Yew and all the other frameworks, languages and frameworks in languages, that can compile to WASM. The horror! Thankfully - "),$=p(ga,"A",{href:!0,rel:!0});var yt=l($);za=n(yt,"as I have outlined here"),yt.forEach(a),$a=n(ga," - Tailwind offers much (if not more) of the same functionality at practically no performance overhead."),ga.forEach(a),Ks=u(s),ns=p(s,"H2",{});var vt=l(ns);qa=n(vt,"Rust is complicated enough, let\u2019s not also add CSS files"),vt.forEach(a),Qs=u(s),os=p(s,"P",{});var bt=l(os);Ba=n(bt,"The question in my mind is: Can we set up Tailwind so that we can style our Yew components like this?"),bt.forEach(a),Xs=u(s),q=p(s,"PRE",{class:!0});var dn=l(q);dn.forEach(a),Zs=u(s),P=p(s,"P",{});var Ea=l(P);Ua=n(Ea,"The short answer is: "),Es=p(Ea,"STRONG",{});var _t=l(Es);Va=n(_t,"\u201CYes!\u201D"),_t.forEach(a),Na=n(Ea," The slightly longer answer is: \u201CUhm, sure, but how do I set up my project for this? Will hot-reloading work?\u201D Let\u2019s find out. Spoiler alert: Everything will work just fine in the end."),Ea.forEach(a),sa=u(s),v=p(s,"P",{});var Y=l(v);Fa=n(Y,"As is so often the case in technology, we can just copy the hard parts from the smart kids and some of them have created "),B=p(Y,"A",{target:!0,href:!0});var gt=l(B);Ga=n(gt,"this project template"),gt.forEach(a),Ka=n(Y,", which sets up Yew with "),U=p(Y,"A",{target:!0,href:!0});var Et=l(U);Qa=n(Et,"wasm-pack"),Et.forEach(a),Xa=n(Y,", which itself relies on "),V=p(Y,"A",{target:!0,href:!0});var St=l(V);Za=n(St,"webpack"),St.forEach(a),se=n(Y," to bundle WebAssembly code with the necessary JavaScript and CSS to make everything flow together."),Y.forEach(a),aa=u(s),ps=p(s,"H2",{});var Tt=l(ps);ae=n(Tt,"Updating dependencies and scripts"),Tt.forEach(a),ea=u(s),ls=p(s,"P",{});var Ct=l(ls);ee=n(Ct,"To add Tailwind to this, let\u2019s - well - add tailwind."),Ct.forEach(a),ta=u(s),N=p(s,"PRE",{class:!0});var hn=l(N);hn.forEach(a),na=u(s),O=p(s,"P",{});var Sa=l(O);te=n(Sa,"In the "),Ss=p(Sa,"CODE",{});var jt=l(Ss);ne=n(jt,"package.json"),jt.forEach(a),oe=n(Sa," I added these two scripts:"),Sa.forEach(a),oa=u(s),F=p(s,"PRE",{class:!0});var fn=l(F);fn.forEach(a),pa=u(s),M=p(s,"P",{});var Ta=l(M);pe=n(Ta,"also, I updated the dev and build scripts to include transpiling our CSS (you will need to install "),j=p(Ta,"A",{target:!0,href:!0});var Ca=l(j);le=n(Ca,"the "),Ts=p(Ca,"CODE",{});var It=l(Ts);re=n(It,"concurrently"),It.forEach(a),ie=n(Ca," package"),Ca.forEach(a),ce=n(Ta," globally if you haven\u2019t already)."),Ta.forEach(a),la=u(s),G=p(s,"PRE",{class:!0});var mn=l(G);mn.forEach(a),ra=u(s),rs=p(s,"H2",{});var At=l(rs);ue=n(At,"Overhauling config files"),At.forEach(a),ia=u(s),L=p(s,"P",{});var ja=l(L);ke=n(ja,"Now simply tell tailwind which files to include via the "),Cs=p(ja,"CODE",{});var xt=l(Cs);de=n(xt,"tailwind.config.js"),xt.forEach(a),he=n(ja,":"),ja.forEach(a),ca=u(s),K=p(s,"PRE",{class:!0});var wn=l(K);wn.forEach(a),ua=u(s),b=p(s,"P",{});var H=l(b);fe=n(H,"When examining the structure of our project, we can see that the styles are included in our app via the "),js=p(H,"CODE",{});var Pt=l(js);me=n(Pt,"bootstrap.js"),Pt.forEach(a),we=n(H," file. So instead of the "),Is=p(H,"CODE",{});var Ot=l(Is);ye=n(Ot,"styles.scss"),Ot.forEach(a),ve=n(H," (we can delete that), let\u2019s use our "),As=p(H,"CODE",{});var Mt=l(As);be=n(Mt,"output.css"),Mt.forEach(a),_e=n(H," file here."),H.forEach(a),ka=u(s),f=p(s,"P",{});var S=l(f);ge=n(S,"We can also see, that there is some SCSS stuff going on, that we don\u2019t need, so let\u2019s clean that up, by removing the "),xs=p(S,"CODE",{});var Lt=l(xs);Ee=n(Lt,"sass"),Lt.forEach(a),Se=n(S," and "),Ps=p(S,"CODE",{});var Dt=l(Ps);Te=n(Dt,"sass-loader"),Dt.forEach(a),Ce=n(S," dependencies and telling webpack to test for "),Os=p(S,"CODE",{});var Rt=l(Os);je=n(Rt,"/\\.css$/i"),Rt.forEach(a),Ie=n(S,` instead of
`),Ms=p(S,"CODE",{});var Yt=l(Ms);Ae=n(Yt,"/\\.s[ac]ss$/i"),Yt.forEach(a),xe=n(S," in its config."),S.forEach(a),da=u(s),g=p(s,"P",{});var ms=l(g);Pe=n(ms,"Lastly, we don\u2019t need the \u201Ctodomvc\u201D stylesheets, that are currently in the "),Ls=p(ms,"CODE",{});var Ht=l(Ls);Oe=n(Ht,"index.html"),Ht.forEach(a),Me=n(ms,"\u2019s "),Ds=p(ms,"CODE",{});var Wt=l(Ds);Le=n(Wt,"head"),Wt.forEach(a),De=n(ms,", so we can delete those too."),ms.forEach(a),ha=u(s),is=p(s,"P",{});var Jt=l(is);Re=n(Jt,"There we go! Mission accomplished!"),Jt.forEach(a),fa=u(s),cs=p(s,"P",{});var zt=l(cs);us=p(zt,"IMG",{src:!0,alt:!0}),zt.forEach(a),ma=u(s),ks=p(s,"H2",{});var $t=l(ks);Ye=n($t,"Some concerns"),$t.forEach(a),wa=u(s),ds=p(s,"P",{});var qt=l(ds);He=n(qt,"There are still two things that need addressing though."),qt.forEach(a),ya=u(s),E=p(s,"OL",{});var ws=l(E);Rs=p(ws,"LI",{});var Bt=l(Rs);I=p(Bt,"P",{});var ys=l(I);We=n(ys,"If you are trying this by yourself, you will quickly realize, that Tailwind\u2019s Intellisense needs an extra invitation to our "),Ys=p(ys,"CODE",{});var Ut=l(Ys);Je=n(Ut,".rs"),Ut.forEach(a),ze=n(ys," files. This is easily done by adding "),Hs=p(ys,"CODE",{});var Vt=l(Hs);$e=n(Vt,'"tailwindCSS.includeLanguages": {"rust": "html"}'),Vt.forEach(a),qe=n(ys," to your settings (this is how it works in VSCode, haven\u2019t tried it in other editors). After a reload tailwind should start working its magic for us in our Yew HTML macros, what a time to be alive!"),ys.forEach(a),Bt.forEach(a),Be=u(ws),Ws=p(ws,"LI",{});var Nt=l(Ws);D=p(Nt,"P",{});var qs=l(D);Ue=n(qs,"Unfortunately, I haven\u2019t found a solution for this one. In all my other projects I use the "),Q=p(qs,"A",{target:!0,href:!0});var Ft=l(Q);Ve=n(Ft,"tailwind prettier plugin"),Ft.forEach(a),Ne=n(qs," to enforce its "),X=p(qs,"A",{target:!0,href:!0});var Gt=l(X);Fe=n(Gt,"recommended class order."),Gt.forEach(a),qs.forEach(a),Nt.forEach(a),Ge=u(ws),Js=p(ws,"LI",{});var Kt=l(Js);A=p(Kt,"P",{});var vs=l(A);Ke=n(vs,"You will notice that with every save, the hot-reloading is triggered "),zs=p(vs,"EM",{});var Qt=l(zs);Qe=n(Qt,"twice"),Qt.forEach(a),Xe=n(vs,". Presumably, the second reload is triggered by the updated "),$s=p(vs,"CODE",{});var Xt=l($s);Ze=n(Xt,"output.css"),Xt.forEach(a),st=n(vs," file. This is of course not optimal, but I have also not found it to be a huge burden while developing."),vs.forEach(a),Kt.forEach(a),ws.forEach(a),va=u(s),hs=p(s,"H2",{});var Zt=l(hs);at=n(Zt,"Conclusion"),Zt.forEach(a),ba=u(s),fs=p(s,"P",{});var sn=l(fs);et=n(sn,"Aside from missing a few luxuries that the incredibly mature JavaScript ecosystem offers, I think this is a very comfortable way to leverage the powers of WebAssembly. In my opinion, the versatility of Tailwind adds immense value here, as both the technical, but also the mental overhead while developing are being kept to a minimum."),sn.forEach(a),_a=u(s),Z=p(s,"P",{});var lt=l(Z);tt=n(lt,"You find the finished setup "),ss=p(lt,"A",{href:!0,rel:!0});var an=l(ss);nt=n(an,"in this repository."),an.forEach(a),lt.forEach(a),this.h()},h(){k(_,"href","https://github.com/Neugierdsnase/yew-wasm-pack-template"),k(_,"rel","nofollow"),k(W,"class","language-rust"),k(z,"target","_blank"),k(z,"href","https://webassembly.org/roadmap/"),k($,"href","https://blog.vomkonstant.in/blog/comparing-tailwind-with-plain-css-is-wrong"),k($,"rel","nofollow"),k(q,"class","language-rust"),k(B,"target","_blank"),k(B,"href","https://github.com/yewstack/yew-wasm-pack-template"),k(U,"target","_blank"),k(U,"href","https://rustwasm.github.io/wasm-pack/installer/"),k(V,"target","_blank"),k(V,"href","https://webpack.js.org/"),k(N,"class","language-fish"),k(F,"class","language-json"),k(j,"target","_blank"),k(j,"href","https://www.npmjs.com/package/concurrently"),k(G,"class","language-json"),k(K,"class","language-js"),In(us.src,it="https://media2.giphy.com/media/Od0QRnzwRBYmDU3eEO/giphy.gif?cid=ecf05e477is7007gzagd8wbnm42z4wc0v0x9mewd2puwxc4k&rid=giphy.gif&ct=g")||k(us,"src",it),k(us,"alt","Very nice!"),k(Q,"target","_blank"),k(Q,"href","https://github.com/tailwindlabs/prettier-plugin-tailwindcss"),k(X,"target","_blank"),k(X,"href","https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted"),k(ss,"href","https://github.com/Neugierdsnase/yew-wasm-pack-template"),k(ss,"rel","nofollow")},m(s,r){i(s,d,r),e(d,m),e(m,T),e(m,_),e(_,h),i(s,w,r),i(s,C,r),e(C,Ia),i(s,Bs,r),i(s,es,r),e(es,Aa),i(s,Us,r),i(s,W,r),W.innerHTML=on,i(s,Vs,r),i(s,y,r),e(y,xa),e(y,bs),e(bs,Pa),e(y,Oa),e(y,_s),e(_s,Ma),e(y,La),e(y,gs),e(gs,Da),e(y,Ra),i(s,Ns,r),i(s,J,r),e(J,Ya),e(J,z),e(z,Ha),i(s,Fs,r),i(s,ts,r),e(ts,Wa),i(s,Gs,r),i(s,x,r),e(x,Ja),e(x,$),e($,za),e(x,$a),i(s,Ks,r),i(s,ns,r),e(ns,qa),i(s,Qs,r),i(s,os,r),e(os,Ba),i(s,Xs,r),i(s,q,r),q.innerHTML=pn,i(s,Zs,r),i(s,P,r),e(P,Ua),e(P,Es),e(Es,Va),e(P,Na),i(s,sa,r),i(s,v,r),e(v,Fa),e(v,B),e(B,Ga),e(v,Ka),e(v,U),e(U,Qa),e(v,Xa),e(v,V),e(V,Za),e(v,se),i(s,aa,r),i(s,ps,r),e(ps,ae),i(s,ea,r),i(s,ls,r),e(ls,ee),i(s,ta,r),i(s,N,r),N.innerHTML=ln,i(s,na,r),i(s,O,r),e(O,te),e(O,Ss),e(Ss,ne),e(O,oe),i(s,oa,r),i(s,F,r),F.innerHTML=rn,i(s,pa,r),i(s,M,r),e(M,pe),e(M,j),e(j,le),e(j,Ts),e(Ts,re),e(j,ie),e(M,ce),i(s,la,r),i(s,G,r),G.innerHTML=cn,i(s,ra,r),i(s,rs,r),e(rs,ue),i(s,ia,r),i(s,L,r),e(L,ke),e(L,Cs),e(Cs,de),e(L,he),i(s,ca,r),i(s,K,r),K.innerHTML=un,i(s,ua,r),i(s,b,r),e(b,fe),e(b,js),e(js,me),e(b,we),e(b,Is),e(Is,ye),e(b,ve),e(b,As),e(As,be),e(b,_e),i(s,ka,r),i(s,f,r),e(f,ge),e(f,xs),e(xs,Ee),e(f,Se),e(f,Ps),e(Ps,Te),e(f,Ce),e(f,Os),e(Os,je),e(f,Ie),e(f,Ms),e(Ms,Ae),e(f,xe),i(s,da,r),i(s,g,r),e(g,Pe),e(g,Ls),e(Ls,Oe),e(g,Me),e(g,Ds),e(Ds,Le),e(g,De),i(s,ha,r),i(s,is,r),e(is,Re),i(s,fa,r),i(s,cs,r),e(cs,us),i(s,ma,r),i(s,ks,r),e(ks,Ye),i(s,wa,r),i(s,ds,r),e(ds,He),i(s,ya,r),i(s,E,r),e(E,Rs),e(Rs,I),e(I,We),e(I,Ys),e(Ys,Je),e(I,ze),e(I,Hs),e(Hs,$e),e(I,qe),e(E,Be),e(E,Ws),e(Ws,D),e(D,Ue),e(D,Q),e(Q,Ve),e(D,Ne),e(D,X),e(X,Fe),e(E,Ge),e(E,Js),e(Js,A),e(A,Ke),e(A,zs),e(zs,Qe),e(A,Xe),e(A,$s),e($s,Ze),e(A,st),i(s,va,r),i(s,hs,r),e(hs,at),i(s,ba,r),i(s,fs,r),e(fs,et),i(s,_a,r),i(s,Z,r),e(Z,tt),e(Z,ss),e(ss,nt)},p:An,d(s){s&&a(d),s&&a(w),s&&a(C),s&&a(Bs),s&&a(es),s&&a(Us),s&&a(W),s&&a(Vs),s&&a(y),s&&a(Ns),s&&a(J),s&&a(Fs),s&&a(ts),s&&a(Gs),s&&a(x),s&&a(Ks),s&&a(ns),s&&a(Qs),s&&a(os),s&&a(Xs),s&&a(q),s&&a(Zs),s&&a(P),s&&a(sa),s&&a(v),s&&a(aa),s&&a(ps),s&&a(ea),s&&a(ls),s&&a(ta),s&&a(N),s&&a(na),s&&a(O),s&&a(oa),s&&a(F),s&&a(pa),s&&a(M),s&&a(la),s&&a(G),s&&a(ra),s&&a(rs),s&&a(ia),s&&a(L),s&&a(ca),s&&a(K),s&&a(ua),s&&a(b),s&&a(ka),s&&a(f),s&&a(da),s&&a(g),s&&a(ha),s&&a(is),s&&a(fa),s&&a(cs),s&&a(ma),s&&a(ks),s&&a(wa),s&&a(ds),s&&a(ya),s&&a(E),s&&a(va),s&&a(hs),s&&a(ba),s&&a(fs),s&&a(_a),s&&a(Z)}}}function On(as){let d,m;const T=[as[0],nn];let _={$$slots:{default:[Pn]},$$scope:{ctx:as}};for(let h=0;h<T.length;h+=1)_=rt(_,T[h]);return d=new xn({props:_}),{c(){_n(d.$$.fragment)},l(h){gn(d.$$.fragment,h)},m(h,w){En(d,h,w),m=!0},p(h,[w]){const C=w&1?Sn(T,[w&1&&en(h[0]),w&0&&en(nn)]):{};w&2&&(C.$$scope={dirty:w,ctx:h}),d.$set(C)},i(h){m||(Tn(d.$$.fragment,h),m=!0)},o(h){Cn(d.$$.fragment,h),m=!1},d(h){jn(d,h)}}}const nn={title:"Yew can use Tailwind anywhere!",alternateTitle:"How to set up Tailwind in Yew",subtitle:"even where there is no JavaScript",alternateSubtitle:"hot-reloading included",author:"Konstantin <mail@vomkonstant.in>",published:"2022-05-20",illustration:'<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"> <g transform="matrix(1.0416666666666667,0,0,1.0416666666666667,0,0)"><g id="Sketch-annotation-element-stroke-illustration-line-christmas-tree"> <path id="Vector" d="M109.792 217.109C109.765 204.323 110.467 191.578 110.325 178.8C95.681 180.458 64.1214 177.551 50.046 172.88C64.2747 156.903 81.393 143.904 93.3775 125.433C84.9496 125.157 76.8666 124.695 68.4687 123.744C82.5489 113.059 95.5235 99.3278 106.184 84.294C99.3939 83.8783 92.4928 84.4198 85.6814 84.2545C90.0047 78.3398 95.7493 73.6413 99.7443 67.475C109.028 53.1462 116.275 38.5515 123.15 22.6654C126.102 31.8228 130.862 39.6342 135.307 47.8405C141.169 58.6642 147.894 72.5774 157.736 79.6588C151.974 79.9709 146.271 80.8027 140.499 80.9746C146.46 95.5867 159.76 107.962 172.317 114.977C164.49 118.685 156.882 120.481 148.571 121.838C150.729 126.998 154.624 130.935 157.832 135.192C167.034 147.399 177.508 157.355 189.744 165.217C179.65 173.733 146.79 179.502 134.242 178.65C133.865 191.174 135.567 203.566 135.901 216.059" stroke="currentColor" stroke-width="5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></g></svg>'};function Mn(as,d,m){return as.$$set=T=>{m(0,d=rt(rt({},d),tn(T)))},d=tn(d),[d]}class Wn extends yn{constructor(d){super(),vn(this,d,Mn,On,bn,{})}}export{Wn as default,nn as metadata};