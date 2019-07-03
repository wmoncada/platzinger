import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { convertToParamMap } from '@angular/router';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createConversation(conversation){
    return this.angularFireDatabase.object('conversations/' + conversation.uid + '/' + convertActionBinding.timestamp).set(conversation);
  }

  getConvertation(uid) {
    return this.angularFireDatabase.list('convertaions/' + uid);
  }
}
