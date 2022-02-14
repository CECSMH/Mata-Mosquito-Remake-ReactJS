function countReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + action.value };

        case 'decrement':
            return { count: state.count - action.value };

        case 'reset':
            return { count: action.value ? action.value : 0 };

        default:
            return;
    };
};


function barReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { bar: state.bar + action.value };

        case 'decrement':
            return { bar: state.bar - action.value };

        case 'reset':
            return { bar: 0 };

        default:
            return;
    };
};


function comboReducer(state, action){
    if(action.type === 'increment'){
        let arr = [...state.seck, action.value];
        if(arr.length > 3) arr.shift();
        
        return {seck: arr};  
    };
    if(action.type === 'reset'){
        return {seck: []}
    };
}



export { barReducer, countReducer, comboReducer }