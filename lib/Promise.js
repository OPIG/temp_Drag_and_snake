(function(window){
	function Promise(executor){
		this.status = 'pending'
		this.data = undefined
		this.callbacks = []
		
		function resolve (value){
			if(this.status !== 'pending'){
				return
			}
			
			this.status = 'resolved'
			
			this.data = reason
			
			if(this.callbacks.length>0){
				setTimeout(()=>{
					this.callbacks.forEach(callbackObj =>{
						callbackObj.onResolved(value)
					})
				})
			}
		}
		
		function reject(reason){
			if(this.status !== 'pending'){
				return
			}
			
			this.status = 'rejected'
			
			this.data = reason
			
			if(this.callbacks.length>0){
				setTimeout(()=>{
					this.callbacks.forEach(callbackObj =>{
						callbackObj.onRejected(reason)
					})
				})
			}
		}
		
		
		try{
			executor(resolve,reject)
		}catch(error){
			reject(error)
		}
	}
	
	Promise.prototype.then = function(onResolved,onRejected){}
	
	Promise.prototype.catch = function(onRejected){}
	
	Promise.resolve = function(value){
		
	}
	
	Promise.reject = function(reason){}
	
	Promise.all= function(promises){}
	
	Promise.race = function(promises){}
	
	
})(window)