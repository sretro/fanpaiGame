
var level = 6;
var lieshu = 6;

function levelUp(){
		
		if(level <=9) {
				level = level + 1;
				$("#levelText").html(level);
				if(level >= 7){
						lieshu = 7;
				}else {
						lieshu =level;
				}
		}else {
				level = level;
				$("#levelInfo").html("已经最难了，差不多的了！！");
		}
		return level;
}

function levelDown(){
		
		if(level>3) {
				level = level - 1;
				$("#levelText").html(level);
				if(level >= 7){
						lieshu = 7;
				}else {
						lieshu =level;
				}
		}else {
				level = level;
				$("#levelInfo").html("不能再简单了！！");
		}
		return level;
}



/*fapai*/

var matchingGame = {};



matchingGame.card = [
	'cardGT', 'cardGT',
	'cardBF', 'cardBF',
	'cardVS', 'cardVS',
	'cardCR', 'cardCR',
	'cardXR', 'cardXR',
	'cardFX', 'cardFX',	
	'cardLD', 'cardLD',
	'cardBT', 'cardBT',
	'cardSD', 'cardSD',
	'cardSP', 'cardSP',
	'cardSZ', 'cardSZ',
	'cardGL', 'cardGL',	
	'cardZZ', 'cardZZ',
	'cardXJ', 'cardXJ',
	'cardMD', 'cardMD',
	'cardLJ', 'cardLJ',	
];




function starGame(){
	matchingGame.deck = matchingGame.card.slice(0,level*2);

	matchingGame.deck.sort(shuffle);
	

	for(var i=0;i<level*2-1;i++){
		$(".card:first-child").clone().appendTo("#cards");
	}
	

	$("#cards").children().each(function(index) {		
		
		$(this).css({
			"left" : ($(this).width()  + 10) * (index % lieshu),
			"top"  : ($(this).height() + 10) * Math.floor(index / lieshu)
		});
		

		var pattern = matchingGame.deck.pop();
		
		
		$(this).find(".back").addClass(pattern);
		

		$(this).attr("data-pattern",pattern);
						

		$(this).click(selectCard);				
	});	
	/*beijing*/
	playSound('intro');
	setBackground()
}

function setBackground() {
	var cardsWidth =parseInt($(".card").css("width"))*lieshu + (lieshu-1)*10;
	var backgroundWidth = cardsWidth + 2*30;
	var cardsHeight = parseInt($(".card").css("height"))*Math.ceil($(".card").size() / lieshu);
	var backgroundHeight = cardsHeight + 2*30;
	$("#cards").css("width",cardsWidth).css("height",cardsHeight);
	$(".backpic").css("width",backgroundWidth).css("height",backgroundHeight);
	
}

function selectCard() {
	playSound('select');

	if ($(".card-flipped").size() > 1)
	{
		return;
	}
	
	
	$(this).addClass("card-flipped");
	
	if ($(".card-flipped").size() == 2)
	{
		setTimeout(checkPattern,700);
	}
	
}


function shuffle(){

	return 0.5 - Math.random();
}


function checkPattern(){
	if (isMatchPattern())
	{
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		

		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);

			
	}
	else
	{
		$(".card-flipped").removeClass("card-flipped");
	}
	setTimeout("checkCards()",800);
 	
}


function removeTookCards(){
	playSound('match');
	$(".card-removed").remove();
}


function isMatchPattern(){
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}
function checkCards(){
	
	if($(".card").size() == 0){
		/*gongxihuosheng*/
		$(".menu").css("visibility","visible");
		$("#textConten").html("恭喜过关!!!!");
		playSound('applause');
		clearTimeout(t);
		
	}else{
		return;
	}
	
}
 /*zhuxunhuan*/
function gameloop(){
	$(".card").remove();
	$("<div></div>").attr("class","card").appendTo("#cards");
	$("<div></div>").attr("class","face front").appendTo(".card");
	$("<div></div>").attr("class","face back").appendTo(".card");
	/*time*/
	
	$(".menu").css("visibility","hidden");
	starGame();
	time = 30;
	$("#timeblock").css("width",16);
	timeSet();
}

 /*time*/
function timeSet(){
	var width = parseInt($("#timeblock").css("width"));
	var long = (318 - width)/time;
	if(time>0) {
			$("#timeblock").css("width",width+long);
			time = time - 1;
	}else {
			/*taichujieshu*/
			$(".menu").css("visibility","visible");
			$("#textConten").html("失败了!!!!");
			clearTimeout(t);
			return false;
	}
	t = setTimeout("timeSet()",1000);
}
$(document).ready(function(e) {
	s = setInterval("picroll()",5000)
});
	var lpic =0;
	var rpic =0;
function picroll(){

	if(lpic>2){
		lpic = 0;
	}else{
		lpic =lpic+1;
	}
	if(rpic>1){
		rpic = 0;
	}else{
		rpic = rpic+1;
	}
	$(".leftContain").children().eq(lpic).addClass("on").siblings().removeClass("on");
	$(".rightContain").children().eq(rpic).addClass("on").siblings().removeClass("on");	
}
function playSound(filename) {
	try {
		var index = ['intro','select','match','applause'].indexOf(filename);
		var sound = document.querySelectorAll('audio.sound')[index];
		sound.play();
	} catch (err) {
	}
}