var blueprintMap =  {
  'tp': 'Touchpoint',
  'ac': 'Actor', 
  'cr': 'Critical', 
  'da': 'Data',
  'id': 'Idea', 
  'ob': 'Observation',
  'po': 'Policy', 
  'qu': 'Question', 
  'st': 'Stakeholder', 
  'sy': 'System'
};

var updateCard = function(t, options) {
  return t.get('card', 'shared', 'type', '')
    .then(function(type){
        if(type == '' || Object.keys(blueprintMap).indexOf(type.toLowerCase()) < 0) {
          return [];
        }

        return [{
          title: 'Blueprint',
          text: 'BP',
          icon: '../images/' + type + '.svg'
        }];
    })
}

var cardButtonCallback = function(t){
  var items = Object.keys(blueprintMap).map(function(bp){
    return {
      text: blueprintMap[bp],
      callback: function(t){
        // console.log(t)
        return t.set('card', 'shared', 'type', bp)
          .then(function(){
            updateCard(t);
            t.closePopup();
          });
      }
    };
  });

  return t.popup({
    title: 'Blueprint Types',
    items: items,
    search: {
      count: 5,
      placeholder: 'Search Item Types',
      empty: 'No items found'
    }
  });
};


$(function(){
  setTimeout(function(){
    $( '.list-card' ).each( function( index ){
      debugger;
    });  
  }, 2000);
});


TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return updateCard(t, options)
  },

  'card-buttons': function(t, options) {
    return [{
      // icon: GRAY_ICON,
      text: 'Blueprint',
      callback: cardButtonCallback
    }];
  },
});