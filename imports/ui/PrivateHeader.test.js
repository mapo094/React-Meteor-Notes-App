import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy } from 'expect';
import Enzyme,{ mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';


import { PrivateHeader } from './PrivateHeader';



Enzyme.configure({ adapter: new Adapter() })

if(Meteor.isClient){
    describe('PrivateHeader', function(){
        it('should set button text to logout', function(){
            const wrapper = mount( <PrivateHeader title="Test title" /> );

            const buttonText = wrapper.find('button').text()

            expect(buttonText).toBe('Logout');
        })

        it('should use title prope as h1 text', function(){
            const title = 'Test title here';
            const wrapper = mount (<PrivateHeader title={title} />)

            const rightTitle =  wrapper.find('h1').text();

            expect(rightTitle).toBe(title);
        })

        it("should call the function",function(){
            const spy = expect.createSpy();
            spy(2,3,123);
            spy('Mapo');
            expect(spy).toHaveBeenCalled('Andrew');
        })
        it('should call handleLogout on click', function(){
            const spy = expect.createSpy();
            const wrapper = mount (<PrivateHeader title="title" handleLogout={spy} />)
        })
    })
}



