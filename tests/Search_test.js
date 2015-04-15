import {expect} from 'chai';
//import Q from 'q';
import React from 'react/addons';
import Search from '../src/Search';
//import utils from './utils'
import Data from '../src/Data'
import csp from 'js-csp'
import csptest from './csp.test-helpers'

var TestUtils = React.addons.TestUtils;
var itcsp=csptest.it;
    

describe('Search', () => {
	it('should load', () => {

		const search = React.addons.TestUtils.renderIntoDocument(
			React.createElement(Search,null)
		);

	    var lis = TestUtils.scryRenderedDOMComponentsWithTag(search,"li")
    	expect(lis.length).to.equal(0)


	});
	it('should not search on 3rd input character', () => {

		const search = React.addons.TestUtils.renderIntoDocument(
			React.createElement(Search,null)
		);

	    var input = TestUtils.findRenderedDOMComponentWithTag(search,"input")

	    TestUtils.Simulate.change(input, {target: {value: 'xxx'}});
	    var lis = TestUtils.scryRenderedDOMComponentsWithTag(search,"li")
    	expect(lis.length).to.equal(0)

	});
  
	itcsp('should search on 4th input character', function*() {

    Data.underTest = true;
    
		const search = React.addons.TestUtils.renderIntoDocument(
			React.createElement(Search,null)
		);
    var input = TestUtils.findRenderedDOMComponentWithTag(search,"input")


    TestUtils.Simulate.change(input, {target: {value: 'xxxx'}});

    
    var msg = (yield csp.take(Data.testChan));
    yield csp.put(Data.testChan,[
      {id:1,text:"Stock a"},
      {id:2,text:"Stock b"},
      {id:3,text:"Stock c"}      
    ])

    var lis = TestUtils.scryRenderedDOMComponentsWithTag(search,"li")

    expect(lis.length).to.equal(3)

	});

});

