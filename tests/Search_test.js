import {expect} from 'chai';
//import Q from 'q';
import React from 'react/addons';
import Search from '../src/Search';

var TestUtils = React.addons.TestUtils;

describe('Search', () => {
	it('should load', () => {

		const search = React.addons.TestUtils.renderIntoDocument(
			React.createElement(Search,null)
		);

	    var lis = TestUtils.scryRenderedDOMComponentsWithTag(search,"li")
    	expect(lis.length).to.equal(0)


	});
	it('should search on 4th input character', () => {

		const search = React.addons.TestUtils.renderIntoDocument(
			React.createElement(Search,null)
		);


	    var input = TestUtils.findRenderedDOMComponentWithTag(search,"input")

	    TestUtils.Simulate.change(input, {target: {value: 'xxx'}});


	});

});

