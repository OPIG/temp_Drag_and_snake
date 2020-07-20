var str="-123";
function toInt(str1){	
	var lenth =  str1.length;
	var result=0;
	var flag=0;
	
	if(str1[0]=="-"){
		flag=1;
	}
			for(var i =flag; i<lenth;i++){
				var temp=(str1[i]-'0');
				result=result*10+temp;
		}
	
	if (flag){
		return -result;
	}
	else{
		return result;
		}
}


toInt(str);