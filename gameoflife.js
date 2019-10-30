"use strict";
/*
Mitzi Bustamante
December 11 2018
CISC 131/
Game of Life
*/
window.onload =function ()
{
	var gameBoardArray;//declaration
	var tempArray;//declaration
	var i;//declaration row
	var j;//declaration column
	gameBoardArray=create2dArray(15,15,getDeadValue());
	tempArray=copy2dArray(gameBoardArray);
	createGameBoard(document.getElementById("gameBoard"),gameBoardArray);
	createFirstGeneration(gameBoardArray);
	for(i=0;i<gameBoardArray.length;i++)
	{
		for(j=0;j<gameBoardArray[i].length;j++)
		{
			if(gameBoardArray[i][j]===getDeadValue())
			{
				document.getElementById("r"+i+"c"+j).style.backgroundColor=getDeadColor();
			}
			if(gameBoardArray[i][j]===getLiveValue())
			{
				document.getElementById("r"+i+"c"+j).style.backgroundColor=getLiveColor();
			}
		}
	}
	window.setInterval(function(){applyRules(gameBoardArray,tempArray)},500);
};
function getDeadValue()
{
	//return value of dead cell
	return 0;
}

function getLiveValue()
{
	//get value of live cell
	return 1;
}

function isAlive(cell)
{
	//returns true if cell is alive and returns false if cell is dead
	return(cell===getLiveValue());
}

function getLiveColor()
{
	//background color of the alive cell
	//return getRandomRGB();
	return "Aquamarine";
}

function getDeadColor()
{
	//background color of a dead cell
	return "black";
}

function isInArray(array2d,row,col)
{
	// return true if the row & column are valid in the array
	return(row>=0 && row<array2d.length && col<array2d[0].length && col>=0);
}

function create2dArray(rows,columns,initialValue)
{
	//creates a two dimension array
	var array; //declaration
	var i;//row
	var j;//column
	array=new Array(rows);
	for(i=0;i<array.length;i++)
	{
		array[i]=new Array(columns);
	}
    for(i=0;i<array.length;i++)
	{
		for(j=0;j<array[i].length;j=j+1)
		{
			array[i][j]=initialValue;
		}
	}
	return array;
}

function copy2dArray(array)
{
	//returns a copy of the two dimension array
	var thatArray //declaration
	var i;//declaration row
	var j;//declaration column
	thatArray= new Array(array.length)
	for(i=0;i<array.length;i++)
	{
		thatArray[i]=new Array(array[i].length);
	}
	for(i=0;i<array.length;i++)
	{
		for(j=0;j<array[i].length;j=j+1)
		{
			thatArray[i][j]=array[i][j];
		}
	}
	return thatArray;
}

function createGameBoard(containerElement, array2d)
{
	// creates elements to a rectangular grid of divs
	var row;//declaration
	var col;//declaration
	var i;//declaration
	var hold;//declaration
	var html;//declaration
	html="";
	hold="";
	row=0;
	col=0;
	for(i=0;i<array2d.length*array2d.length;i++)
	{
		hold="cell";
		if(row===0 && col<array2d.length)
		{
			hold=hold+" firstRow";
		}
		if(col===array2d.length-1)
		{
			hold=hold+" lastColumn";
		}
		if(col===array2d.length)
		{
			hold=hold+" newRow";
			row=row+1;
			col=0;
		}
		html=html+createHTMLElement("div","r"+row+"c"+col,hold,"");
		col=col+1;
	}
	containerElement.innerHTML=html;
}

function createFirstGeneration(array2d)
{
	//sets the state for the first generation
	var i; //declaration
	var j; //declaration
	var k;
	var row;
	var col;
	for (i=0; i<array2d.length; i++)
	{
		for (j=0; j<array2d[i].length; j++)
		{
			if (i===j || i==j || (i+j)%2===0)
			 //if (i===j || i+32===j || i-32===j || (i*j)%3===1)
			//if ( i===j || (i*j)%34===0)
			 //if ( i===j || (i*j)%21===0)
			{
				array2d[i][j]=getLiveValue();
			}
		}
	}

}

function countLivingNeighborsOf(array2d,row,col)
{
	//returns the number of neighbor of the cell that are alive
	var i; //declaration
	var j;//declaration
 	var liveNeighbors;//declaration
 	liveNeighbors=0;
	for(i=row-1; i<row+2; i++)
	{
		for(j=col-1; j<col+2; j++)
		{
			if((i!== row||j!== col) && isInArray(array2d,i,j) === true)
			{
				if(array2d[i][j]===getLiveValue())
				{
		 			liveNeighbors=liveNeighbors+1;
				}
			}
		}
	}
 return liveNeighbors;
}

function applyRules(array2d,tmpArray)
{
	//store in tmpArray the number of living neighbors for each element
 	//change array2d to reflect the new state of each element
 	//update background colors based on the new state
	var i; //row
	var j; //column
	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d[i].length;j++)
		{
			tmpArray[i][j]=countLivingNeighborsOf(array2d,i,j);
		}
	}
	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d[i].length;j++)
		{
			if(array2d[i][j]===getLiveValue())
			{
			    if(tmpArray[i][j]<2)
			    {
				    array2d[i][j]=getDeadValue();
			    }
			    if(tmpArray[i][j]>3)
			    {
				    array2d[i][j]=getDeadValue();
			    }
			}
			if(array2d[i][j]===getDeadValue())
			{
			    if(tmpArray[i][j]===3)
			    {
				    array2d[i][j]=getLiveValue();
				}
				// if(tmpArray[i][j]===2)
			    // {
				//     array2d[i][j]=getLiveValue();
				// }
			}
		}
	}
	for(i=0;i<array2d.length;i++)
		{
			for(j=0;j<array2d[i].length;j++)
			{
				if(array2d[i][j]===getDeadValue())
				{
					document.getElementById("r"+i+"c"+j).style.backgroundColor=getDeadColor();
				}
				if(array2d[i][j]===getLiveValue())
				{
					document.getElementById("r"+i+"c"+j).style.backgroundColor=getLiveColor();
				}
			}
	     }
}

function createHTMLElement (elementType,id,classInfo,content)
{
/* Create inside the HTML a new div with the appropriate (element,id,class, and the content)*/
if (elementType===null)
{
 elementType="";
}
else
{
	elementType=trim(elementType);
}
if (id===null)
{
 id="";
}
else
{
	id=trim(id);
	if(id.length>0)
	{
	 id=' id="'+id+'"';
	}
}
if (classInfo===null)
{
 classInfo="";
}
else
{
	classInfo=trim(classInfo);
	if (classInfo.length>0)
	{
	 classInfo=' class="'+classInfo+'"';
}
}
return ('<'+ elementType +id + classInfo +'>' + content + '</'+ elementType + '>');
}

function trim(data)
{
//This function trims the white spaces
	var end; //declaration for the end of the word
	var result; //declaration
	var start; //declaration for the start of the word
	var whitespace; //declaration for the whitespace characters
	if (typeof data === "string")
		{
			whitespace=" \n\r\t\f";
			start=0;
			while (start<data.length && whitespace.indexOf(data.charAt(start))>=0)
			{
				start=1+start;
			}
			end=data.length-1;
			while (end>=0 && whitespace.indexOf(data.charAt(end))>=0)
			{
				end=end-1;
			}
			if (end<start)
			{
				result="";
			}
			else
			{
				result=data.substring(start,end+1);
			}
		}
		else
		{
		result=data;
		}
return result;
}

/*function getRandomInteger (upperLimit)
{
	//This function gets a random number
	return Math.floor(Math.random()*(upperLimit+1));
}
function getRandomRGB()
{
	//This function gets a random RGB color
	var result;
	result="rgb(";
	result=result+getRandomInteger (255)+",";
	result=result+getRandomInteger (255)+",";
	result=result+getRandomInteger (255)+")";
	return result;
}*/
