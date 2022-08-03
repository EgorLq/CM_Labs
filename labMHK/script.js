var ctx = document.getElementById("paintbox").getContext('2d');
var x = [];
var x0 = [];
var x2 = [];
var x3 = [];
var x4 = [];
var y = [];


function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}


function MultiplyMatrix(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = 1,
        C = [];
    for (var i = 0; i < rowsA; i++) C[ i ] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[ i ][j]*B[j][k];
          C[ i ][k] = t;
        }
     }
    return C;
}

function Determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function AdjugateMatrix(A)   // A - двумерный квадратный массив
{                                        
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[ i ] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[ i ][j] = sign*Determinant(B);   // Функцию Determinant см. выше
        }
     }
    return adjA;
}

function InverseMatrix(A)   // A - двумерный квадратный массив
{   
    var det = Determinant(A);                // Функцию Determinant см. выше
    if (det == 0) return false;
    var N = A.length, A = AdjugateMatrix(A); // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[ i ][j] /= det; }
    return A;
}

function start()
{ 	
	ctx.clearRect(0,0,1000,1000);
	var X=0,X0=0,X2=0,X3=0,X4=0,Y=0,i,j,LNx=0,LNy=0,LNx2=0,LNxy=0,B,a;
	var coefl = [];
	var coefq = [];
	var b = [];
	var Nx;
	var Ny=[];
	var lnx=[];
	var lny=[];
	var lnx2=[];
	var lnxy=[];
	var sum=0;
	
	x=[1,2,3,4,5];
	y=[-0.07,0.76,1,1.53,1.45];
	for (i=0;i<x.length;i++){
	x0[i]=Math.pow(x[i],0);
	x2[i]=Math.pow(x[i],2);
	x3[i]=Math.pow(x[i],3);
	x4[i]=Math.pow(x[i],4);
	}
	
	for (i=0;i<x.length;i++){
		X+=x[i];
		X0+=x0[i];
		X2+=x2[i];
		X3+=x3[i];
		X4+=x4[i];
		Y+=y[i];
	}
	
	l=document.getElementById('l').checked;
	q=document.getElementById('q').checked;
	pow=document.getElementById('pow').checked;
	
	if (l==true){
		coefl[0]=[X0,X];
		coefl[1]=[X,X2];
		coefl=InverseMatrix(coefl);
		b[0]=[Y,0];
		b[1]=0;
		for (i=0;i<x.length;i++) b[1]+=x[i]*y[i];
		b[1]=[b[1],0];
		Nx=MultiplyMatrix(coefl,b);
		for (i=0;i<x.length;i++) Ny[i]=Nx[0][0]+Nx[1][0]*x[i];
		for(let t1=x[0];t1<=x[x.length-1];t1=t1+1/100)
		{
			sx=350+70*t1;
			sy=500+70*-(Nx[0][0]+Nx[1][0]*t1);
			if(t1==x[0]) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
		}
		ctx.stroke();
		for (i=0;i<x.length;i++){
		sum+=Math.pow((Ny[i]-y[i]),2);
		}
		sum*=1/x.length;
		sum=Math.pow(sum,0.5);
		document.getElementById('l1').innerHTML = sum;
		for (i=0;i<x.length;i++)
		{
		ctx.beginPath();
		ctx.arc(350+70*x[i],500+70*-Ny[i],2,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle='red';
		ctx.fill();
		}
	}
	sum=0;
	if (q==true){
		coefq[0]=[X0,X,X2];
		coefq[1]=[X,X2,X3];
		coefq[2]=[X2,X3,X4];
		coefq=InverseMatrix(coefq);
		b[0]=[Y,0];
		b[1]=0;
		for (i=0;i<x.length;i++) b[1]+=x[i]*y[i];
		b[1]=[b[1],0];
		b[2]=0;
		for (i=0;i<x.length;i++) b[2]+=x2[i]*y[i];
		b[2]=[b[2],0];
		Nx=MultiplyMatrix(coefq,b);
		for (i=0;i<x.length;i++) Ny[i]=Nx[0][0]+Nx[1][0]*x[i]+Nx[2][0]*x2[i];
		for (i=0;i<x.length;i++){
		sum+=Math.pow((Ny[i]-y[i]),2);
		}
		sum*=1/x.length;
		sum=Math.pow(sum,0.5);
		document.getElementById('q1').innerHTML = sum;
		for(let t1=x[0];t1<=x[x.length-1];t1=t1+1/100)
		{
			sx=350+70*t1;
			sy=500+70*-(Nx[0][0]+Nx[1][0]*t1+Nx[2][0]*t1*t1);
			if(t1==x[0]) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
		}
		ctx.stroke();
		for (i=0;i<x.length;i++)
		{
		ctx.beginPath();
		ctx.arc(350+70*x[i],500+70*-Ny[i],2,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle='blue';
		ctx.fill();
		}
	}
	sum=0;
	if(pow==true){
		for (i=0;i<x.length;i++){
			lnx[i]=Math.log(Math.abs(x[i]));
			lny[i]=Math.log(Math.abs(y[i]));
			lnx2[i]=Math.log(Math.abs(x[i]))*Math.log(Math.abs(x[i]));
			lnxy[i]=Math.log(Math.abs(x[i]))*Math.log(Math.abs(y[i]));
			LNx+=lnx[i];
			LNy+=lny[i];
			LNx2+=lnx2[i];
			LNxy+=lnxy[i];
		}
		console.log(lny);
		B=(LNx*LNy-LNxy*x.length)/(LNx*LNx-LNx2*x.length);
		a=Math.exp((LNy-LNx*B)/x.length);
		for (i=0;i<x.length;i++) Ny[i]=a*Math.pow(x[i],B);
		//console.log(Ny);
		for(let t1=x[0];t1<=x[x.length-1];t1=t1+1/100)
		{
			sx=350+70*t1;
			sy=500+70*-(a*Math.pow(t1,B));
			if(t1==x[0]) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
		}
		for (i=0;i<x.length;i++){
		sum+=Math.pow((Ny[i]-y[i]),2);
		}
		sum*=1/x.length;
		sum=Math.pow(sum,0.5);
		document.getElementById('pow1').innerHTML = sum;
		ctx.stroke();
		for (i=0;i<x.length;i++)
		{
			ctx.beginPath();
			ctx.arc(350+70*x[i],500+70*-Ny[i],2,0,2*Math.PI);
			ctx.stroke();
			ctx.fillStyle='green';
			ctx.fill();
		}
	}
	
	for (i=0;i<y.length;i++) y[i]=-y[i];
	for (let i=0;i<x.length;i++)
	{
		ctx.beginPath();
		ctx.arc(350+70*x[i],500+70*y[i],1.6,0,2*Math.PI);
		//console.log(500+70*y[i]);
		ctx.stroke();
		ctx.fillStyle='black';
		ctx.fill();
	}
	/*ctx.strokeStyle = 'gray';
	ctx.beginPath();
	ctx.moveTo(150,150);
	ctx.lineTo(150,550);
	ctx.lineTo(550,550);
	ctx.lineTo(550,150);
	ctx.closePath();
	ctx.stroke();*/
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(350,0);
	ctx.lineTo(350,600);
	ctx.moveTo(0,500);
	ctx.lineTo(750,500);
	ctx.stroke();
	ctx.beginPath();
}