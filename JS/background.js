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