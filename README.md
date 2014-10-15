dependableP
===========

Use Promises with dependable.js

This project adds some syntactic sugar on top of the minimalistic DI-framework [dependable](http://github.com/idottv/dependable).

The idea is to allow functions given to register()/resolve() to depend on promises without having to explicitly resolve them. In fact, those functions can be completely ignorant of that the fact that their dependencies are Promises. 

Have a look at the [test code](./spec/dependable-p-spec.js) for a simple example.

Currently the implementation is a bit crude and not thoroughly tested. This project is at a rather experimental stage. In particular the API will change. Your ideas and feedback on this are welcome.

Installation
============

Just the usual

```
npm install --save dependable-p 
```


Usage
=====
Please refer to the [test code](./spec/dependable-p-spec.js)


Random Notes
============
I am still experimenting on how to best integrate this with dependable.
ATM, I clone the original container using `Object.create()` and add `registerP` and `resolveP`-Methods.
This works, but it has a serious flaw:

Dependencies registered via the new methods will always be promises. That is no problem as long as your code consistently uses the new API (which resolves the Promises for you) or expects promises and knows how to handle them.
This issue will inavoidably surface when you use the `get`-Method.

I *think* it would be better to actually override theoriginal `register`/`resolve` methods. I need to find a way to do this withouout too much duplication of the original code, though.

