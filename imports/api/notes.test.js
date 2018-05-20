import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if (Meteor.isServer){
    describe("notes", function(){
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'my body for note',
            updatedAt:0,
            userId: 'testUserId1'
        };
        
        beforeEach(function (){
            Notes.remove({});
            Notes.insert(noteOne)
        })

        it("should insert new note", function(){
            const userId = "testid";
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
            
            expect(Notes.findOne({_id, userId})).toBeTruthy();
               
        });
        it("should not insert note if not authentication",function(){
            expect(()=>{
                const _id = Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        })

        it("should remove note",function(){
            // Remove the testNoteId1 from db
            Meteor.server.method_handlers['notes.remove'].apply({ userId:noteOne.userId}, [noteOne._id] );

            expect (Notes.findOne({_id: noteOne.userId})).toBeFalsy();
        })
        it("should not remove if unauthenticated",function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne.userId] );
            }).toThrow();
        })

        it("it should not removed note if invalid _id", function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId})
            }).toThrow();
        });


        it("should update note", function(){
            const title = "Updated title";

            Meteor.server.method_handlers['notes.update'].apply({
                userId:noteOne.userId
            }, [
                noteOne._id,
                { title }
            ]);

            const note = Notes.findOne(noteOne._id);
            expect(note.updatedAt).toBeGreaterThan(0);
            expect({title: note.title, body:note.body}).toEqual({
                title,
                body: noteOne.body      
                  })
        });
       
        it("should throw error if extra updates",function(){
            expect(()=>{
                Meteor.server.method_handlers['notes.update'].apply({
                    userId:noteOne.userId
                },
                [
                    noteOne._id,
                    {title:"new title",message:"HELLO"}
                ]
            )
            }).toThrow();
        })

        
    });
}