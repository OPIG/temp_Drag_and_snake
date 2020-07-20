class Drag extends Event{
	constructor(el){
		super();
		this.el = el;
		this.startOffset={};
		this.startPoint={};
	}
	this.move(e){
		var newPoint={
			x:e.clientX，
			y:e.clientY
		}
		
		var newOffset ={
			x: startOffset.x+(newPoint.x - startPoit.x),
			y: startOffset.y+(newPoint.y-startPoint.y)
		}
		el.style.left = newOffset.x+"px";
		el.style.top = newOffset.y+"px"
		
		this.on("dragOn",el);
	}
	
}