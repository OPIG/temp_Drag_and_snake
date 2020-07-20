(function(){
	var World = {
		Food:{
			x:null,
			y:null,
			generate:function(){
				
			}
		},
		Size:{
			width: 100,
			height: 100
		}
	}
	
	var Center = {
		x: 9,
		y:9
	};
	
	var Direction = {
		up:1,
		right:2,
		left:-2,
		down:-1
	}
	
	function gameOver(length){
		alert("Your Score:"+length);
	}
	
	function Snake(){
		var self = this;
		
		function die(){
			gameOver(self.body.part.length);//TODO
		}
		
		function Head(){
			this.x = Center.x;
			this.y = Center.y;
			this.direction = null;
			
			this.get=function(){
				return {
					x:this.x,
					y:this.y
				}
			}
			
			this.move = function(direction){
				if(!direction){
					return true;
				}
				
				var head = this.get();
				
				this.direction = direction = direction+this.direction?direction:this.direction;
				
				switch(direction){
					case Direction.up:
						this.y--;
						break;
					case Direction.right:
						this.x++;
						break;
					case Direction.left:
						this.x--;
						break;
					case Direction.down:
						this.y++;
						break;
				}
				
				//todo
				if(eat(this.x,this.y)){
					self.body.increase(head);//todo
					World.Food.generate(self);
				}else if(hitCheck(this.x,this.y)||eatSelfCheck(this.x,this.y)){
					die();
					return false;
				}else{
					self.body.move(head);
				}
			}
			
			function eat(x,y){
				return x==World.Food.x&&y=World.Food.y;
			}
			
			function hitCheck(x,y){
				return(x<0||y<0||x==World.Size.width||y==World.Size.height){
			}
			
			function eatSelfCheck(x,y){
				var part = self.body.part;
				for(var i =0; i<part.length;i++){
					if(x==part[i]&&y==part[i]){
						return true;
					}
				}
				return false;
			}
		}
		
		function Body(){
			this.part = [];
			this.move = function(head){
				if(part.length>0){
					part.pop();
					this.increase(head);
				}
			}
			
			this.increase = function(head){
				this.part.unshift(head);
			}
		}
		
		
		this.body = new Body();
		this.head = new Head();
		
	}
	
})()