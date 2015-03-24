var MHFonColapse=0;
var MHFonScroll=0;
var popUpst=0;
var workGlobalVar;
$(document).ready(function(){
  ($.ajax({
      url: 'portfolio.Json',
      success: function (data) {
      workGlobalVar=data.works;
      fillWork();
      }
  }));
    $("nav ul li a[href^='#']").on('click', function(e) {
   e.preventDefault();
   var hash = this.hash;
   popUpst=1;
   var destScroll=$(hash).offset().top-90;
   var scrolleffect;
   if (destScroll<0 || destScroll+$(window).height()> $(document).height()-100 )
        scrolleffect="easeOutCirc";
    else 
        scrolleffect="easeOutElastic";
   $('html, body').animate({
       scrollTop: destScroll  }, 1100, scrolleffect , function(){
         popUpst=0;
         workfolwer($(window).scrollTop());
         return ;
     });  
return true;
});
    $("button[data-target='#menuList']").bind('click change',function(){
        if($(this).hasClass('collapsed')){
            MHFonColapse=1;
            $("div#moto-holder").fadeOut(200);  
        }
        else {
            MHFonColapse=0;
            if(MHFonColapse+MHFonScroll==0)
            $("div#moto-holder").fadeIn(200);   
        }
    });
    $(window).resize(function() {
        if($("button#colapseMenuBut").css("display")=="none"){
            MHFonColapse=0;
            if(MHFonColapse+MHFonScroll==0){
                if(MHFonColapse+MHFonScroll==0)
                $("div#moto-holder").fadeIn(200);   
            }
         }
        else if ($("div#menuList").hasClass('in')){
            MHFonColapse=1;
            $("div#moto-holder").fadeOut(0);  
        }
    });
    $(window).on("scroll",function (){
        var Navbar=$("nav");
        var windowTop=$(window).scrollTop();
        if (windowTop>80) {
            MHFonScroll=1;
            $("div#moto-holder").fadeOut(200);
            Navbar.css("background-color","rgba(40,40,40,1)");
            // $("nav").removeClass('resist-to-scroll');
            Navbar.css("top","0px");
            Navbar.css("border-top","solid 8px rgba(200,200,200,0.3)"); 
            $("div#menuList").addClass("navChangeColor");
        }
        else {
            var navOpacity=windowTop/80;
            Navbar.css("background-color","rgba(40,40,40,"+navOpacity+")");
            Navbar.css("top",windowTop/10+"px");
            MHFonScroll=0;
            if(MHFonColapse+MHFonScroll==0)
            $("div#moto-holder").fadeIn(200);
            // $("nav").css("top","10px");
           // $("nav").addClass('resist-to-scroll');
            Navbar.css("border-top","none");
            $("div#menuList").removeClass("navChangeColor");
        } 
      workfolwer(windowTop) ;
    });
});
function workfolwer(windowTop) {
        var aStep0=$("div.aStep:eq(0)");
        var aStep1=$("div.aStep:eq(1)");
        var aStep2=$("div.aStep:eq(2)");
        var aStep3=$("div.aStep:eq(3)");
        var WHHalf=$(window).height()/2;
        var scrollStep=WHHalf;
        var scrollstate=-1;
        if (windowTop<WHHalf && scrollstate!=0) {
             $("div.aStep").removeClass("activeStep");
             PopOut("inception-div");
             scrollstate=0;
        }
        if (windowTop>WHHalf && windowTop<WHHalf+scrollStep && scrollstate!=1 && popUpst==0 ) {
            PopUp("inception-div");
            PopOut("elaboration-div");
            aStep0.removeClass("passStep").addClass("activeStep");
             aStep1.removeClass("activeStep");
             aStep2.removeClass("activeStep");
             aStep3.removeClass("activeStep");
             scrollstate=1;
        }
         if (windowTop>WHHalf+scrollStep && windowTop<WHHalf+2*scrollStep && scrollstate!=2 && popUpst==0) {
            PopOut("inception-div");
            PopUp("elaboration-div");
            PopOut("milestone-div");
             aStep1.removeClass("passStep").addClass("activeStep");
             aStep0.removeClass("activeStep").addClass("passStep");
             aStep2.removeClass("activeStep");
             aStep3.removeClass("activeStep");
             scrollstate=2;
        }
        if (windowTop>WHHalf+2*scrollStep && windowTop<WHHalf+3*scrollStep && scrollstate!=3 && popUpst==0) {
            PopOut("elaboration-div");
            PopUp("milestone-div");
            PopOut("feedback-div");
             aStep2.removeClass("passStep").addClass("activeStep");
             aStep0.removeClass("activeStep").addClass("passStep");
             aStep1.removeClass("activeStep").addClass("passStep");
             aStep3.removeClass("activeStep");
             scrollstate=3;
        }
        if (windowTop>WHHalf+3*scrollStep && windowTop<WHHalf+4*scrollStep && scrollstate!=4 && popUpst==0) {
            PopOut("milestone-div");
            PopUp("feedback-div");
             aStep3.removeClass("passStep").addClass("activeStep");
             aStep0.removeClass("activeStep").addClass("passStep");
             aStep1.removeClass("activeStep").addClass("passStep");
             aStep2.removeClass("activeStep").addClass("passStep");
             scrollstate=4;
        }
        if (windowTop>WHHalf+4*scrollStep && scrollstate!=5 && popUpst==0) {
            PopOut("feedback-div");
            aStep3.removeClass("activeStep").addClass("passStep");
             aStep0.removeClass("activeStep").addClass("passStep");
             aStep1.removeClass("activeStep").addClass("passStep");
             aStep2.removeClass("activeStep").addClass("passStep");
             scrollstate=5;
        }
}
function PopUp(tagName) {
                if ($("div.popUp").css("display")=="none") return;
                $('div#'+tagName+' div.firstPop').show({
                  //effect: "scale",
                  duration: 300,
                  easing: 'easeOutElastic', 
                  complete: function(){
                            $('div#'+tagName+' div.secondPop').show({
                            //effect: "scale",
                            duration: 300,
                            easing: 'easeOutElastic', 
                            complete: function(){            
                                $('div#'+tagName+' div.thirdPop').show({
                                //effect: "scale",
                                duration: 300,
                                easing: 'easeOutElastic', 
                                complete: function(){
                                    return;     
                                }
                                });
                           }
                            });
                   }
                    });
}
function PopOut(tagName) {
                if ($("div.popUp").css("display")=="none") return;
                $('div#'+tagName+' div.thirdPop').fadeOut({
                  //effect: "scale",
                  duration: 100,
                  easing: 'easeOutElastic', 
                  complete: function(){
                          $('div#'+tagName+' div.secondPop').fadeOut({
                          //effect: "scale",
                          duration: 100,
                          easing: 'easeOutElastic', 
                          complete: function(){            
                              $('div#'+tagName+' div.firstPop').fadeOut({
                              //effect: "scale",
                              duration: 100,
                              easing: 'easeOutElastic', 
                              complete: function(){  
                                return;   
                              }
                              });
                           }
                           });
                   }
                   });
}
function fillWork() {
  $("div#portfolio div.row").html("");
  $.each(workGlobalVar, function(index, val) {
    k=val;
    var mobile=parseInt(k.mobile);
    if (mobile) mobile='<span>mobile <span class="glyphicon glyphicon-phone"></span></span>';
    else mobile='';
    var software=parseInt(k.software);
    if (software) software='<span>windows software <span class="glyphicon glyphicon-tasks"></span></span>';
    else software='';
    var website=parseInt(k.website);
    if (website) website='<span>website <span class="glyphicon glyphicon-link"></span></span>';
    else website='';
    var newHtml='<a id="'+index+'" target="_blank" href="'+k.Link+'"><div class="col-md-'+k.lenght+' aPiece"><div><div class="pieceImg" style="background-image: url('+k.worklink+'/background-img.jpg);"></div><div class="pieceContent"><h2>'+k.workName+'</h2>'+website+mobile+software+'<h3>'+k.year+'</h3><div class="horDiv"></div></div></div></div></a>';
    $("div#portfolio div.row").append(newHtml);
  });
}