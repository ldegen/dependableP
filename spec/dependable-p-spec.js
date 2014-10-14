Promise = require("promise");
DependableP = require("../src/dependable-p");
Dependable = require("dependable");

describe("Dependable-P",function(){
  var containerP, registerP, resolveP;

  beforeEach(function(){
    containerP = DependableP(Dependable.container());
    registerP=containerP.registerP;
    resolveP=containerP.resolveP;
  });

  it("adds methods to transparently deals with promises",function(done){
  
    registerP("foo",function(){
      return "foo";
    });
    registerP("bar",function(){
      return new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve("bar");
        },200);
      });
    });
    registerP("foobar",function(foo,bar){
      return foo+bar;
    });

    resolveP(function(foo,bar,foobar){
      expect(foo).toBe("foo");
      expect(bar).toBe("bar");
      expect(foobar).toBe("foobar");
      done();
    });

  });
});
