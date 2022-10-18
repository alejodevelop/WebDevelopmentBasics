/*$("h1").css("color" , "green");*/
//manipulating styles
$("h1").addClass("big-title margin-50");
//manipulating text and content
$("h1").text("bye");
// $("button").text("Don't Click Me");
$("button").html("<em>hey<em>");
//manipulating atributes
$("a").attr("href", "C:\\Users\\jhoci\\Desktop\\Programacion\\DesarrolloWeb\\Web Development\\Drum Kit Starting Files\\index.html");
$("a").attr("target", "_blank");
//adding events
$("button").click(function() {
  $("h1").css("color", "purple");
});
$("input").keydown(function(event) {
  console.log(event.key);
  $("h1").html(event.key);
});
// $("h1").on("mouseover", function(){
//   $("h1").css("color", "purple");
// });
//creating and deleting elements
$("h1").before("<button>jeje</button>");
$("h1").after("<button>wow</button>");
//will add in the beginind and in the end into the element selected
$("h1").prepend("<button>sikas</button>");
$("h1").append("<button>nope</button>");
//remove the element specificed
// $("h1").remove();
//adding animations
$("button").click(function() {
  $("h1").slideUp().slideDown().animate({
    opacity: 0.5
  });
});
