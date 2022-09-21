//bglayer:背景层
// loadinglayer:进度条层
// floorlayer:地板层，记录地板
// rabbit:动物
// foodlayer:食物层
var bglayer,loadinglayer,floorlayer,rabbit,foodlayer;


var floor=0,life=1,lifetiao,mptiao;//全局变量看层数与生命值

var imgdata = new Array(//这是个存图片的数组，为了一会加载用
	{name:"game",path:"./IMG/游戏封面.jpg"},
	{name:"gogame",path:"./IMG/进入游戏.png"},
	{name:"honor", path:"./IMG/徽章.png"},
	{name:"honoricon", path:"./IMG/徽章icon.png"},
	{name:"honor2", path:"./IMG/徽章2.png"},
	{name:"honoricon2", path:"./IMG/徽章2icon.png"},
	{name:"honor3", path:"./IMG/徽章3.png"},
	{name:"honoricon3", path:"./IMG/徽章3icon.png"},
	{name:"bg",path:"./IMG/bg.jpg"},//背景
	// {name:"bg2",path:"bg2.jpg"},//背景2
	// {name:"bg3",path:"bg3.jpg"},//背景3
	{name:"rabbit",path:"./IMG/rabbit.png"},//小人
	{name:"plane",path:"./IMG/food.png"},//食物
	{name:"foodicon",path:"./IMG/foodicon.png"},
	{name:"floor1",path:"./IMG/newfloor1$.png"},//实心梯
	{name:"floor2",path:"./IMG/newfloor3$.png"},//弹簧梯
	{name:"floor3",path:"./IMG/newfloor2$.png"},//左滑梯
	{name:"floor4",path:"./IMG/newfloor5$.png"},//带刺梯
	{name:"floor5",path:"./IMG/newflor4$.png"},//消失梯
	{name:"start",path:"./IMG/start.png"},//开始按钮
	{name:"help",path:"./IMG/help90.png"},//操作说明按钮
	{name:"floorup",path:"./IMG/newfloor5$up.png"});//顶刺
var imglist=new Array();
var floorlist=new Array();
var step=10;//每次循环移动量
var stepchange=10;//可变移动量
var temp1=0;//参量1与踏板出现频率有关
var temp2=80,hpfull=1;;//参量2与回血有关,hpfull用来判断是否满血是否需要蓄血
var tan=0;//此变量用于记录是否为处在弹跳跳板状态
var temp3=50,floornumber=1;//参量3用来记录下了多少层
var temp4=50,foodnumber=0;;//记录礼物间隔