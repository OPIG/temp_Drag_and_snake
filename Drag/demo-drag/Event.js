class Event{

	constructor(){
		this.handlers={}
	}
	
	on(type,handler){
		if(!this.handlers[type]){
			this.handlers[type]=[]
		}
		
		if(!this.handlers[type].includes(handler)){
			this.handlers[type].push(handler);
			//
		}
	}
	
	off(type,handler){
		if(this.handlers[type]){
			if(handler === undefined){
				this.handlers[type]=[]
			}else{
				this.handlers[type]=this.handlers[type].filter(f=>f!=handler);
			}
		}
	}
}

