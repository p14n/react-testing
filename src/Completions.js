import React from 'react';

export default class Completions extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
   
		return <ul>{this.props.items.map(item =>
			<li onClick={ (e) => { this.props.selectFunction(item) } }
       key={item.id}>{item.text}</li>
		)}</ul>

	}

}
