import {Meteor} from 'meteor/meteor';
import expect from 'expect';


import {validateNewUser} from './users';


if (Meteor.isServer){
    describe('Users', function(){
 
        it("should allow valid email addres",function(){
            const testUser = {
                emails: [
                    {
                        address: 'mail@mail.bg'
                    }
                ]
            };
            const res = validateNewUser(testUser);
    
            expect(res).toBe(true);
        });
        it("should reject invalid email", function(){

            const testUser = {
                emails: [
                    {
                        address: 'https://mail@mail.bg'
                    }
                ]
            };

            expect(function ()  {
                validateNewUser(testUser);
            }).toThrow()
        });
        
    })
}


// const add = (a,b) =>{
//     if(typeof b !== "number"){
//         return a + a;
//     }
//     return a + b;
// }

// const square = (a)=>a * a;


// describe('add', function(){
//     it ('should add two numbers', function(){
//         const res = add(11,9);
    
//         expect(res).toBe(20);
//     })
    
//     it("should double a signle number", function(){
//         const res = add(44);
        
//         expect(res).toBe(88)
//     })
// })

// describe('square', function(){
//     it("showld square the number",function(){
//         const res = square(10);

//         expect(res).toBe(100)
//     })
//  })