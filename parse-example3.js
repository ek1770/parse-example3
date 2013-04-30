Parse.initialize("LLHx2XYQ6XLq1ZZj8YEP0iqorXoKtORMIixYEKNt", "Gz8k5NT2CsV19kAxWFKy5mBxjmsq8QnVmIS5JPUE");

var Human = Parse.Object.extend('Human')
var human = new Human

$(document).ready(function(){

  $('.column-name-list').hide()
  $('.column-single-name').hide()
  // save input fields into Parse
  $('.button-save').click(function(){
    human.save({
      firstname: $('.human-first-name').val(),
      lastname: $('.human-last-name').val(),
      sex: $('.gender').val(),
    }, {
      success: function(human) {
        console.log('Saved')
      },
      error: function(human, error) {
      }
    });
  })

  $('.button-list').click(function(){
    $('.column-input-name').hide()
    $('.column-name-list').show()
    
  });  

    var query = new Parse.Query(Human);
    query.find({
    success:function(results) { 
      
      window.humans = results;
      
      renderHumansList(results)

      console.log('Successfully retrieved ' + results.length);
      },
      error: function(object, error) {
        console.log('ERROR! Try again' + error.code + error.message)
      }
    
  });

})



// This renders an array of humans onto the page
var renderHumansList = function(humans) {
  console.log('Checkout the humans in the database: ', humans);

  // loop through the array, and put each object's name 
  // into an <li> in the page.
  for(var i = 0; i < humans.length; i++) {
    var id = humans[i].id
    var firstname = '<h3>' + humans[i].get('firstname') + '</h3>';
    var lastname = '<h3>' + humans[i].get('lastname') + '</h3>';
    var gender = '<p>' + humans[i].get('sex') + '</p>';

    // $('.js-recipes-container ul').append('<li>'+firstname+lastname+gender+'</li>');

    var li = $('<li id="' + id + '">'+firstname+lastname+gender+'</li>').click(function(){
      var id = $(this).attr('id');
      console.log(id);

      query = new Parse.Query(Human)

      query.get(id,{
        success: function(result) {
          // do something here
          console.log(result.get('firstname'))
          renderSingleHuman(result)
        } 
      })
      // console.log('i =', i)
      // console.log(recipes[i].get('name'))
    });
    $('.retrieve-names ul').append(li);
  }
}


// render just one recipe
var renderSingleHuman = function(human) {
  $('.column-name-list').hide();
  $('.column-single-name').show(); 
  var firstname = '<br>' + '<input value=' + human.get('firstname') + '>' + '</input>' + '<br>';
  var lastname = '<input value=' + human.get('lastname') + '>' + '</input>' + '<br>' + '<br>';
  var gender = "<input type='radio' class='gender' value=" + human.get('sex') + '>' + '</input>' + '<br>' + '<br>';
  var savebutton = '<button class= ' + 'button-save' + 'value= ' + "'save'" + '</button>';
  $('.column-single-name').html(firstname + lastname + gender + savebutton);
  
  
  
}