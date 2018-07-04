import {ADD_NOTE, CHANGE_NOTE, DELETE_NOTE} from '../actions/note';

const initialState = {
  notes: [
      {id: 1, title: 'Groceries', content: 'warzywka i inne', date: '7/5/2018 2:00 am'},
      {id: 2, title: 'Algebra - wyzsza', content: 'postac macierzowa bramki CNOT', date: '7/5/2018 2:00 am'},
      {id: 3, title: 'MWIP - kwantowe swiry', content: 'bramki pauliego', date: '7/5/2018 2:00 am'}
  ]
};

export default function nav(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE:
            let note = action.payload;
            note.id = state.notes[state.notes.length-1].id + 1;
            state.notes.push(note);
            return state;
        case CHANGE_NOTE:
            state.notes = state.notes.map(function(item) { return item.id == action.payload.id ? action.payload : item; });
            return state;
        case DELETE_NOTE:
            state.notes = state.notes.filter(item => item !== action.payload);
            return state;
        default:
            return state;
    }
}