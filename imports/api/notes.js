import React, { Component } from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'(){
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }

        return Notes.insert({
            title: "",
            body: "",
            usedId: this.usedId,
            updateAt: moment().valueOf()
        })
    }
})