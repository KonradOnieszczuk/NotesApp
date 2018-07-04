export const ADD_NOTE = 'ADD_NOTE';
export const CHANGE_NOTE = 'CHANGE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export function addNote(note){
    return{
        type: ADD_NOTE,
        payload: note
    };
}

export function changeNote(note){
    return{
        type: CHANGE_NOTE,
        payload: note
    };
}

export function deleteNote(note){
    return {
        type: DELETE_NOTE,
        payload: note
    }
}