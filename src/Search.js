import React from 'react';
import Completions from './Completions'

export default class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			opts:[]
		};
	}

	render() {

		const changeFunction = (text) => {
			this.setState({opts:[
				{id:1,description:"aaa"}]})

		};

		return <div>
				<input ref="searchText" onChange={changeFunction}></input>
				<Completions items={this.state.opts}/>
			   </div>
	}


}
