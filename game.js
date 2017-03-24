function getRandNum(min, max){
   return Math.floor(Math.random()*max+min);
}
// generate an operator 
function genOperator(){
   var listOp = new Array("+", "-", "/", "*");
   return listOp[getRandNum(0, 4)];
}
function genEq(length, min, max){
   // length is num of digite to be used, min is the smaller number and max the biggest number
   var list = "", result = "";
   for(var i = 0; i < length; i++){
      // Attention: first number should not have a sign like / and *
      var randOp = genOperator();
      list += randOp+getRandNum(min, max);
   }
   // remove the first charcter if it's "*", "+", "/"
   for(var j = 0; j < list.length; j++){
       if(j == 0){
          if(list[j] == "+" || list[j] == "/" || list[j] == "*");
          else  result += list[j];
       }else result += list[j];
   }
   return result;
}
function getNumOfEq(eq){
    var result = new Array();
    var rep = eq.replace(/\+/gi, ",+").replace(/\-/gi, ",-").replace(/\*/gi, ",*").replace(/\//g, ",/");
	var sp = rep.split(",");
	for(var i = 0; i < sp.length; i++){
	    result.push(sp[i].replace(/\+/gi, "").replace(/\-/gi, "").replace(/\*/gi, "").replace(/\//g, ""));
	}
	return result;
}
function print(txt){
	$("#area").html($("#area").html()+txt+"<br>");
}
Array.prototype.remove = function(elem){
	// will remove the first value found
	var arr = new Array();
	var find = false;
	for(var i = 0; i < this.length; i++){
		if(find == true){
			arr.push(this[i]);
		}
		else if(this[i] == elem){
			// here just skip this element , and set find to true
			find = true;
		}else{
			arr.push(this[i]);
		}
	}
	return arr;
}
Array.prototype.random = function(){
   var arr = new Array();
   var repThis = this;
   for(;;){
	   var rand = getRandNum(0, repThis.length);
	   var gen = repThis[rand];
	   repThis = repThis.remove(gen);
	   arr.push(gen);
	   if(arr.length == this.length)break;
   }
   return arr;
  /* print("STR : "+arr);
   print("lengh : "+arr.length);
   print("ARR : "+this); */
}
function calculateEq(eq, interger){
	try{
		var f = parseFloat(eval(eq)).toFixed(1);
		if(f.split(".")[1] == 0) return eval(eq);
		else return f;
	}catch(e){
		//console.log("Calculator error : "+e);
	}
}
function getNbrNumber(level){
	// change to better code later
	var m = 2;
	if(level.length == 1)num = 2;
	else{
		// level 2 number or plus 
		m = level[0]*2/2+2;
	}
	console.log("M : "+m);
	return m;
}
getNbrNumber("10");
var Thread = function(running, onStop, delay, stopAt){
	var ctx = this;
	this.counter = 0;
	this.stopAt = 0;
	this.delay = 1500;
	this.onRunning = "";
	this.t = "";
	this.run = function(){
		if(ctx.stopAt == ctx.counter){
			// stop the thread
			ctx.t = clearTimeout(ctx.run);
			try{
				ctx.onEnd();
			}catch(e){}
		}else{
			try{
			    ctx.onRunning();
		    }catch(e){}
		    ctx.counter++;
			ctx.t = setTimeout(ctx.run, ctx.delay);
		}
	}
}
/*
                           UI Script
        
*/
function createElem(tags, parentID, id, clas){
   var dom = document.createElement(tags);
       dom.setAttribute("id", id);
       // create a onlick attribute only if it is a button
       var attr = document.createAttribute("onclick");
           attr.value = "ClickEvent($('#'+id))";
           // add onclick attribute only if it's a button
           if(dom instanceof HTMLButtonElement)dom.setAttributeNode(attr);
	   document.getElementById(parentID).appendChild(dom);
}
function removeElem(parent, child){
     var parents = document.getElementById(parent);
     var childs = document.getElementById(child);
     try{
		 parents.removeChild(childs);
	 }catch(e){
		 //console.log("Error : "+e);
	 }
}
var UI = function(){
    this.defaults = function(){
         // home activity
         createElem("div", "area", "defaults_activity");
         createElem("input", "defaults_activity", "inputPlayerName"); 
         createElem("button", "defaults_activity", "btnStart");
         createElem("button", "defaults_activity", "btnHelp");
         $("#btnStart").html("Start");
         $("#btnHelp").html("Precious");
		 $("#btnHelp").hide();
		 $("#inputPlayerName").attr("placeholder", "Type your name");
    }
    this.removeDefaults = function(){
         removeElem("area", "defaults_activity");
    }
    this.showOperator = function(){
       createElem("div", "area", "operator_place");
       var op = new Array("+", "-", "/", "*");
       for(var i = 0; i < op.length; i++){
          createElem("button", "operator_place", "op"+i);
          $("#op"+i).html(op[i]);
       }
    }
    this.removeOperator = function(){
        removeElem("area", "operator_place");
    }
    this.showScreen = function(targetNum){
       createElem("div", "area", "screen_place");
       createElem("button", "screen_place", "target_num");
	   createElem("button", "screen_place", "gues_num");
       createElem("button", "screen_place", "Skip");
       createElem("div", "screen_place", "inputScreen");
       $("#target_num").html(targetNum);
       $("#inputScreen").attr("disabled", "");
	   $("#gues_num").html("0");
	   $("#Skip").html("Skip it");
	   $("#Skip").attr("class", "btn1");
	   $("#target_num").attr("disabled", "");
	   $("#gues_num").attr("disabled", "");
	   $("#target_num").css("opacity", 1);
	   $("#gues_num").css("opacity", 1);
    }
    this.removeScreen = function(){
        removeElem("area", "screen_place");
    }
    this.showAssertion = function(Nums){
       createElem("div", "area", "assertion_place");
	   var Num = Nums.split(",");
	   var randArr = Num.random();
	   for(var i = 0; i < randArr.length; i++){
		    if(randArr[i] == "" || randArr[i] == undefined){
				
			}else{
				var rand_prefix_id =  getRandNum(50, 999);
			    createElem("button", "assertion_place", "d"+randArr[i]+rand_prefix_id);
                $("#d"+randArr[i]+rand_prefix_id).html(randArr[i]);	
			}	
       }
    }
    this.removeAssertion = function(){
         removeElem("area", "assertion_place");
    }
    this.showTopControls = function(){
        createElem("div", "area", "top_controls");
        // add menu button
        createElem("button", "top_controls", "menu_btn");
        // player name
        createElem("span", "top_controls", "player_name");
		// level
		createElem("span", "top_controls", "levels");
        // coins
        createElem("span", "top_controls", "coins");
        // score
        createElem("span", "top_controls", "scores");
        $("#menu_btn").html("Menu");
        $("#player_name").html(localStorage.playerName);
        $("#coins").html("Coins : "+localStorage.coins); 
        $("#scores").html("Score : "+localStorage.score); 
		var LEVEL =  localStorage.level*2/2;
		$("#levels").html("Levels : "+LEVEL);
    }
    this.removeTopControls = function(){
         removeElem("area", "top_controls");
    }
    this.updateScoreAndCoins = function(){
        $("#coins").html("Coins : "+localStorage.coins);  
        $("#scores").html("Score : "+localStorage.score); 
    }
    this.showStepArchied = function(){
		// hide other component
		cleanGame();
		createElem("div", "area", "step_archied");
		$("#step_archied").html("<div class='content'><div class='title'>Congratulation!</div><br><span class='score'>Score : "+localStorage.score+"</span><br><span class='coins'>Coins : "+localStorage.coins+"</span></div><div class='footer'>by MBUMBA &copy;<button onclick='startGame(); new UI().removeStepArchied()' class='btn1'>Next</button></div>");
	}
	this.removeStepArchied = function(){
		removeElem("area", "step_archied");
	}
}
var Menu = function(){
    this.show = function(){
        $("#menu_btn").html("Close");
        createElem("div", "area", "menu");
        $("#menu").html("<ul><a href='#' onclick='MenuEvent(0)'><li>New</li></a><a href='#' onclick='MenuEvent(1)'><li>Edit</li></a><a href='#' onclick=''><li>Other games</li></a><a href='#' onclick=''><li>About</li></a></ul>");
    }
    this.hide = function(){
        // show the game
		$("#menu_btn").html("Menu");
		removeElem("area", "menu");
    }
}
function readInputScreen(){
    var input = $("#inputScreen").html();
    var sp = input.split("</button>");
    var content = "";
    for(var i = 0; i < sp.length; i++){
         content += sp[i].split(">")[1];
    }
    return content.replace(/undefined/gi, "");
}
// PUBLIC VARIABLES
var EQ;
var TARGETNUM;
var NUMOFEQ;
function cleanGame(){
    new UI().removeScreen();
    new UI().removeAssertion();
    new UI().removeOperator();
    new UI().removeTopControls();
    //alert("clean game");
}

function startGame(){
    try{
       cleanGame();
	  // console.log("GAME cleaned!!!");
    }catch(e){}
	// save data , and check for it
	if(localStorage.eq == undefined || localStorage.targetNum == undefined || localStorage.NumOfEq == undefined || localStorage.eq == "" || localStorage.targetNum == "" || localStorage.NumOfEq == ""){
		// I'm tired code this code 2morrow localStorage.level
		EQ = genEq(getNbrNumber(localStorage.level.toString()), 1, 3*localStorage.level);
        TARGETNUM = calculateEq(EQ);
        NUMOFEQ  = getNumOfEq(EQ);
	    localStorage.eq = EQ;
	    localStorage.targetNum = TARGETNUM;
	    localStorage.NumOfEq = NUMOFEQ;
		//console.log("Generate new eq !");
	}else{
		TARGETNUM = localStorage.targetNum;
		NUMOFEQ = localStorage.NumOfEq;
	}  
    new UI().showTopControls();
    new UI().showOperator();   
    new UI().showScreen(TARGETNUM);
    new UI().showAssertion(localStorage.NumOfEq.toString());
	
    //alert(eq);
}
function cleanEqData(){
	// clean all data about an equation 
	localStorage.eq = "";
	localStorage.targetNum = "";
	localStorage.NumOfEq = "";
}
function hideGame(){
	$("#operator_place").hide(50);
	$("#screen_place").hide(50);
	$("#assertion_place").hide(50);
}
function showGame(){
	$("#operator_place").slideDown(200);
	$("#screen_place").slideDown(200);
	$("#assertion_place").slideDown(200);
}
function changeIntoHTMLtag(parent, content, tag, disabled){
	var rep = content.replace(/\+/gi, ",+,").replace(/\-/gi, ",-,").replace(/\//gi, ",/,").replace(/\*/gi, ",*,");
	var sp = rep.split(",");
	for(var i = 0; i < sp.length; i++){
		if(sp[i] != ""){
			var randID = getRandNum(100, 900);
		    createElem(tag, parent, "obj"+randID);
		    $("#obj"+randID).html(sp[i]);
		    if(disabled == true)$("#obj"+randID).attr("disabled", "");
		}
	}
}
function Validate(obj){
	var txt = $(obj).html();
	// desable the button clicked except the sign button
            if(txt == "-" || txt == "+" || txt == "/" || txt == "*"){
                $("#inputScreen").html($("#inputScreen").html()+"<button class='cbtn' id='"+$(obj).attr('id')+getRandNum(15, 5000)+"' onclick='cbtn_clicked($(this))'>"+txt+"</button>");
            }
            else {
                $("#inputScreen").html($("#inputScreen").html()+"<button class='cbtn' id='"+$(obj).attr('id')+"' onclick='cbtn_clicked($(this))'>"+txt+"</button>");
                $(obj).attr("disabled", "");
            }
			/*
			*         Check automatically when the user click a button under assertion div
			*/
			if(calculateEq(readInputScreen()) == TARGETNUM){
               // increase score +10
               localStorage.score = localStorage.score*2/2+50;
               localStorage.coins = localStorage.coins*2/2+10;
			   localStorage.level = localStorage.level*2/2+1;
               new UI().updateScoreAndCoins();
               cleanEqData();   // clean data of the current eq that was stored.
			   $("#check_btn").show();
			   new UI().showStepArchied();
            }else{
               //startGame();
               //alert("You failed!");
			   $("#gues_num").html(calculateEq(readInputScreen()));
            }
}
/*
         EVENT BUTTONS
*/
function ClickEvent(obj){
   var txt = $(obj).html();
   switch(txt){
      case "Start":
           // animate and change Start to next and help to precious
           $("#defaults_activity").find("button").animate({
              width:"20%"
           }, "fast");
           $("#defaults_activity").animate({
              left:"100px",
              marginTop:"+=200px",
              width:"100%",
			  position:"absolute",
           }, "slow");
		   $("#area").animate({
			   boxShadow:"0px 0px 25px red",
			   marginTop:"1em",
		   }, "slow");
           $("#inputPlayerName").fadeIn(1000);
           $("#btnStart").css("float", "right");
           $("#btnHelp").css("float", "left");
           $("#btnStart").html("Next");
           $("#btnHelp").show();
           
      break;
      case "Help":
      
      break;
      case "Next":
           if($("#inputPlayerName").val() == ""){
              $("#inputPlayerName").css("box-shadow", "0px 0px 20px red");
              $("#inputPlayerName").css("border", "none");
           }else{
              // register the player num
              localStorage.playerName = $("#inputPlayerName").val();
              localStorage.score = 0;
              localStorage.coins = 0;
			  localStorage.stepLevel = 0;
			  localStorage.level = 1;
              // show the game now
             new UI().removeDefaults();
             startGame();
           }
      break;
      case "Precious":
           $("#defaults_activity").find("button").animate({
              width:"65%"
           }, "fast");
           $("#defaults_activity").animate({
              left:"100px",
              opacity:"1",
              marginTop:"-=200px",
              width:"30%"
           }, "slow");
           $("#btnStart").html("Start");
           $("#btnStart").css("float", "");
           $("#btnHelp").css("float", "");
		   $("#btnHelp").slideUp(600);
		   
      break;
      case "Menu":
            hideGame();
			new Menu().show();
      break;
      case "Close":
           new Menu().hide();
		   showGame();
      break;
	  case "Skip it":
	      // show the answer, take away 80 coins
		  if(localStorage.coins < 30){
			  alert("You don't have enough coins");
		  }else{
			  // first clean the inputScreen before puting the right answer
			  $("#inputScreen").html("");
			  changeIntoHTMLtag("inputScreen", localStorage.eq, "button", true);
			  $("#gues_num").html(localStorage.targetNum);
			  cleanEqData(); 
			  $("#Skip").attr("onclick", "window.location.href=''");
			  $("#Skip").html("==>");
		      // hide assertion
			  localStorage.level = localStorage.level*2/2+1; // icrease 1 to the level
			  new UI().removeAssertion();
			  localStorage.coins = localStorage.coins-30;
			  // update the change
			  new UI().updateScoreAndCoins();
		  }
	  break;
      default:
            Validate(obj);
			//console.log($(obj).attr("id"));
      break;
   }
}
function MenuEvent(evt){
	switch(evt){
		case 0:
		   // new
		    localStorage.playerName = "";
			localStorage.level = 1;
			localStorage.stepLevel = 0;
            cleanEqData();
            cleanGame();
			new Menu().hide();
            new UI().defaults();			
		break;
		case 1:
		   // edit
		break;
	}
}
function cbtn_clicked(obj){
    // remove the this button
	//console.log("ID : "+$(obj).attr("id"));
    removeElem("inputScreen", $(obj).attr("id"));
    $("#assertion_place").find("#"+$(obj).attr("id")).removeAttr("disabled");  
	// update also the guest button
	$("#gues_num").html(calculateEq(readInputScreen()));
	
}
//startGame();
/*
*     DO IT LATER, DESIGN EVEN THEMES THAT WILL BE STORE IN LOCALSTORAGE
*/
// MAIN FUNCTION, WHERE OUR GAME START 
function init(){
   if(localStorage.playerName == "" || localStorage.playerName == undefined){
      // No player found!, and delete all other informations if exist
      new UI().defaults();
      localStorage.removeItem("coins");
      localStorage.removeItem("score");
	  cleanEqData();
   }else{
      // a player found
      startGame();
   } 
}
init();
