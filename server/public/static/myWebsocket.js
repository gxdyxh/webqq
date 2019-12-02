function mWsk(){
	this.handles={},

	this.socket = null;
	this.conn=(ws)=>{
		if (window.WebSocket){
			this.socket =  new WebSocket(ws);
		} 
		if (window.MozWebSocket){
			this.socket =  new MozWebSocket(ws);		
        }
        
        if(null===this.socket){
            return false;
        }


        this.socket.onopen = () =>{
            console.log('连接打开');
            this.fire('open');
        }

        this.socket.onmessage = (evt)=>{ 
           console.log('on server:',evt.data)
           let data = JSON.parse(evt.data);
           this.fire(data.type,data.data);      
        };
                
        this.socket.onclose = ()=>{ 
            this.fire('close');
        };

	},
	
	
	// 通过on接口监听事件eventName
    // 如果事件eventName被触发，则执行callback回调函数
    this.on = (eventName, callback) => {
        //你的代码
        if(!this.handles){
            //this.handles={};
            Object.defineProperty(this, "handles", {
                value: {},
                enumerable: false,
                configurable: true,
                writable: true
            })
        }
       
       if(!this.handles[eventName]){
            this.handles[eventName]=[];
       }
       this.handles[eventName].push(callback);
    },
    // 触发事件 eventName
    this.fire = (...arguments) => {
       if(this.handles[arguments[0]]){
           for(var i=0;i<this.handles[arguments[0]].length;i++){
               this.handles[arguments[0]][i](arguments[1]);
           }
       }
	}
	this.emit = (...arguments) => {
		let msg = {};
		msg.type = arguments[0];
        msg.data = arguments[1] || {};
        console.log('to server:',JSON.stringify(msg))
		this.socket.send(JSON.stringify(msg));
	}


	
	
}