var bubleMotion=setInterval("move_bubble()",100);
var bublexdirection=[];
var bubleydirection=[];
var bublexspeed=[];
var bubleyspeed=[];
var speedFactor=15;
var maxRatio=400;
if ($(window).height()>$(window).width()) maxRatio=150;
$(document).ready(function(e) {
	var lightCounter=10;
	if(deviceType>0) lightCounter=5;
	var motoHtml="";
	for(i=0;i<lightCounter;i++){
			//var imgUrl="url(assets/images/light0.png)";
			 var imgUrl="url(assets/images/light"+parseInt(3%(3*Math.random()))+".png)";
			var lightRatio=Math.random()*maxRatio;
			if (lightRatio<maxRatio/3) lightRatio=maxRatio/3;
			var lightOpacity=Math.random()/5;
			var lightRight=Math.random()*100;
			var lightTop=Math.random()*100;
			bublexdirection[i]=Math.pow(-1,parseInt(2*Math.random())%2);
			bubleydirection[i]=Math.pow(-1,parseInt(2*Math.random())%2);
			bublexspeed[i]=Math.random()*speedFactor;
			bubleyspeed[i]=Math.random()*speedFactor;
			motoHtml+='<div class="light-bulb" style="background-image:'+imgUrl+';top:'+lightTop+'%;right:'+lightRight+'%;opacity:'+lightOpacity+';height:'+lightRatio+'px;width:'+lightRatio+'px;"></div>'
		
		}
	
    $("div#page-moto").html(motoHtml);
    return;
});
function move_bubble() {
	var motoHeight=$(window).height()/3*2;
	if ($(window).scrollTop()>motoHeight)return;
	var windowW=$(window).width();
	$("div.light-bulb").each(function(index,value){
		lightRight=parseInt($(this).css("right"));
		lightTop=parseInt($(this).css("top"));
		lightRatio=parseInt($(this).css("width"));
		lightbottom=motoHeight-lightTop-lightRatio;
		lightLeft=windowW-lightRight-lightRatio;
		if(bublexdirection[index]>0 && lightRight<0) bublexdirection[index]*=-1;
		if(bublexdirection[index]<0 && lightLeft<0) bublexdirection[index]*=-1;
		if(bubleydirection[index]>0 && lightTop<0) bubleydirection[index]*=-1;
		if(bubleydirection[index]<0 && lightbottom<0) bubleydirection[index]*=-1;	
		//alert(lightTop+" "+lightRight+" "+lightbottom+" "+lightLeft+" "+bublexdirection[index]+" "+bubleydirection[index]);
		var lightRightNew=lightRight+(bublexspeed[index]*bublexdirection[index]*-1);
		var lightTopNew=lightTop+(bubleyspeed[index]*bubleydirection[index]*-1);
		//bublexspeed[index]=bublexspeed[index]+bublexdirection[index];
		//bubleyspeed[index]=bubleyspeed[index]+bubleydirection[index];
		// if(bublexspeed[index]<1)bublexspeed[index]=1;
		// if(bubleyspeed[index]<1)bubleyspeed[index]=1;
		// if(bubleyspeed[index]>speedFactor)bubleyspeed[index]=speedFactor;
		// if(bublexspeed[index]>speedFactor)bublexspeed[index]=speedFactor;
		$(this).css("top",lightTopNew+"px");
		$(this).css("right",lightRightNew+"px")
		return;
	});
}