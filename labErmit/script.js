var ctx = document.getElementById("paintbox").getContext('2d');
var x = [];
var y = [];

function Hermit(t){
	var H,k;
	k=(t-x[0])/(x[1]-x[0]);
	H=(1-3*k*k+2*k*k*k)*y[0]+(3*k*k-2*k*k*k)*y[1]+(x[1]-x[0])*((k-2*k*k+k*k*k)*y[2]+(-k*k+k*k*k)*y[3]);
	return H;
}

function start()
{ 	
	var tmp,i;
	x[0]=Number(document.getElementById('x0').value);
	x[1]=Number(document.getElementById('x1').value);
	y[0]=Number(document.getElementById('y0').value);
	y[1]=Number(document.getElementById('y1').value);
	y[2]=Number(document.getElementById('y2').value);
	y[3]=Number(document.getElementById('y3').value);
	if (x[0]>x[1]){
		tmp=x[0];
		x[0]=x[1];
		x[1]=tmp;
	}
	for (i=0;i<=3;i++) y[i]=-y[i];
	ctx.clearRect(0,0,1000,1000);
	for (let i=0;i<2;i++)
	{
		ctx.beginPath();
		ctx.arc(350+200*x[i],350+200*y[i],1.6,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle='green';
		ctx.fill();
	}
	ctx.strokeStyle = 'gray';
	ctx.beginPath();
	ctx.moveTo(150,150);
	ctx.lineTo(150,550);
	ctx.lineTo(550,550);
	ctx.lineTo(550,150);
    ctx.closePath();
	ctx.stroke();
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(350,0);
	ctx.lineTo(350,600);
	ctx.moveTo(0,350);
	ctx.lineTo(750,350);
	ctx.stroke();
	ctx.beginPath();
	for(let t1=x[0]-3/100;t1<=x[1]+3/100;t1=t1+1/100)
	{
		sx=350+200*t1;
		sy=350+200*Hermit(t1);
		if(t1==x[0]-3/100) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
	}
	ctx.stroke();
}