import React from 'react';
import Completions from './Completions'
import Immutable from 'immutable'
import Data from './Data'
import csp from 'js-csp'

export default class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			opts:Immutable.List([])
		};
	}

	render() {

    const changeFunction = (e) => {

      var text = e.target.value

      if(text && text.length>3){

        var chan = Data.go('searchStock')
        var me = this;
        
        csp.go(function*(){

          yield csp.put(chan,text)
          while(!chan.closed){

            var msg = yield csp.take(chan)

            if(msg.constructor === Array){
                me.setState({opts:Immutable.List(msg)})
            }
          }
        })
      }
    };
    
    const selectFunction = (item) => {
      console.log("Selected "+item.description)
    };

		return <div>
			<input ref="searchText" onChange={changeFunction}></input>
			<Completions ref="completions" selectFunction={selectFunction} items={this.state.opts}/>
		</div>
	}


}
