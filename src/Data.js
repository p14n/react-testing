import Immutable from 'immutable'
import csp from 'js-csp'

class Data {
	constructor() {
		super();

 		this.state = {
			opts:Immutable.List([])
		};

		this.activity = Immutable.Map(
			{selected:{stock:[]}}
		)
		this.data = Immutable.Map(
			{stock:[]}
		)
	}
}

class Functions {
  constructor(data){
    this.functions = {
      selectStock:(chan)=>{
        csp.go(function*(){
          var item = yield csp.take(chan)          
          yield chan.put({msg:"ack"})
          yield chan.put({id:item.id,text:"Stock "+item.id})
        })
      },
      searchStock:(chan)=>{
        csp.go(function*(){
          var text = yield csp.take(chan)
          var count = 10 - text.length
          var msg = []
          for(var i=0;i<count;i+=1) msg.push({id:i,text:"Stock "+i});

          yield csp.put(chan,msg)
        })
      }
    }
  }
}

class DataAccess {

  constructor(){
    this.underTest = false
    this.get = new Data()
    this.functions = new Functions(this.data)
    this.testChan = null
  }
  go(name){
    var chan = csp.chan()
    if(this.underTest){
      this.testChan = chan
    } else {
      var func = this.functions.functions[name];
      func(chan)
    }
    return chan
  }
  testCall(chan){
    this.testChan = chan
  }
}

export default new DataAccess()


/*  selectStock(id){
    var chan = csp.chan()
    csp.go(function*(){
      yield chan.put({msg:"ack"})
      yield chan.put({id:id,text:"Stock "+id})
    })
    return chan;
  }
  searchStock(text){
    var chan = csp.chan()
    var count = 10 - text.length
    csp.go(function*(){
      var msg = []
      for(var i=0;i<count;i+=1) msg.push({id:i,text:"Stock "+i});
      yield csp.put(chan,msg)
    })
    return chan;
  }*/
