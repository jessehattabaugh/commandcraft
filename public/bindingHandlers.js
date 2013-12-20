/* sets a true/false radio button based on the boolean state of an observable */
ko.bindingHandlers.trueOrFalse = {
  init: function(element, valueAccessor, allBindingsAccessor) {
    var observable = valueAccessor(),
      interceptor = ko.computed({
        read: function() {
          return observable();  
        },
        write: function(newValue) {
          observable(newValue === "true");
        },
        owner: this   
      });
    ko.applyBindingsToNode(element, { checked: interceptor });     
  }
};