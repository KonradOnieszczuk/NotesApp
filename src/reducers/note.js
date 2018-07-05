import {ADD_NOTE, CHANGE_NOTE, DELETE_NOTE} from '../actions/note';

const colors = ['accent-2', 'neutral-1', 'neutral-1-a', 'neutral-2', 'neutral-2-a', 'neutral-3', 'neutral-3-a', 'neutral-4', 'neutral-4a', 'grey-1', 'grey-2', 'grey-3-a'];
const colorsTaken = ['accent-1', 'brand'];

const initialState = {
  notes: [
      {id: 1, title: 'Groceries', category:'Everyday', content: 'warzywka i inne', date: '7/5/2018 2:00 am', color:'accent-1'},
      {id: 2, title: 'Algebra - wyzsza', category:'Math stuff', content: 'postac macierzowa bramki CNOT', date: '7/5/2018 2:00 am', color:'brand'},
      {id: 3, title: 'MWIP - kwantowe swiry', category: 'Math stuff', content: 'bramki pauliego', date: '7/5/2018 2:00 am', color:'brand'}
  ]
};

export default function nav(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE:
            let note = action.payload;
            note.id = state.notes[state.notes.length-1].id + 1;
            for (let i = 0; i < state.notes.length; i++) {
                if (state.notes[i].category == note.category) {
                    note.color = state.notes[i].color;
                    break;
                }
            }
            if (note.color == '') {
                let seed = Math.floor(Math.random() * colors.length);
                let newColor = colors[seed];
                colors.splice(seed, 1);
                colorsTaken.push(newColor);
                note.color = newColor;
            }
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