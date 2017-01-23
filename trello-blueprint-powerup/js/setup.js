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

var updateCards = function(t) {
  t.get('card', 'shared', 'type')
    .then(function(cards){
      console.log(cards);
      debugger;
    });
}

var cardButtonCallback = function(t){
  var items = Object.keys(blueprintMap).map(function(bp){
    return {
      text: blueprintMap[bp],
      callback: function(t){
        // console.log(t)
        return t.set('card', 'shared', 'type', bp)
          .then(function(){
            updateCards(t);
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


TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {

    updateCards(t);

    return [{
      // icon: GRAY_ICON,
      text: 'Blueprint',
      callback: cardButtonCallback
    }];
  },
});