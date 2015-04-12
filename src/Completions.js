import React from 'react';

export default class Completions extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log("Render completions")
		return <ul>{this.props.items.map(item =>
			<li key={item.id}>{item.description}</li>
		)}</ul>

	}

}
