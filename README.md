dependableP
===========

Use Promises with dependable.js

This project adds some syntactic sugar on top of the minimalistic DI-framework [dependable](http://github.com/idottv/dependable).

The idea is to allow functions given to register()/resolve() to depend on promises without having to explicitly resolve them. In fact, those functions can be completely ignorant of that the fact that their dependencies are Promises. 

Have a look at the [test code](./spec/dependable-p-spec.js) for a simple example.

Currently the implementation is a bit crude and not thoroughly tested. Feel free to comment.

Installation
============

There is no official released npm yet. Once I got around to that, it will be as simple as the usual

```
npm install --save dependable-p 
```

Usage
=====
Please refer to the [test code](./spec/dependable-p-spec.js)


