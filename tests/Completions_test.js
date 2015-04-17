import setup from './setup.js'
import Completions from '../src/Completions';
import React from 'react/addons';
import {expect} from 'chai'

var TestUtils = React.addons.TestUtils;

describe('Completions', () => {
	it('should load', () => {

		const comp = React.addons.TestUtils.renderIntoDocument(
			React.createElement(Completions,
				{ items:[{id:1,text:"hello"}]})
		);

	    var lis = TestUtils.scryRenderedDOMComponentsWithTag(comp,"li")
    	expect(lis.length).to.equal(1)
    	expect(lis[0].getDOMNode().textContent).to.equal("hello")

	});
});
