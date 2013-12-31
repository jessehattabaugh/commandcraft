/* View Model *************************************************************/
function View() {
  var that = this;
  
  // ajax observables
  this.commands = ko.observable({id: "Loading..."});
  this.variables = ko.observable();
  this.entities = ko.observable();
  this.items = ko.observable({id: "Loading..."});
  $.get('commands?sort=id', {}, function success(res) { that.commands(res); });
  $.get('variables?sort=id', {}, function success(res) { that.variables(res); });
  $.get('values?kind__in=entity', {}, function success(res) { that.entities(res); });
  $.get('values?kind__in=block,item', {}, function success(res) { that.items(res); });
  
  // user input observables
  this.command = ko.observable('');
  this.item = ko.observable({});
  this.tag = ko.computed(function () {
    if (that.command().id === 'give') {
      return new Tag({id:'tag', type:'compound'});
    } else {
      return new Tag({id:'Entity', type:'compound'});
    }
  });
  
  // the string that determines which player the command effects
  this.player = ko.observable();
  
  // whether or not the player drop down is open
  this.playerDropdown = ko.observable(false);
  
  // opens and closes the player variable dropdown
  this.togglePlayerDropdown = function () {
    this.playerDropdown(this.playerDropdown() ? false : true);
  };
  
  // fired when the user selects from the dropdown menu
  this.selectPlayerVariable = function (data) {
    that.player(data.id);
    that.playerDropdown(false);
  };
  
  this.amount = ko.observable(1);
  this.metadata = ko.observable(0);
  this.entity = ko.observable('');
  this.x = ko.observable('0');
  this.x.rel = ko.observable(true);
  this.y = ko.observable('0');
  this.y.rel = ko.observable(true);
  this.z = ko.observable('0');
  this.z.rel = ko.observable(true);
  
  /* output the compiled command ******************************************/
  this.output = ko.computed(function compile() {
    var args = [that.command().id];
    
    switch (args[0]) {
        
      case 'give':
        args = args.concat([
          that.player(),
          that.item().id,
          that.amount(),
          that.metadata(),
          that.tag().toString()
        ]);
        break;
        
      case 'summon':
        args = args.concat([
          that.entity().name,
          (that.x.rel() ? '~' : '') + that.x(),
          (that.y.rel() ? '~' : '') + that.y(),
          (that.z.rel() ? '~' : '') + that.z(),
          that.tag().toString()
        ]);
        break;
    }
    return "/" + args.join(" ");
  });
}