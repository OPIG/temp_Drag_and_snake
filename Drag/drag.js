class Drag extends Event{
	constructor(el){
		super();
		this.el = el;
		this.startOffset = {};
		this.startPoint = {};
		
		let move = (e) =>{
			this.move(e);
			//this.el.style.background="red";
		}
		document.addEventListener("mousedown", (e) => {
			this.start(e);
			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", (e) => {
				document.removeEventListener("mousemove", move);
				this.el.style.background="green";
			})
		});
	}


start(e){
	let {el} = this;
	this.startOffset = {
		x:el.offsetLeft,
		y:el.offsetTop
	}
	
	this.startPoint = {
		x:e.clientX,
		y:e.clientY
	}
	//this.trigger("dragStart",el)
};

move(e){
	let {el,startOffset,startPoint} = this;
	let newPoint = {
		x:e.clientX,
		y:e.clientY
	}
	let newOffset = {
		x: startOffset.x + (newPoint.x - startPoint.x),
		y: startOffset.y + (newPoint.y - startPoint.y)
	}
	el.style.left = newOffset.x + "px";
	el.style.top = newOffset.y + "px";
	
	this.trigger("dragOnce",el);
}
}