function gamehelp()
{
	bglayer.die();
	bglayer.removeAllChild();
	var bitmap = new LBitmap(new LBitmapData(imglist["game"]));
	bglayer.addChild(bitmap);//添加背景图片
	var title = new LTextField();
	title.x = 20;
	title.y = 100;
	title.size = 50;
	title.color = "#000000";
	title.text = "操作说明";
	bglayer.addChild(title);
	var title1 = new LTextField();
	title1.x = 20;
	title1.y = 200;
	title1.size = 20;
	title1.color = "#000000";
	title1.text = "方向←→键控制移动。";
	bglayer.addChild(title1);
	var bitmap = new LBitmap(new LBitmapData(imglist["floor1"]));
	bitmap.x=20;
	bitmap.y=240;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 240;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "普通木板";
	bglayer.addChild(title2);
	var bitmap = new LBitmap(new LBitmapData(imglist["floor2"]));
	bitmap.x=20;
	bitmap.y=280;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 280;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "跳跃板";
	bglayer.addChild(title2);
		var bitmap = new LBitmap(new LBitmapData(imglist["floor3"]));
	bitmap.x=20;
	bitmap.y=320;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 320;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "滚动板（左滚动）";
	bglayer.addChild(title2);
	var bitmap = new LBitmap(new LBitmapData(imglist["floor4"]));
	bitmap.x=20;
	bitmap.y=360;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 360;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "带刺板（会掉血的噻）";
	bglayer.addChild(title2);
		var bitmap = new LBitmap(new LBitmapData(imglist["floor5"]));
	bitmap.x=20;
	bitmap.y=400;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 400;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "虚板（踩上会踩空的）";
	bglayer.addChild(title2);
			var bitmap = new LBitmap(new LBitmapData(imglist["plane"]));
	bitmap.x=50;
	bitmap.y=470;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 480;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "这是礼物，吃到会加蓝的";
	bglayer.addChild(title2);
		var title2 = new LTextField();
	title2.x = 50;
	title2.y = 520;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "试试在有蓝的时候按一下S, A, D键";
	bglayer.addChild(title2);
	var bitmap1=new LBitmap(new LBitmapData(imglist["gogame"]));
	var startbutton=new LButton(bitmap1,bitmap1);
	startbutton.y=8;
	startbutton.x=270;
	bglayer.addChild(startbutton);
	startbutton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
}

function gamestart()//画面初始化
{
	foodnumber=0;
	floornumber=1;
	bglayer.die();
	bglayer.removeAllChild();
	backg=new Background();
	bglayer.addChild(backg);//运动的背景层是一个新的类型，是背景层之子。
	/*背景层的声明一定要在字层声明之前，否则字会被覆盖掉。*/
	var foodicon=new LBitmap(new LBitmapData(imglist["foodicon"]));
	foodicon.y=60;
	foodicon.x=1;
	bglayer.addChild(foodicon);

	flootext=new LTextField();//楼层字
	flootext.size=240;
	flootext.color="#DEE8ED";
	flootext.text="0";
	flootext.x=170;
	flootext.y=200;
	bglayer.addChild(flootext);//大层数层

	ft=new LTextField();
	ft.size=20;
	ft.color="black";
	ft.text=": ";
	ft.x=23;
	ft.y=58;
	bglayer.addChild(ft);

	foodtext=new LTextField();
	foodtext.size=20;
	foodtext.color="red";
	foodtext.text=foodnumber;
	foodtext.x=35;
	foodtext.y=60;
	bglayer.addChild(foodtext);//食物数量

	lifetiao=new LGraphics();
	bglayer.addChild(lifetiao);
	//Graphics类包含一组可用来创建矢量形状的方法,画背景,背景是白色
	//drawRect ( thickness  color  param  isFill  fillColor ) 

	lifetiao.drawRect(3,"#000000",[0,20,200,10],true,"#91D94E");//血条层
	mptiao=new LGraphics();
	bglayer.addChild(mptiao);
	mptiao.drawRect(3,"#000000",[0,40,200,10],true,"#0B95CE");//蓝层


	// LSprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。
	floorlayer=new LSprite(); 
	
	bglayer.addChild(floorlayer);//记录各个地板，地板层是地板数组，也是背景层之子
	//rabbit=new Animal();
	//bglayer.addChild(rabbit);//记录主角
	foodlayer=new LSprite();
	bglayer.addChild(foodlayer);//礼物层
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
function onframe()
{
	if(floornumber%2==0)
	{
		stepchange=stepchange+0.005;////可变移动量+0.005
	}
	if(rabbit.hp==rabbit.maxhp)//hp，maxhp初始值为10，
	{
		hpfull=1;
	}//是否满血
	else{
		hpfull=0;
	}
	if(!hpfull){
		if(temp2--<=0)
		{
			temp2=80;
			rabbit.hp++;
		}
	}//以上是对回血功能的实现,如果不是满血状态的话temp2随着数字递减，如果temp2小于等于0的话就回血。
	backg.run();
	if(temp1--<=0)
	{
		temp1=5;
		addfloor();
	}
	//以上是对背景滚动和添加地板
	if(temp3--<=0)//层数的增加条件
	{
		temp3=50;
		floornumber++;
	}
	if(temp4--<=0)
	{
		temp4=50;
		addfood();
	}
	var i=null;
	for(i in floorlayer.childList)
	{
		var kid=floorlayer.childList[i];
		if(kid.y<=-1*kid.getHeight())
		{
			floorlayer.removeChild(kid);
		}
		kid.run();
		
	}
	var j=null;
	for(j in foodlayer.childList)//超过顶层食物消失
	{
		var kid1=foodlayer.childList[j];
		if(kid1.y<=-1*kid1.getHeight())
		{	
			//console.log("食物跑了");
			foodlayer.removeChild(kid1);
		}
		kid1.run();
	}

	//if()
	//foodtext.text=foodlayer.childList.length;
	rabbit.run();
	//lifetiao.die();
	lifetiao.drawRect(3,"#000000",[0,20,200,10],true,"#000000");//扣血后的填充色
	if(rabbit.hp/rabbit.maxhp>0.66){//满血血条颜色
	lifetiao.drawRect(3,"#000000",[0,20,200*(rabbit.hp/rabbit.maxhp),10],true,"#91D94E");
	//lifetext.text="%"+(rabbit.hp/rabbit.maxhp)*100;
	}
	else if(rabbit.hp/rabbit.maxhp<0.33)//剩3血的时候
	{
		lifetiao.drawRect(3,"#000000",[0,20,200*(rabbit.hp/rabbit.maxhp),10],true,"#D03227");
	}
	else{
		lifetiao.drawRect(3,"#000000",[0,20,200*(rabbit.hp/rabbit.maxhp),10],true,"#F5B509");
	}

	//蓝条颜色
	mptiao.drawRect(3,"#000000",[0,40,200,10],true,"#000000");
	if(rabbit.mp/rabbit.maxmp>0.66){
	mptiao.drawRect(3,"#000000",[0,40,200*(rabbit.mp/rabbit.maxmp),10],true,"#0B95CE");
	//lifetext.text="%"+(rabbit.hp/rabbit.maxhp)*100;
	}
	else if(rabbit.mp/rabbit.maxmp<0.33)
	{
		mptiao.drawRect(3,"#000000",[0,40,200*(rabbit.mp/rabbit.maxmp),10],true,"#0B95CE");
	}
	else{
		mptiao.drawRect(3,"#000000",[0,40,200*(rabbit.mp/rabbit.maxmp),10],true,"#0B95CE");
	}
	
	

	if(floornumber>9){
		flootext.x=110;
	}
	flootext.text=floornumber;
	if(!rabbit.hp){
		over();
	}
}

function over()
{
	bglayer.die();//背景层die
	overlayer=new LSprite();
	overlayer.graphics.drawRect(4,"#009DD6",[90,150,300,300],true,"#ffffff");
	bglayer.addChild(overlayer);
	tiplayer1=new LTextField();
	tiplayer1.size=40;
	tiplayer1.color="#000000";
	tiplayer1.text="您的成绩为"+floornumber+"层";
	tiplayer1.x=100;
	tiplayer1.y=240;
	overlayer.addChild(tiplayer1);
	tiplayer2=new LTextField();
	tiplayer2.size=20;
	tiplayer2.color="#000000";
	tiplayer2.text="点击鼠标左键继续挑战";
	tiplayer2.x=145;
	tiplayer2.y=350;
	
	tiplayer3=new LTextField();
	tiplayer3.size=20;
	tiplayer3.color="#000000";
	tiplayer3.text="点击鼠标右键返回主页面";
	tiplayer3.x=133;
	tiplayer3.y=370;
	overlayer.addChild(tiplayer2);
	overlayer.addChild(tiplayer3);
	stepchange=10;
	bglayer.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
}

//游戏结束时的提示函数