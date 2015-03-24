var randomImageList=[];
var scrollTopFirstTop=[];
var deviceType=0;
$(document).ready(function(e) {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        deviceType=1;
    }
    heightGenerator();
    $(".resist-to-scroll").each(function(index, val) {
            scrollTopFirstTop[$(this).attr("id")]=$(this).offset().top;
     });
    $("div#random-backgound-list").fadeOut(0);
    $("div#random-backgound-list img").each(function(index, element) {
                randomImageList[index]=$(this).attr("src");
                return;
    });
    set_random_bg();
    $(window).on("resize",window,function(){
		heightGenerator();
    });
    $(window).on("scroll",function(){
        if (deviceType==1) return;
        $(".resist-to-scroll").each(function(index, val) {
            var scrollTop=$(window).scrollTop();
            var exTop=scrollTopFirstTop[$(this).attr("id")];
            // alert(index+"    "+exTop+"     ");
            var devFactor=$(this).attr("class").indexOf("div-");
            devFactor=$(this).attr("class").substr(devFactor+4,4);
            var leftPos=$(this).offset.left;
            var elementHeight=$(this).height();
            if (scrollTop>exTop-$(window).height() && scrollTop<exTop+elementHeight) {
                var nextScroll=exTop+elementHeight;
                var prevScroll=exTop-$(window).height();
                if (prevScroll>0)
                    var topPos=exTop-((scrollTop-prevScroll)/parseFloat(devFactor/10));
                else 
                    var topPos=exTop-((scrollTop)/parseFloat(devFactor/10));
                if($(this).css("position")=="fixed") $(this).css("top",topPos);
                else $(this).offset({top: topPos , left: leftPos });
            }
            else {
                var topPos=exTop;
                 if($(this).css("position")=="fixed") $(this).css("top",topPos);
                else $(this).offset({top: topPos, left: leftPos });
            }
            
        });
    });
    
});
function heightGenerator(){
	windowHeight=$(window).height();
	$(".WH-full").each(function(index, element) {
                $(this).css("height",windowHeight+"px");
            });
	$(".WH-half").each(function(index, element) {
                $(this).css("height",windowHeight/2+"px");
            });
	$(".WH-3Q").each(function(index, element) {
                $(this).css("height",windowHeight*3/4+"px");
            });
	$(".WH-2T").each(function(index, element) {
                $(this).css("height",windowHeight*2/3+"px");
            });
            $(".WH-2T-min").each(function(index, element) {
                $(this).css("min-height",windowHeight*2/3+"px");
            });
	$(".WH-1Q").each(function(index, element) {
                $(this).css("height",windowHeight/4+"px");
            });
	$(".WH-1T").each(function(index, element) {
                $(this).css("height",windowHeight/3+"px");
            });
            $(".WH-1T-Min").each(function(index, element) {
                $(this).css("min-height",windowHeight/3+"px");
            });
	$(".heigt-from-sibiling").each(function(index, element) {
                $(this).css("height",$(this).siblings(this).css("height"));
            });
            return;
	}
function set_random_bg() {
    $(".random-background").each(function(index, element) {
        randomNo=parseInt(Math.random()*randomImageList.length);
        $(this).css("background-image","url("+randomImageList[randomNo]+")");
    });
    return;
}