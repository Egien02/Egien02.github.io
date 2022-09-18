// init ( speed,divid,width,height,callback )
// speed:每次页面刷新间隔,FPS = 1000/speed;
// divid:div的id
// width:页面宽
// height:页面高
// callback：游戏初始化后，调用此函数
init(50,"mycanvas",480,680,main);

//bglayer:背景层
// loadinglayer:进度条层
// floorlayer:地板层，记录地板
// rabbit:动物
// foodlayer:食物层
var bglayer,loadinglayer,floorlayer,rabbit,foodlayer;


var floor=0,life=1,lifetiao,mptiao;//全局变量看层数与生命值

var imgdata = new Array(//这是个存图片的数组，为了一会加载用
	{name:"game",path:"游戏封面.jpg"},
	{name:"gogame",path:"进入游戏.png"},
	{name:"bg",path:"bg.jpg"},//背景
	// {name:"bg2",path:"bg2.jpg"},//背景2
	// {name:"bg3",path:"bg3.jpg"},//背景3
	{name:"rabbit",path:"rabbit.png"},//小人
	{name:"plane",path:"food.png"},//食物
	{name:"foodicon",path:"foodicon.png"},
	{name:"floor1",path:"newfloor1$.png"},//实心梯
	{name:"floor2",path:"newfloor3$.png"},//弹簧梯
	{name:"floor3",path:"newfloor2$.png"},//左滑梯
	{name:"floor4",path:"newfloor5$.png"},//带刺梯
	{name:"floor5",path:"newflor4$.png"},//消失梯
	{name:"start",path:"start.png"},//开始按钮
	{name:"help",path:"help90.png"},//操作说明按钮
	{name:"floorup",path:"newfloor5$up.png"});//顶刺
var imglist=new Array();
var floorlist=new Array();
var step=10;//每次循环移动量
var stepchange=10;//可变移动量
var temp1=0;//参量1与踏板出现频率有关
var temp2=80,hpfull=1;;//参量2与回血有关,hpfull用来判断是否满血是否需要蓄血
var tan=0;//此变量用于记录是否为处在弹跳跳板状态
var temp3=50,floornumber=1;//参量3用来记录下了多少层
var temp4=50,foodnumber=0;;//记录礼物间隔
function main()
{
	bglayer=new LSprite();               //声明背景层

	//Graphics类包含一组可用来创建矢量形状的方法,画背景,背景是白色
	bglayer.graphics.drawRect(1,"#000000",[0,0,480,680],true,"#FFFFFF");
	
	addChild(bglayer);	//C要大写！	
	loadinglayer=new LoadingSample3();//声明进度条层及其类型
	bglayer.addChild(loadinglayer);

	//LLoadManage类是可以用来同时读取图片，文本以及js多种类型的文件。
	//LLoadManage.load ( list  onUpdate  onComplete )
	//list:指定的需要加载数据的数组。
	//onUpdate:加载过程中调用的函数，一般用来显示游戏进度。
	//onComplete: list中全部文件加载完成时调用此函数

	LLoadManage.load(imgdata,
				function(progress)
				{
					loadinglayer.setProgress(progress);//setProgress设置进度条的长度百分比
				},
				gameinit);//加载完毕进入gameinit函数
}

function gameinit(result)//加载完毕返回result为图片数组，进行游戏刚开始提示界面
{
	
	imglist=result;
	bglayer.die();//清空所有图形以及事件。
	bglayer.removeAllChild();
	
	//bglayer.removeChild(loadinglayer);
	//loadinglayer=null;//加载完毕后让进度条界面去死

	// LBitmap 类表示用于表示位图图像的显示对象
	//创建一个具有指定的宽度和高度的 LBitmapData 对象。
	var bitmap = new LBitmap(new LBitmapData(imglist["game"]));
	bglayer.addChild(bitmap);//添加背景图片
	//LTextField 类的方法允许您设置、选择并操作在创作过程中或运行时创建的动态或输入文本字段中的文本。
	var title = new LTextField();
	title.x = 205;
	title.y = 100;
	title.size = 30;
	title.color = "#000000";
	title.text = "森林";
	bglayer.addChild(title);
		var title = new LTextField();
	title.x = 165;
	title.y = 135;
	title.size = 50;
	title.color = "#000000";
	title.text = "守护者";
	bglayer.addChild(title);//添加标题//添加标题

	var bitmap1=new LBitmap(new LBitmapData(imglist["start"]));//添加开始按钮图片
	var startbutton=new LButton(bitmap1,bitmap1);
	startbutton.y=400;
	startbutton.x=135;
	bglayer.addChild(startbutton);
	var bitmap2=new LBitmap(new LBitmapData(imglist["help"]));
	var helpbutton=new LButton(bitmap2,bitmap2);
	helpbutton.y=18;
	helpbutton.x=390;
	bglayer.addChild(helpbutton);
	startbutton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	helpbutton.addEventListener(LMouseEvent.MOUSE_UP,gamehelp);//添加监听器，一旦点击了就进入gamestart开始游戏。
}
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
/*        以下是背景运动部分     */
function Background()
{
	base(this,LSprite,[]);//声明Background是一个层类
	this.bitmapdata = new LBitmapData(imglist["bg"]);//定义一个显示图片
	this.pic1=new LBitmap(this.bitmapdata);
	this.pic1.y=0;
	this.addChild(this.pic1);//添加第一张在最下边
	
	this.pic2=new LBitmap(this.bitmapdata);
	this.pic2.y=this.pic1.getHeight();//获取pic1的高度:680
	this.addChild(this.pic2);//第二张在中间

	this.pic3=new LBitmap(this.bitmapdata);  //B要大写！
	this.pic3.y=this.pic1.getHeight()*2;
	this.addChild(this.pic3);//第三张在最下边

	this.pic4=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic4.y=0;
	this.addChild(this.pic4);
	this.pic5=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic5.y=0;
	this.pic5.x=100;
	this.addChild(this.pic5);
	this.pic6=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic6.y=0;
	this.pic6.x=200;
	this.addChild(this.pic6);
	this.pic7=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic7.y=0;
	this.pic7.x=300;
	this.addChild(this.pic7);
		this.pic8=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic8.y=0;
	this.pic8.x=400;
	this.addChild(this.pic8);
	
}
Background.prototype.run=function()//背景的Run函数
{
	// console.log("pic1.y= ",this.pic1.y);
	// console.log("stepchange= ",stepchange);
	this.pic1.y=this.pic1.y-stepchange;
	
	

	// console.log("pic2.y= ",this.pic2.y);
	// console.log("stepchange= ",stepchange);
	this.pic2.y=this.pic2.y-stepchange;
	

	// console.log("pic3.y= ",this.pic3.y);
	// console.log("stepchange= ",stepchange);
	this.pic3.y=this.pic3.y-stepchange;



	// console.log("pic1.y= ",this.pic1.y);
	// console.log("pic1.getHeight= ",this.pic1.getHeight());
	// console.log("pic2.y= ",this.pic2.y);
	// 最后pic1的y小于680,pic2的y小于0
	// 如果pic1.y小于负pic1的高度的话
	//实现的是背景轮播效果
	if(this.pic1.y<=-this.pic1.getHeight())
	{
		// console.log("pic1.getHeight= ",this.pic1.getHeight());
		// console.log("pic1.getHeight= ",this.pic1.getHeight());
		this.pic1.y=this.pic2.y;
		// console.log("pic2.y= ",this.pic2.y);
		// console.log("pic2.y= ",this.pic2.y);
		// console.log("pic1.y= ",this.pic1.y);
		this.pic2.y=this.pic1.y+this.pic1.getHeight();
		this.pic3.y=this.pic2.y+this.pic1.getHeight();
	}
}
/*以上是背景运动部分 */
/*以下是地板部分*/
function Floor()
{
	base(this,LSprite,[]);
	this.pic();	/////////你TM因为这一句你调了2个多小时！！！！！！！！！！！
	this.typ=0;
}
Floor.prototype.run=function()
{
	this.y=this.y-stepchange;
};
Floor.prototype.pic=function(){
}
function Floora() //普通木板 继承floor类
{
	//base(derive,baseSprite,baseArgs)javascript中没有继承，此函数可以实现继承
	// 	derive:需要继承的类
	// baseSprite:被继承的类
	// baseArgs:传给被继承类的参数

	base(this,Floor,[]);
	this.typ=1;
}
Floora.prototype.pic=function() //将图片赋值
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor1"]));
	this.addChild(this.bitmap);
}
function Floorb() //跳跃木板  继承floor
{
	base(this,Floor,[]);
	this.typ=2;
}
Floorb.prototype.pic=function()
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor2"]));
	this.addChild(this.bitmap);
}
function Floorc() //移动木板  继承floor
{
	base(this,Floor,[]);
	this.typ=3;
}
Floorc.prototype.pic=function()
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor3"]));
	this.addChild(this.bitmap);
}
function Floord() //带刺木板  继承floor
{
	base(this,Floor,[]);
	this.typ=4;
}
Floord.prototype.pic=function()
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor4"]));
	this.addChild(this.bitmap);
}
function Floore() //普通木板 继承floor类
{
	base(this,Floor,[]);
	this.typ=5;
}
Floore.prototype.pic=function() //将图片赋值
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor5"]));
	this.addChild(this.bitmap);
}
function addfloor()
{
	var str=[1,2,3,4,5];
	//floor：向下取整
	var random=Math.floor(Math.random()*str.length);//Math.random()返回0~1之间的随机数不包括1.

	var result=str[random];
	if(result==1){
	newfloor=new Floora();
	}
	else if(result==2){
		newfloor=new Floorb();
	}
	else if(result==3){
		newfloor=new Floorc();
	}
	else if(result==4){
		newfloor=new Floord();
	}
	else{
		newfloor=new Floore();
	}
	newfloor.y=600;
	newfloor.x=Math.random()*380;
	floorlayer.addChild(newfloor);   //将地板加上作为floorlayer的子元素

}
/*以上是地板部分  */
/* 以下是食物部分   */
function food()
{
	
	base(this,LSprite,[]);
	this.bitmap = new LBitmap(new LBitmapData(imglist["plane"]));
	this.addChild(this.bitmap);
	
}
food.prototype.run=function()
{
	this.y=this.y-stepchange;
};
function addfood()
{
	var newfood=new food();
	//alert("a");
	var random=Math.floor(Math.random()*0.5*floorlayer.childList.length);//floorlayer.childList子对象列表
	
	random=Math.floor(0.5*floorlayer.childList.length)+random;

	newfood.y=floorlayer.childList[random].y-45;
	newfood.x=floorlayer.childList[random].x+40;
	foodlayer.addChild(newfood);
}



/*以下是人物部分   */

function Animal()
{
	var self=this;
	base(this,LSprite,[]);
	this.movement=0;//运动状态
	this.hp=10;    //生命值
	this.maxhp=10; //最大生命值
	this.mp=3;
	this.maxmp=5;
	this.jump=1;	//是否处在跳跃状态
	this.speed=0;  	//下落速度
	this.fy=0;      //之前的Y坐标
	this.fjump=1;//之前的jump状态
	//LGlobal: 全局类
	//divideCoordinate: 将传入的宽和高，按照行数和列数进行拆分计算，会得到一个2维数组。
	//divideCoordinate ( width  height  row  col ) Array 
	var list=LGlobal.divideCoordinate(45,64,1,1);//小人图片像素为960*50
	//LBitmapData ( image  x  y  width  height) 
	//image 一个Image对象。
	// x Image可视范围x坐标（该参数可省略）。
	// y Image可视范围y坐标（该参数可省略）。
	// width Image可视范围宽（该参数可省略）。
	// height Image可视范围高（该参数可省略）。
    var data=new LBitmapData(imglist["rabbit"],0,0,40,50);
	//LAnimation ( layer  data  list ) 
	// 	layer一个LSprite对象。LSprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。

	// data LBitmapData | Array
	// 一个LBitmapData对象，既包含一组或多组frame的精灵图表。或者是一个LBitmapData对象的数组。

	// list Array
	// 每个frame的属性值。
    this.anime=new LAnimation(self,data,[[list[0][0]]]);
		
}
Animal.prototype.run=function()
{
	
	this.fy=this.y;
	this.speed=this.speed+9.8;
	this.y=this.y+this.speed;
	this.jump=1;
	if(this.speed>=20)
	{
		this.speed=20;
	}//之后匀速了
	if(this.y>=650)
	{
		this.hp=0;
		return;              //掉到最低
	}	
	else if(this.y<=5)
	{
		this.hp--;
		this.y=60; 		//到了最上边，而且要掉血
	}
	else{} //y的边界情况
	if(this.x<=5)//走到边界
	{
		this.x=20;
	}
	else if(this.x>=470)
	{
		this.x=460;
	}
	else{
	if(this.movement==1)//向左
	{
		this.x=this.x-step*1;
	}
	else if(this.movement==2) //向右
	{
		this.x=this.x+step*1;
	}
	else
	{
	}
	}
	var i=null;
	for(i in floorlayer.childList)
	{
		//this.y+30>=floorlayer.childList[i].y判断小人是否在木板上.
		//
		if(this.speed>0&&(this.y+30>=floorlayer.childList[i].y&&this.y-floorlayer.childList[i].y<=10)&&
		(this.x-floorlayer.childList[i].x<=100&&floorlayer.childList[i].x-this.x<=30))
		{
			// console.log("i= ", i);
			// console.log("her o.y= ", this.y);
			// console.log("floor.y= ", floorlayer.childList[i].y);
			// console.log("rabbit.y-floor[i].y", this.y-floorlayer.childList[i].y);
			// console.log("rabbit.x-floor[i].x", this.x-floorlayer.childList[i].x);
			// console.log("floor[i].x-rabbit.x", floorlayer.childList[i].x-this.x);
			if(floorlayer.childList[i].typ==4&&this.fjump==1){
				this.hp--;
			}//掉血版上了就要掉血
			if(floorlayer.childList[i].typ==3){
				this.x=this.x-step*0.5;
			}//掉移动版上了就要移动
			if(floorlayer.childList[i].typ==5){
				floorlayer.removeChild(floorlayer.childList[i]);
			}
			this.jump=0;//跳跃动作


			this.y=floorlayer.childList[i].y-45;//让小人站在木板上小人像素高为50
		
			this.speed=0;//下落速度
			
			if(floorlayer.childList[i].typ==2&&this.fjump==1){//在弹跳木板上并且之前处于弹跳状态
			this.tan=1;//弹跳板状态表示英雄正在弹跳板上
			this.speed=-(this.speed+45);
			}
			this.changeaction();
			break;
		}
	}
	var j=null;
	for(j in foodlayer.childList)
	{
		
		if((this.x-foodlayer.childList[j].x<=40&&foodlayer.childList[j].x-this.x<=40)&&(foodlayer.childList[j].y-this.y<=30&&this.y-foodlayer.childList[j].y<=30))
		{
			console.log(foodnumber);
			foodlayer.removeChild(foodlayer.childList[j]);
			
			foodnumber+=1;
			foodtext.text=foodnumber;

			if(this.mp<this.maxmp)
			{
				this.mp++;
			}		
			
		}//吃礼物加小人蓝量
	}
	this.anime.onframe();
	this.fjump=this.jump;//”之前的jump“赋值

}
Animal.prototype.changeaction=function()
{
	if(this.movement==1)
	{
			//alert("进来了");
			rabbit.anime.setAction(3);//setAction: 设置帧动画改变小人状态
	}
	else if(this.movement==2)
	{
		rabbit.anime.setAction(2);
	}
	else if(this.jump==1)
	{
		rabbit.anime.setAction(1,0);
	}
	else
	{
		rabbit.anime.setAction(0,0);
	}
}
function initrabbit()
{
	rabbit=new Animal();
	bglayer.addChild(rabbit);
	rabbit.x=200;
	rabbit.y=60;
	//bitmap = new LBitmap(new LBitmapData(imglist["plane"]));
	//rabbit.addChild(bitmap);
}
/*     以上是人物部分    */
/*     以下是两个键盘控制器   */
function onkeydown(event)
{
	if(event.keyCode==37)//left
	{
		rabbit.movement=1;
	}
	else if(event.keyCode==39)//right
	{
		rabbit.movement=2;
	}
	else if(event.keyCode==65)//A回血
	{
		if(rabbit.mp>0)
		{
			rabbit.hp=rabbit.maxhp;
			rabbit.mp--;
		}
	}
	else if(event.keyCode==83)//S随机增加地板
	{
		if(rabbit.mp>0)
		{
			addfloor();
			rabbit.mp--;
		}
	}
	else if(event.keyCode==68)//D从天而降
	{
		if(rabbit.mp>0)
		{
			var i=null;
			i=Math.floor(Math.random()*floorlayer.childList.length);
			rabbit.y=floorlayer.childList[i].y-40;
			rabbit.x=floorlayer.childList[i].x;
			rabbit.mp--;
		}
	}
	else if(event.keyCode==87)//W
	{
		stepchange=stepchange-0.025;
		rabbit.mp--;
		
	}
	else{}
}
function onkeyup(event)
{
	rabbit.movement=0;
	rabbit.changeaction();
}
/*     以上是两个键盘控制器    */
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
	overlayer.addChild(tiplayer2);
	stepchange=10;
	bglayer.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
}

//游戏结束时的提示函数









	
	
	
	
	
	
	
	
	
	




	
	
	
	
