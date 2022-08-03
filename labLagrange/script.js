var ctx = document.getElementById("canvas").getContext('2d');
var x = [];
var y = [];
var coef=[];

function Lagr(t)
{
	var L,L0;
	L=0;
	for(let i=0;i<x.length;i++)
	{
		L0=1;
		for(let j=0;j<x.length;j++)
		{
			if(i!=j){	 
				L0=L0*(t-x[j])/(x[i]-x[j]);
			}
		}
		L=L+y[i]*L0;
	}
	return L;
}

function Newt(t)
{
	var i,j;
	var res = 0, F = 0, den=1;
	for (i=0;i<x.length;i++){
		den=1;
		for (j=0;j<i;j++) den=den*(t-x[j]);
		F=coef[i][0]*den;
		res+=F;
	}
	//console.log(res)
	return -res;
}

function start()
{ 	
	var xmin,xmax,Lagrange,Newton,i,j;
	/*x[0]=Number(document.getElementById('x0').value);
	x[1]=Number(document.getElementById('x1').value);
	x[2]=Number(document.getElementById('x2').value);
	x[3]=Number(document.getElementById('x3').value);
	x[4]=Number(document.getElementById('x4').value);
	y[0]=Number(document.getElementById('y0').value);
	y[1]=Number(document.getElementById('y1').value);
	y[2]=Number(document.getElementById('y2').value);
	y[3]=Number(document.getElementById('y3').value);
	y[4]=Number(document.getElementById('y4').value);*/
	x=[
300.02315,
300.02509,
280.12547,
260.22585,
239.94354,
220.29904,
200.14429,
180.1598,
160.08992,
140.06274,
120.03555,
100.00836,
90.05855,
80.07313,
70.04706,
60.043,
50.03047,
40.00906,
40.01186,
35.00332,
29.99505,
24.99153,
21.9974,
19.00062,
16.00122,
14.04364,
12.01507,
10.00405,
9.00544,
8.01045,
7.00564,
6.01161,
5.00199
];
	y=[
4.374886,
4.372443,
4.349153,
4.285998,
4.24871,
4.192264,
4.201706,
4.14427,
4.044344,
3.942224,
3.836152,
3.644014,
3.54902,
3.43334,
3.306771,
3.124784,
2.889407,
2.575629,
2.575392,
2.363873,
2.073105,
1.622579,
1.319333,
1.042388,
0.796359,
0.614162,
0.512963,
0.414941,
0.334402,
0.260324,
0.220142,
0.185731,
0.159273
];
	Lagrange=document.getElementById('Lagr').checked;
	Newton=document.getElementById('Newt').checked;
	xmin=x[0];
	xmax=x[0];
	for (let i=0;i<x.length;i++)
	{
		if(xmin>x[i]) xmin=x[i];
		if(xmax<x[i]) xmax=x[i];
	}
	for (let i=0;i<x.length;i++) y[i]=-y[i];
	ctx.clearRect(0,0,1000,1000);
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,1000,1000);
	ctx.strokeStyle = 'green';
	for (let i=0;i<x.length;i++)
	{
		ctx.beginPath();
		ctx.arc(350+200/300*x[i],350+200/5*y[i],1.6,0,2*Math.PI);
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
	if (Lagrange==true) {
		ctx.beginPath();
		for(let t1=xmin-3/100;t1<=xmax+3/100;t1=t1+1/100)
		{
			sx=350+200/300*t1;
			sy=350+200/5*Lagr(t1);
			if(t1==xmin-3/100) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
		}
		ctx.stroke();
	}
	if (Newton==true) {
		for(i=0; i<x.length; i++){
			coef[i] = [];
			for(j=0; j<x.length-i; j++){
				if (i==0) coef[i][j]=-y[j];
				else  coef[i][j] = (coef[i-1][j+1]-coef[i-1][j])/(x[j+i]-x[j]) ;
			}
		}
		console.log(coef);
		var c=[];
		for(i=0; i<x.length; i++){
			for(j=0; j<i+1; j++){
				c[i]=coef[x.length-1-i][0];
			}
			console.log(c);
		}
		ctx.beginPath();
		for(let t2=xmin-3/100;t2<=xmax+3/100;t2=t2+1/100)
		{
			sx1=350+200/300*t2;
			sy1=350+200/5*Newt(t2);
			if(t2==xmin-3/100) ctx.moveTo(sx1, sy1); else ctx.lineTo(sx1, sy1);
		}
		ctx.stroke();
	}
}