/* Tag class * Represents a node in the tag tree heirarchy ****************/
function Tag(data, parent) {
  var that = this;
  
  // data about this tag from the DB
  this.data = data? data: {id: 'root', type: 'compound'}; // defaults
  
  // this tag's parent in the tag hierarchy
  this.parent = parent ? parent : null;
  
  // tags which can be children of this tag
  this.options = ko.observableArray();
  $.get('tags' + (this.data.id ? '?parent=' + this.data.id : ''), {}, function success(res) { 
    that.options(res);
  });
  
  // the child tag the user has selected for adding
  this.selected = ko.observable();
  
  // values loaded from the DB that can chosen for this tag
  this.values = ko.observable();
  if (this.data.type === 'value') {
    $.get('values?kind__in=' + this.data.kind, {}, function success(res) { 
      that.values(res);
      //console.log(res);
    });
  }
  
  // the value that the user has input
  this.value = ko.observable(this.data.type === 'string' ? '' : (this.data.type === 'boolean' ? false : 0)); // not used by lists or compounds
  
  // the children tags of this tag
  this.children = ko.observableArray([]); // not used by strings, numbers, or bools
  
  /* determine if this tag can have children added to it ******************/
  this.canAdd = function () {
    //console.log(this.data.type);
    if (this.data.type === 'list') {
      //console.log(this.children().length);
      return this.data.limit ? this.children().length < this.data.limit : true;
    } 
    else if (this.data.type === 'compound') {
      return this.options().length > 0;
    } 
    else {
      return false;
    }
  };
  
  /* adds a child to this node ********************************************/
  this.addChild = function (data) {
    console.log("adding a child");
    console.dir(data.selected());
    var tag = new Tag(data.selected(), this);
    this.children.push(tag);
    
    // remove the tag from the list of options
    if (this.data.type !== 'list') { // lists can have multiples
      this.options.remove(function (item) {
        return item.id == tag.data.id;
      });
    }
    
  };
  
  /* removes this tag from it's parent and adds it's option back to the parents menu */
  this.removeSelf = function (data) {
    this.parent.options.push(this.parent.children.remove(data)[0].data);
  };
  
  /* recursively turns a this tag and it's children into strings **********/
  this.toString = ko.computed(function () {
    if (
      that.data.type === 'list' ||
      that.data.type === 'compound'
    ) {
      var out = Array(),
        children = that.children();
        
      for(var i = 0, n = children.length; i < n; i++) {
        // only compounds have identifiers for their children
        out.push((that.data.type === 'compound' ? children[i].data.id + ':' : '') + children[i].toString());
      }
      if (that.data.type === 'list') {
        return "[" + out.join(',') + "]";
      } else {
        return "{" + out.join(',') + "}";
      }
    } 
    else if (that.data.type === 'string') {
      return '"' + that.value() + '"';
    } 
    else if (that.data.type === 'boolean') {
      return that.value() ? 1 : 0;
    }
    else if (that.data.type === 'value') {
      var val = that.value();
      return val ? (that.data.property ? val[that.data.property]  : val.id) : '';
    }
    else {
      return that.value();
    }
  });
}