This blog is documenting my journey from being a professional React developer, to becoming proficient in WebAssembly using the Rust programming language. Follow this blog via RSS to get irregular updates and findings along my journey.

Learning Rust is an intimidating task for anybody, but for a self-taught web developer like me it is absolutely daunting. I was only ever confronted with high-level programming languages like JavaScript, Python and Kotlin, where a big chunk of complexity is abstracted away.

Additionally, I have never felt the pain, which apparently occurs when trying to manually manage memory. I have never written a line of C or C++. I have ever used languages with a garbage collector, so I never sweated much about memory leaks and inefficencies. So you might say that -for me - Rust is solving a problem that never had.

## New ways of the web

So why would a code newbie to this to himself? After all, in my own disciplines I am reasonably well versed, experienced, and sought-after within the tech-industry.

However, there is a door Rust opens, that might lead to a different future of web development. As more and more digital products move from running natively on the operating system to running in the browser, evermore computationally expensive tasks need to be handled. A future version of Photoshop - for example - might not be downloadable, but just run in a browser window. JavaScript though - being single-threaded - is not equipped to handle picture manipulation on this scale with performance, that would satisfy users.

## WebAssembly to the rescue

WebAssembly is a binary instruction format, that significantly improves performance for web pages working in the browser. Some call this "near native" speed, although [this might be a somewhat generous term.](https://www.usenix.org/system/files/atc19-jangda.pdf)

While a couple of years ago I had to download Firefox' nightly build to preview it's features, [it has now shipped in all the biggest browsers.](https://webassembly.org/roadmap/) Back then, it was far too early for me personally to get started with it, but as my expertise grew, so grew my confidence and with that my desire to learn something more complex and be a [beginner](https://tomvanderbilt.com/books/beginners-the-joy-and-transformative-power-of-lifelong-learning/) again.

## Why not just Python?

Even though I have never worked with it in a prefessional setting, I am fairly proficient in Python. In my opinion it's the best choice, whenever developer productivity is valued higher than runtime performance. Python by itself is extremely slow, but experienced Pythonistas know to offload computantionally expensive tasks to external packages, which are often implemented in C under the hood, making it - for example - data scientists weapon of choice.

### Not so fast!

Still, my assumption is, _(even though I couldn't find any explicit information on this)_ that Python, still providing a lot of convenience to the developer, will be outperformed by a systems-level language like Rust, even when run in the context of WebAssembly. The garbage collector, doesn't just go away, after all. I am planning to verify this assumption in the near future.

### Thrilling ecosystem

An axiom of the Rust community seems to be, that Rust is an excellent - if not the best - choice for WebAssembly. Such sentiments are often self-fulfilling prophecies, as a great ecosystem is powered by community growth, which in turn leads to more people contributing and giving back to the ecosystem.

This has so far beared fruit in the form of the \[yew front-end framework,\](https://yew.rs/) which is very similar to React, but comes with all the benefits WebAssembly promises. As things stand right now, I am planning to make this framework the focus of my studies, once I have climbed the steep first learning curve of the basics of Rust.