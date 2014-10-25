exports.Node = function () {
  var self = this;
  self.codeGenerated = false;
  
  Object.defineProperty(self, 'parent', {
    value: null,
    writable: true,
    configurable: true,
    enumerable: false
  });

  self.getContext = function () {
    if (self.type === 'Program' ||
        self.type === 'BlockStatement') {
      return { 
        node: self,
        position: -1
      };
    }
    
    if (self.parent === null) {
      return null;
    }
    
    var context = self.parent.getContext();
    
    if (!context) { 
      return null;
    }
    
    if (context.position === -1) {
      return {
        node: context.node,
        position: context.node.body.indexOf(self)
      };
    } else {
      return context;
    }
  };
};

exports.Node.prototype.codegen = function () {   
  if (this.codeGenerated) {
    return false;
  }
  
  this.codeGenerated = true;
  return true;
};