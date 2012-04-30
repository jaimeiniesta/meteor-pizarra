Cells = new Meteor.Collection("cells");

if (Meteor.is_client) {
  Template.board.cells = function () {
    return Cells.find({}, {sort: {position: 1}});
  };

  Template.cell.at_end_of_row = function () {
    return (((this.position + 1) % 30) == 0) ? true : false;
  };

  Template.cell.events = {
    'click': function () {
      var cell     = Cells.findOne(this._id);

      Cells.update(this._id, {$set: { active: !cell.active}});
    }
  };
}

// On server startup, create the cells if database is empty
if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Cells.find().count() === 0) {
      Cells.remove({});
      for (var i = 0; i < 900; i++) {
        Cells.insert({position: i, active: false});
      }
    }
  });
}
