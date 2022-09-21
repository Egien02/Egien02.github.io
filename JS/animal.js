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
			
			foodlayer.removeChild(foodlayer.childList[j]);
			

			sound = new LSound();
			sound.play("./sound/mie.mp3");
			sound.stop();
			foodnumber+=1;
			foodtext.text=foodnumber;
			
			if(foodnumber == 1)
			{
				var myTimer = new LTimer(1000, 1);
				myTimer.start();
				honor=new LBitmap(new LBitmapData(imglist["honor"]));
				honor.y=200;
				honor.x=140;
				honor.alpha = 0.9;
				bglayer.addChild(honor);
				myTimer.addEventListener(LTimerEvent.TIMER, timerHandler);
    			
				
				function timerHandler(){
					bglayer.removeChild(honor);
				}
				
				honor2=new LBitmap(new LBitmapData(imglist["honoricon"]));
				honor2.y=90;
				honor2.x=1;
				bglayer.addChild(honor2);
			}

			if(foodnumber == 2)
			{
				var myTimer = new LTimer(1000, 1);
				myTimer.start();
				honor=new LBitmap(new LBitmapData(imglist["honor2"]));
				honor.y=200;
				honor.x=140;
				honor.alpha = 0.9;
				bglayer.addChild(honor);
				myTimer.addEventListener(LTimerEvent.TIMER, timerHandler);
    			
				
				function timerHandler(){
					bglayer.removeChild(honor);
				}
				
				honor2=new LBitmap(new LBitmapData(imglist["honoricon2"]));
				honor2.y=92;
				honor2.x=25;
				bglayer.addChild(honor2);
			}
			
			if(foodnumber == 3)
			{
				var myTimer = new LTimer(1000, 1);
				myTimer.start();
				honor=new LBitmap(new LBitmapData(imglist["honor3"]));
				honor.y=200;
				honor.x=140;
				honor.alpha = 0.9;
				bglayer.addChild(honor);
				myTimer.addEventListener(LTimerEvent.TIMER, timerHandler);
    			
				
				function timerHandler(){
					bglayer.removeChild(honor);
				}
				
				honor2=new LBitmap(new LBitmapData(imglist["honoricon3"]));
				honor2.y=84;
				honor2.x=45;
				bglayer.addChild(honor2);
			}
				
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
			rabbit.anime.setAction(0);//setAction: 设置帧动画改变小人状态
	}
	else if(this.movement==2)
	{
		rabbit.anime.setAction(0);
	}
	else if(this.jump==1)
	{
		rabbit.anime.setAction(0,0);
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