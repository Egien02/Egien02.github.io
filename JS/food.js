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
