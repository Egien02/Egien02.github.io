function gameset()//游戏设置界面
{
	bglayer.die();
	bglayer.removeAllChild();
	var bitmap = new LBitmap(new LBitmapData(imglist["game"]));
	bglayer.addChild(bitmap);

    //LTextField 类的方法允许您设置、选择并操作在创作过程中或运行时创建的动态或输入文本字段中的文本。
	var back = new LTextField();
	
	back.color = "#000000";
	back.text = "<< 返回界面";
	back.size = 30;
	back.x = 10;
	back.y = 30;
	bglayer.addChild(back);
	var backbutton = new LButton(back,back);
	bglayer.addChild(backbutton);
	backbutton.addEventListener(LMouseEvent.MOUSE_UP,guanqia);
	

    //声音按钮
	var sound = new LBitmap(new LBitmapData(imglist["sound"]));
	var soundButton =new LButton(sound,sound);
	soundButton.y = 100;
	soundButton.x = 50;
	bglayer.addChild(soundButton);

	var soundText = new LTextField();
	soundText.x = 100;
	soundText.y = 120;
	soundText.size = 30;
	soundText.color = "#000000";
	soundText.text = ":   音乐与音效";
	soundText.weight = "bolder"
	bglayer.addChild(soundText);

	var help = new LBitmap(new LBitmapData(imglist["help"]));
	var helpButton = new LButton(help,help);
	helpButton.y = 200;
	helpButton.x = 50;
	bglayer.addChild(helpButton);

	var helpText = new LTextField();
	helpText.x = 100;
	helpText.y = 220;
	helpText.size = 30;
	helpText.color = "#000000";
	helpText.text = ":   操作与玩法";
	helpText.weight = "bolder"
	bglayer.addChild(helpText);
	var helpbutton = new LButton(helpText,helpText);
	bglayer.addChild(helpbutton);

	helpbutton.addEventListener(LMouseEvent.MOUSE_UP,wanfa);

	var tip =new LBitmap(new LBitmapData(imglist["help90"]));
	var tipButton=new LButton(tip,tip);
	tipButton.y=310;
	tipButton.x=40;
	bglayer.addChild(tipButton);

	var tipText = new LTextField();
	tipText.x = 100;
	tipText.y = 325;
	tipText.size = 30;
	tipText.color = "#000000";
	tipText.text = ":   帮助与提示";
	tipText.weight = "bolder"
	bglayer.addChild(tipText);
	var tipsbutton = new LButton(tipText,tipText);
	bglayer.addChild(tipsbutton);

	tipsbutton.addEventListener(LMouseEvent.MOUSE_UP,Tips);
	
	// var bitmap1=new LBitmap(new LBitmapData(imglist["gogame"]));
	// var startbutton=new LButton(bitmap1,bitmap1);
	// startbutton.y=8;
	// startbutton.x=270;
	// bglayer.addChild(startbutton);
	// startbutton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
}

function wanfa(){
	bglayer.die();
	bglayer.removeAllChild();
	var bitmap = new LBitmap(new LBitmapData(imglist["wanfa"]));
	bglayer.addChild(bitmap);

	var bitmap2=new LBitmap(new LBitmapData(imglist["set"]));
	var setbutton=new LButton(bitmap2,bitmap2);
	setbutton.y=10;
	setbutton.x=470;
	bglayer.addChild(setbutton);

	var ky=new LBitmap(new LBitmapData(imglist["mk"]));
	var kybutton=new LButton(ky,ky);
	kybutton.y=40;
	kybutton.x=-100;
	bglayer.addChild(kybutton);

	var wait=new LBitmap(new LBitmapData(imglist["mk1"]));
	var waitbutton=new LButton(wait,wait);
	waitbutton.y=110;
	waitbutton.x=-100;
	bglayer.addChild(waitbutton);

	setbutton.addEventListener(LMouseEvent.MOUSE_UP,gameset);
	kybutton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	waitbutton.addEventListener(LMouseEvent.MOUSE_UP,gameset);
}
function Tips(){
	bglayer.die();
	bglayer.removeAllChild();
	var bitmap = new LBitmap(new LBitmapData(imglist["tips"]));
	bglayer.addChild(bitmap);

	var bitmap2=new LBitmap(new LBitmapData(imglist["set"]));
	var setbutton=new LButton(bitmap2,bitmap2);
	setbutton.y=10;
	setbutton.x=470;
	bglayer.addChild(setbutton);

	setbutton.addEventListener(LMouseEvent.MOUSE_UP,gameset);
}

function guanqia(){
	bglayer.die();
	bglayer.removeAllChild();
	var bitmap = new LBitmap(new LBitmapData(imglist["SelectBg"]));
	bglayer.addChild(bitmap);

	var gq1 = new LBitmap(new LBitmapData(imglist["gq1"]));
	var gq1Button = new LButton(gq1,gq1);
	gq1Button.y = 150;
	gq1Button.x = 85;
	bglayer.addChild(gq1Button);
	gq1Text=new LTextField();
	gq1Text.size = 50;
	gq1Text.color = "green";
	gq1Text.text = "1.";
	gq1Text.x = 155;
	gq1Text.y = 177;
	gq1Text.font = "Georgia";
	bglayer.addChild(gq1Text);

	var gq2 = new LBitmap(new LBitmapData(imglist["gq1"]));
	var gq2Button = new LButton(gq2,gq2);
	gq2Button.y = 290;
	gq2Button.x = 85;
	bglayer.addChild(gq2Button);
	gq2Text=new LTextField();
	gq2Text.size = 50;
	gq2Text.color = "green";
	gq2Text.text = "2.";
	gq2Text.x = 155;
	gq2Text.y = 317;
	gq2Text.font = "Georgia";
	bglayer.addChild(gq2Text);

	var gq3 = new LBitmap(new LBitmapData(imglist["gq1"]));
	var gq3Button = new LButton(gq3,gq3);
	gq3Button.y = 420;
	gq3Button.x = 85;
	bglayer.addChild(gq3Button);
	gq3Text=new LTextField();
	gq3Text.size = 50;
	gq3Text.color = "green";
	gq3Text.text = "3.";
	gq3Text.x = 155;
	gq3Text.y = 442;
	gq3Text.font = "Georgia";
	bglayer.addChild(gq3Text);

	var bitmap2=new LBitmap(new LBitmapData(imglist["set"]));
	var setbutton=new LButton(bitmap2,bitmap2);
	setbutton.y=10;
	setbutton.x=470;
	bglayer.addChild(setbutton);

	gq1Button.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	gq2Button.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	gq3Button.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	setbutton.addEventListener(LMouseEvent.MOUSE_UP,gameset);
}


function gamestart()//画面初始化
{
	health=230;
	// sound.stop();
	// sound1.play();
	foodnumber = 0; //食物数
	floornumber = 0;//楼层数
	bglayer.die();
	bglayer.removeAllChild();
	backg = new Background();
	bglayer.addChild(backg);//运动的背景层是一个新的类型，是背景层之子。
	/*背景层的声明一定要在字层声明之前，否则字会被覆盖掉。*/
	

	

	flootText = new LTextField();//楼层字
	flootText.size = 240;
	flootText.color = "#DEE8ED";
	flootText.text = "0";
	flootText.x = 170;
	flootText.y = 200;
	bglayer.addChild(flootText);

    

	

    // //血条创建
	// lifetiao = new LGraphics();
	// bglayer.addChild(lifetiao);
	// //Graphics类包含一组可用来创建矢量形状的方法,画背景,背景是白色
	// //drawRect ( thickness  color  param  isFill  fillColor ) 
	// lifetiao.drawRect(3,"#000000",[0,20,200,10],true,"#91D94E");//血条层风寒看1

	// LSprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。
	floorlayer = new LSprite(); 
	
	bglayer.addChild(floorlayer);//记录各个地板，地板层是地板数组，也是背景层之子
	
	foodlayer = new LSprite();
	bglayer.addChild(foodlayer);

	BlackHolelayer = new LSprite();
	bglayer.addChild(BlackHolelayer);

	

	

	//人物头像框
	title=new LBitmap(new LBitmapData(imglist["title"]));
	title.y = 36;
	title.x = 25;
	title.scaleX = 0.6;
	title.scaleY = 0.6;
	bglayer.addChild(title);
	

	//血条
	life=new LBitmap(new LBitmapData(imglist["life"]));
	life.y = 65;
	life.x = 137;
	bglayer.addChild(life);
	maskObj = new LSprite();
    maskObj.graphics.drawRect(0, "#ff0000", [137,65,health,36]);
	// bglayer.addChild(maskObj);
    life.mask = maskObj;

	// //血条创建
	// lifetiao = new LGraphics();
	// bglayer.addChild(lifetiao);
	// //Graphics类包含一组可用来创建矢量形状的方法,画背景,背景是白色
	// //drawRect ( thickness  color  param  isFill  fillColor ) 
	// lifetiao.drawRect(0,"#000000",[137,65,230,36],true,"#91D94E");//血条层

	Icon=new LBitmap(new LBitmapData(imglist["icon"]));
	Icon.y = 138;
	Icon.x = 43;
	bglayer.addChild(Icon);

	

	carrotText=new LTextField();
	carrotText.size = 20;
	carrotText.color = "red";
	carrotText.text = ": 0";
	carrotText.x = 62;
	carrotText.y = 140;
	bglayer.addChild(carrotText);//食物数量

	mushroomText=new LTextField();
	mushroomText.size = 20;
	mushroomText.color = "red";
	mushroomText.text = ": 0";
	mushroomText.x = 62;
	mushroomText.y = 162;
	bglayer.addChild(mushroomText);//食物数量

	starText=new LTextField();
	starText.size = 20;
	starText.color = "red";
	starText.text = ": 0";
	starText.x = 62;
	starText.y = 182;
	bglayer.addChild(starText);//食物数量


	

	initrabbit();

	//addEventListener(type,listener)
	// 	type：事件的类型。
	// listener：处理事件的侦听器函数。
	//LEvent.ENTER_FRAME: [播放事件] 播放头进入新帧时调度。如果播放头不移动，或者只有一帧，则会继续以帧速率调度此事件。
	//此事件为广播事件，这意味着具有注册了此事件的侦听器的所有显示对象都会调度此事件。
	bglayer.addEventListener(LEvent.ENTER_FRAME, onframe);//添加循环事件
	if(!LGlobal.canTouch){//当前浏览器是否是移动浏览器
		//非触屏时添加键盘事件
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);//键盘按下执行onkeydown
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);//键盘松开执行onkeyup
	}
}

// //血量控制
// function lifeControl(var1)
// {
//     maskObj.graphics.drawRect(0, "#ff0000", [157,69,health,41]);
// }


function onframe()
{
	if(floornumber%2 == 0)
	{
		stepchange = stepchange+0.005;////可变移动量+0.005游戏中画面的滚动速度
	}
	if(rabbit.hp == rabbit.maxhp)//hp，maxhp初始值为5，
	{
		hpfull = 1;
	}//是否满血
	else{
		hpfull = 0;
	}
	
	if(flooradd-- <= 0)
	{
		flooradd = 5;
		addfloor();
	}
	//添加地板

	if(foodadd-- <= 0)
	{
		foodadd = 20;
		addfood();
	}//添加食物

	if(holeadd-- <= 0)
	{
		holeadd=300;
		addBlack();
	}

	
	
	var i = null;
	for(i in floorlayer.childList)
	{
		var kid = floorlayer.childList[i];
        //因为梯子不停往上飘y值逐渐递减 所以判断是否小于
		if(kid.y <= -1*kid.getHeight())
		{
			floorlayer.removeChild(kid);
			floornumber++;
		}
		kid.run();
		
	}
	var j=null;
	for(j in BlackHolelayer.childList)
	{
		var kid1=BlackHolelayer.childList[j];
		if(kid1.y<=-1*kid1.getHeight())
		{	
			BlackHolelayer.removeChild(kid1);
		}
		kid1.run();
	}

	var k = null;
	for(k in foodlayer.childList)//超过顶层食物消失
	{
		var kid2 = foodlayer.childList[k];
		if(kid2.k <= -1*kid2.getHeight())
		{	
			//console.log("食物跑了");
			foodlayer.removeChild(kid2);
		}
		kid2.run();
	}
	

	rabbit.run();

	//不停更新血量值
	maskObj.graphics.drawRect(0, "#ff0000", [137,65,health,36]);
	life.mask = maskObj;
	
	if(floornumber > 9){
		flootText.x = 130;
	}

	flootText.text = floornumber;

	if(floornumber >= 100){
		win();
	}

	if(!rabbit.hp){
		maskObj.graphics.drawRect(0, "#ff0000", [137,65,0,36]);
		life.mask = maskObj;
		over();
	}
}



function win()
{
	bglayer.die();//背景层die
	winlayer = new LSprite();
	bglayer.addChild(winlayer);

	if(foodnumber==0)
	{
		win=new LBitmap(new LBitmapData(imglist["win1"]));
	}
	else if(foodnumber==1)
	{
		win=new LBitmap(new LBitmapData(imglist["win2"]));
	}
	else if(foodnumber==2)
	{
		win=new LBitmap(new LBitmapData(imglist["win3"]));
	}
	else
	{
		win=new LBitmap(new LBitmapData(imglist["win4"]));
	}

	win.y = 100;
	win.x = 129;
	winlayer.addChild(win);

	next =new LBitmap(new LBitmapData(imglist["nextLevel"]));
	nextButton = new LButton(next, next);
	nextButton.y=425;
	nextButton.x=225;
	winlayer.addChild(nextButton);


	score=new LTextField();
	score.size = 15;
	score.color = "white";
	score.stroke = true;
	score.text = floornumber;
	score.x = 283;
	score.y = 397;
	winlayer.addChild(score);

	//nextButton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
}

function over()//游戏结束界面
{
	
	first = true;
	bglayer.die();//背景层die
	overlayer = new LSprite();
	bglayer.addChild(overlayer);

	// sound1.close();
	
	if(foodnumber==0)
	{
		fail=new LBitmap(new LBitmapData(imglist["fail1"]));
	}
	else if(foodnumber==1)
	{
		fail=new LBitmap(new LBitmapData(imglist["fail2"]));
	}
	else if(foodnumber==2)
	{
		fail=new LBitmap(new LBitmapData(imglist["fail3"]));
	}
	else
	{
		fail=new LBitmap(new LBitmapData(imglist["fail4"]));
	}

	fail.y = 230;
	fail.x = 135;
	
	overlayer.addChild(fail);

	restart =new LBitmap(new LBitmapData(imglist["restart"]));
	restartButton = new LButton(restart, restart);
	restartButton.y=437;
	restartButton.x=236;
	overlayer.addChild(restartButton);


	score=new LTextField();
	score.size = 15;
	score.color = "white";
	score.stroke = true;
	score.text = floornumber;
	score.x = 298;
	score.y = 411;
	overlayer.addChild(score);

	restartButton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);

}

//游戏结束时的提示函数

