var ctx = document.getElementById("paintbox").getContext('2d');
var x=[];
var count=0;

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

function Sort(arr) {
	arr.sort((a, b) => a.X > b.X ? 1 : -1);
}

paintbox.onclick = function(event) {
	ctx.clearRect(0,0,1000,700);
	var a=[];
	var b=[];
	var c=[];
	var f=[];
	var h=[];
	var p=[];
	var q=[];
	var s=[];
	var sx,sy;
	var i,k,t1;
	var p=[];
	var q=[];
	s0=0;
	sn=0;
	mouseX = event.clientX;
	mouseY = event.clientY;
	x[count]={X:(mouseX-350)/200, Y:(mouseY-350)/200};
	count++;
	Sort(x);
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
	N=x.length-1;
	if (count>=2){
		for (k=1;k<=N;k++)  h[k]=x[k].X-x[k-1].X;
		a[0]=0;
		b[0]=-2;
		c[0]=1;
		f[0]=6/(h[1]*h[1])*(x[1].Y-x[0].Y)+6*s0/h[1];
		for (k=1;k<N;k++){
			a[k]=h[k];
			b[k]=-2*(h[k]+h[k+1]);
			c[k]=h[k+1];
			f[k]=6*((x[k+1].Y-x[k].Y)/h[k+1]-(x[k].Y-x[k-1].Y)/h[k]);
		}
		a[N]=1;
		b[N]=-2;
		c[N]=0;
		f[N]=-(6*sn/h[N]+6/(h[N]*h[N])*(x[N].Y-x[N-1].Y));
		p[0]=c[0]/b[0];
		q[0]=f[0]/b[0];
		for (k=1;k<N;k++){
			p[k]=c[k]/(b[k]-a[k]*p[k-1]);
			q[k]=(f[k]+a[k]*q[k-1])/(b[k]-a[k]*p[k-1]);
		}
		p[N]=c[N-1]/(b[N-1]-a[N-1]*p[k-1]);
		q[N]=(f[N-1]+a[N-1]*q[N-1])/(b[N-1]-a[N-1]*p[N-1]);
		s[N]=(-f[N]-a[N]*q[N-1])/(-b[N]+a[N]*p[N-1]);
		for (k=N;k>0;k--) s[k-1]=p[k-1]*s[k]+q[k-1];
		ctx.strokeStyle='red';
		ctx.beginPath();
		ctx.stroke();
		ctx.strokeStyle='black';
		for (k=1;k<=N;k++){
			ctx.beginPath();
			for (t1=x[k-1].X;t1<=x[k].X+1/100;t1=t1+0.01){
				sx=350+200*t1;
				sy=350+200*((-s[k-1]*Math.pow(x[k].X-t1,3)-s[k]*Math.pow(t1-x[k-1].X,3))/(6*h[k])+(t1-x[k-1].X)*(x[k].Y/h[k]-h[k]*-s[k]/6)+(x[k].X-t1)*(x[k-1].Y/h[k]-(h[k]*-s[k-1])/6));
				if(t1==x[k-1].X) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
			}
			ctx.stroke();
		}
	}
	for (let i=0;i<=N;i++)
	{
		ctx.beginPath();
		ctx.arc(350+200*x[i].X,350+200*x[i].Y,2,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle='green';
		ctx.fill();
	}
}