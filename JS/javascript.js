// init ( speed,divid,width,height,callback )
// speed:每次页面刷新间隔,FPS = 1000/speed;
// divid:div的id
// width:页面宽
// height:页面高
// callback：游戏初始化后，调用此函数
init(50,"mycanvas",480,680,main);


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


function onkeyup(event)
{
	rabbit.movement=0;
	rabbit.changeaction();
}
/*     以上是两个键盘控制器    */









	
	
	
	
	
	
	
	
	
	




	
	
	
	
