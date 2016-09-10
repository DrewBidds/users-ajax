$(document).ready(function() {
    var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

    // GET INDEX ACTION OF UserS CONTROLLER
    // THIS IS A SERVER THAT LIVES SOMEWHERE ELSE
  function loadUsers() {
    $('users').empty();
      $.ajax({
          url: BASEURL + '/users',
          type: 'GET',
          dataType: 'JSON'
      }).done(function(data) {
          data.forEach(function(user){
              $('#users').prepend('<li>' + user.title + '<button data-user-id="' + user.id + '"class="delete_user">Delete</button></li>');
          });
      }).fail(function(data) {
          console.log(data);
      });
  }
  $('#load_users').click(function() {
    loadUsers();
  });

  // dynamic click handler for anything
  // added after your page loaded
  $(document).on('click', '.delete_user', function() {
      // find the user id
      var userId = $(this).data('user-id');
      // make the DELETE ajax call
      $.ajax({
        url: BASEURL + '/users/' + userId,
        type: 'DELETE',
        dataType: 'JSON',
      }).done(function(data){
        loadUsers();
      }).fail(function(data){
        console.log(data);
      });
      // pass the id as data to the server
      // handle success and fail
  });

  $('#show_create').click(function() {
      var $newUserContent = $('#new_user_content');
      $newUserContent.slideToggle(400, function(){
          var $createButton = $('#show_create');
          if($newUserContent.is(':hidden')) {
              $createButton.text('Create User');
          } else {
              $createButton.text('Hide Create User');
          }
      });
  });

  $('#new_user').submit(function(e) {
    e.preventDefault();
    // ajax call
    var $userTitle = $('#user_title');
    var $userCode = $('#user_code');
    var $userDesc = $('#user_desc');
      $.ajax({
      url: BASEURL + $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'JSON',
      data: {user: {title: $userTitle.val(),
                                code: $userCode.val(),
                              description: $userDesc.val()}}
    }).done(function(data){
      alert("User created succesfully");
      $userTitle.val(' ');
      $userCode.val(' ');
      $userDesc.val(' ');
      $userTitle.focus();
      loadUsers();
    }).fail(function(data){
      console.log(data);
    });
    // post to /users
    // pass some data to the SERVER
    // tell it that we want json back
    // handle the success and fail of the ajax call
  });
});
