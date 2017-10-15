// Your jQuery goes here

//local storage access
var userData = {};
if(localStorage.getItem('userData')){
  userData = JSON.parse(localStorage.getItem('userData'));
  //to keep the same page on refresh
  $(".question").hide();
  $("#"+userData.currentQuestion).show();
  //with the last data
  //q1
  $("#name").val(userData.name);
  $("#email").val(userData.email);
  if(userData.name!="" && userData.email!="")
    $("#q1nxt").prop("disabled",false);
  //q2a
  var l = $("#q2a input[name='likesHTML']");
  for(var i=0; i<userData.html.likes.length; i++){
    //console.log(userData.html.likes[i]);
    $(l[userData.html.likes[i]]).prop('checked', true);
  }
  var dl = $("#q2a input[name='dlikesHTML']");
  for(var i=0; i<userData.html.dislikes.length; i++){
    //console.log(userData.html.dislikes[i]);
    $(dl[userData.html.dislikes[i]]).prop('checked', true);
  }
  //q2b
  l = $("#q2b input[name='likesCSS']");
  for(var i=0; i<userData.css.likes.length; i++){
    //console.log(userData.html.likes[i]);
    $(l[userData.css.likes[i]]).prop('checked', true);
  }
  dl = $("#q2b input[name='dlikesCSS']");
  for(var i=0; i<userData.css.dislikes.length; i++){
    //console.log(userData.html.dislikes[i]);
    $(dl[userData.css.dislikes[i]]).prop('checked', true);
  }
  //q2c
  l = $("#q2c input[name='likesJS']");
  for(var i=0; i<userData.js.likes.length; i++){
    //console.log(userData.html.likes[i]);
    $(l[userData.js.likes[i]]).prop('checked', true);
  }
  dl = $("#q2c input[name='dlikesJS']");
  for(var i=0; i<userData.js.dislikes.length; i++){
    //console.log(userData.html.dislikes[i]);
    $(dl[userData.js.dislikes[i]]).prop('checked', true);
  }
  $("#htmlnxt, #cssnxt, #jsnxt").click(function(event){
    if (userData.position[0] == true && userData.position[1] == true && userData.position[2] == true)
    {
      $("#q2").hide();
      $("#q2a").hide();
      $("#q2b").hide();
      $("#q2c").hide();
      $("#q3").show();
    }
  });
  //q3
  var r = $("#q3 input[name='rHTML']");
  for(var i=0; i<r.length; i++){
    if(i == userData.strengths.html)
      $(r[i]).prop('checked', true);
  }
  var r = $("#q3 input[name='rCSS']");
  for(var i=0; i<r.length; i++){
    if(i == userData.strengths.css)
      $(r[i]).prop('checked', true);
  }
  var r = $("#q3 input[name='rJS']");
  for(var i=0; i<r.length; i++){
    if(i == userData.strengths.js)
      $(r[i]).prop('checked', true);
  }
  $("#q3nxt").click(function(event){
    if(userData.strengths.html!="" && userData.strengths.css!="" && userData.strengths.js!=""){
      $("#q3").hide();
      $("#thanks").show();
    }
  });

}else{
  userData = {
    name:"",
    email:"",
    html: {likes: [], dislikes: []},
    css: {likes: [], dislikes: []},
    js: {likes: [], dislikes: []},
    position: [false, false, false],
    strengths: {html:"", css:"", js:""},
    currentQuestion: "welcome"
  };
  localStorage.setItem('userData', JSON.stringify(userData));
}

$("#startbtn").click(function(event){
  $("#welcome").hide('blind');
  $("#q1").show('blind');

  /*if(userData.name)
    $("#name").val(userData.name);
  */
});


function validateName(name){
	var re = /^[A-Za-z ]+$/;
	return re.test(name);
}

function validateEmail(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

$("#name").change(function(event){
  //console.log($("#name").val());
  if(!validateName($("#name").val()))
    alert("Please enter a valid name");
});

$("#email").change(function(event){
  //console.log($("#email").val());
  //to-do: validate email value
  if(!validateEmail($("#email").val()))
    alert("Please enter a valid email address");
    if(validateName($("#name").val()) && validateEmail($("#email").val()))
      $("#q1nxt").prop("disabled",false);
});
/*
$("#q1nxt").hover(function(){
  if(validateName($("#name").val()) && validateEmail($("#email").val()))
    $("#q1nxt").prop("disabled",false);
});
*/
$("#q1nxt").click(function(event){
  userData.name = $("#name").val();
  userData.email = $("#email").val();
  userData.currentQuestion = "q1";
  localStorage.setItem('userData', JSON.stringify(userData));
  //console.log(JSON.stringify(userData));
  $("#q1").hide('blind');
  $("#q2").show('blind');
});

$("#htmlQ").click(function(event){
  $("#q2").hide('blind');
  $("#q2a").show('blind');
});

$("#cssQ").click(function(event){
  $("#q2").hide('blind');
  $("#q2b").show('blind');
});

$("#jsQ").click(function(event){
  $("#q2").hide('blind');
  $("#q2c").show('blind');
});

$(".prevQ2").click(function(event){
  $(this).parent().parent().parent().hide('blind');
  $("#q2").show('blind');
});

$("#q2a input[name='likesHTML']").click(function(event){
			if (this.checked) {
        userData.position[0] = true;
        //console.log($("input[name='likesHTML']").index(this));
        userData.html.likes.push($("input[name='likesHTML']").index(this));
				userData.currentQuestion = "q2a";
        localStorage.setItem('userData', JSON.stringify(userData));
				console.log(JSON.stringify(userData));
			}
      if (this.checked == false) {
        for(var i=0; i<userData.html.likes.length; i++){
          if($("input[name='likesHTML']").index(this) == userData.html.likes[i]);
            userData.html.likes.pop[i];
        }
      }
});

$("#q2a input[name='dlikesHTML']").click(function(event){
			if (this.checked) {
        userData.position[0] = true;
        //console.log($("input[name='dlikesHTML']").index(this));
        userData.html.dislikes.push($("input[name='dlikesHTML']").index(this));
				userData.currentQuestion = "q2a";
        localStorage.setItem('userData', JSON.stringify(userData));
				console.log(JSON.stringify(userData));
			}
});

$("#htmlnxt").click(function(event){
		if (userData.position[0] == true && userData.position[1] == true && userData.position[2] == true)
		{
			$("#q2").hide('blind');
			$("#q2a").hide('blind');
			$("#q3").show('blind');
		}
    else{
      $("#q2a").hide('blind');
  		$("#q2").show('blind');
      //$("#htmlQ").prop("disabled", true);
    }
});

$("#q2b input[name='likesCSS']").click(function(event){
			if (this.checked) {
        userData.position[1] = true;
        //console.log($("input[name='likesHTML']").index(this));
        userData.css.likes.push($("input[name='likesCSS']").index(this));
				userData.currentQuestion = "q2b";
        localStorage.setItem('userData', JSON.stringify(userData));
				//console.log(JSON.stringify(userData));
			}
});

$("#q2b input[name='dlikesCSS']").click(function(event){
			if (this.checked) {
        userData.position[1] = true;
        //console.log($("input[name='dlikesHTML']").index(this));
        userData.css.dislikes.push($("input[name='dlikesCSS']").index(this));
				userData.currentQuestion = "q2b";
        localStorage.setItem('userData', JSON.stringify(userData));
				//console.log(JSON.stringify(userData));
			}
});

$("#cssnxt").click(function(event){
		if (userData.position[0] == true && userData.position[1] == true && userData.position[2] == true)
		{
			$("#q2").hide('blind');
			$("#q2b").hide('blind');
			$("#q3").show('blind');
		}
    else{
      $("#q2b").hide('blind');
  		$("#q2").show('blind');
      //$("#cssQ").prop("disabled", true);
    }
});

$("#q2c input[name='likesJS']").click(function(event){
			if (this.checked) {
        userData.position[2] = true;
        //console.log($("input[name='likesHTML']").index(this));
        userData.js.likes.push($("input[name='likesJS']").index(this));
				userData.currentQuestion = "q2c";
        localStorage.setItem('userData', JSON.stringify(userData));
				//console.log(JSON.stringify(userData));
			}
});

$("#q2c input[name='dlikesJS']").click(function(event){
			if (this.checked) {
        userData.position[2] = true;
        //console.log($("input[name='dlikesHTML']").index(this));
        userData.js.dislikes.push($("input[name='dlikesJS']").index(this));
				userData.currentQuestion = "q2c";
        localStorage.setItem('userData', JSON.stringify(userData));
				//console.log(JSON.stringify(userData));
			}
});

$("#jsnxt").click(function(event){
		if (userData.position[0] == true && userData.position[1] == true && userData.position[2] == true)
		{
			$("#q2").hide('blind');
			$("#q2c").hide('blind');
			$("#q3").show('blind');
		}
    else{
      $("#q2c").hide('blind');
  		$("#q2").show('blind');
      //$("#jsQ").prop("disabled", true);
    }
});

var i;

$("#q3 input[name='rHTML']").click(function(event){
			if (this.checked) {
        i = $("input[name='rHTML']").index(this);
        console.log(i);
        userData.strengths.html=i;
				userData.currentQuestion = "q3";
        localStorage.setItem('userData', JSON.stringify(userData));
				console.log(JSON.stringify(userData));
			}
});

$("#q3 input[name='rCSS']").click(function(event){
			if (this.checked) {
        i = $("input[name='rCSS']").index(this);
        console.log(i);
        userData.strengths.css=i;
				userData.currentQuestion = "q3";
        localStorage.setItem('userData', JSON.stringify(userData));
				console.log(JSON.stringify(userData));
			}
});

$("#q3 input[name='rJS']").click(function(event){
			if (this.checked) {
        i = $("input[name='rJS']").index(this);
        console.log(i);
        userData.strengths.js=i;
				userData.currentQuestion = "q3";
        localStorage.setItem('userData', JSON.stringify(userData));
				console.log(JSON.stringify(userData));
			}
});


$("#q3nxt").click(function(event){
  if(userData.strengths.html!="" && userData.strengths.css!="" && userData.strengths.js!=""){
    $("#q3").hide('blind');
    $("#thanks").show('blind');
    userData.currentQuestion = "thanks";
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  else{
    alert("Please select an answer for each");
  }
});

$("#q3prev").click(function(event){
  $("#q3").hide('blind');
  $("#q2").show('blind');
  userData.currentQuestion = "q2";
  localStorage.setItem('userData', JSON.stringify(userData));
});

$("#thanksnxt").click(function(event){
  $("#thanks").hide('blind');
  $("#answers").show('blind');
  userData.currentQuestion = "answers";
  localStorage.setItem('userData', JSON.stringify(userData));

  $("#ansname").append(userData.name);
  $("#ansemail").append(userData.email);

  var str;
  $("#q2a input[name='likesHTML']").each(function() {
    if(this.checked){
     str = this.value;
     $("#anshtmllikes").append(" | "+str+" | ");
   }
  });

  $("#q2a input[name='dlikesHTML']").each(function() {
    if(this.checked){
     str = this.value;
     $("#anshtmldlikes").append(" | "+str+" | ");
   }
  });

  $("#q2b input[name='likesCSS']").each(function() {
    if(this.checked){
     str = this.value;
     $("#anscsslikes").append(" | "+str+" | ");
   }
  });

  $("#q2b input[name='dlikesCSS']").each(function() {
    if(this.checked){
     str = this.value;
     $("#anscssdlikes").append(" | "+str+" | ");
   }
  });

  $("#q2c input[name='likesJS']").each(function() {
    if(this.checked){
     str = this.value;
     $("#ansjslikes").append(" | "+str+" | ");
   }
  });

  $("#q2c input[name='dlikesJS']").each(function() {
    if(this.checked){
     str = this.value;
     $("#ansjsdlikes").append(" | "+str+" | ");
   }
  });

  $("#q3 input[name='rHTML']").each(function() {
    if(this.checked){
     str = this.value;
     $("#anshtmlstr").append(str);
   }
  });

  $("#q3 input[name='rCSS']").each(function() {
    if(this.checked){
     str = this.value;
     $("#anscssstr").append(str);
   }
  });

  $("#q3 input[name='rJS']").each(function() {
    if(this.checked){
     str = this.value;
     $("#ansjsstr").append(str);
   }
  });
});


$("#delanswers").click(function(event){
  $("#answers").hide('blind');
  $("#welcome").show('blind');
  delete userData;
  userData = {
    name:"",
    email:"",
    html: {likes: [], dislikes: []},
    css: {likes: [], dislikes: []},
    js: {likes: [], dislikes: []},
    position: [false, false, false],
    strengths: {html:"", css:"", js:""},
    currentQuestion: "welcome"
  };
  localStorage.setItem('userData', JSON.stringify(userData));
  location.reload();

});
