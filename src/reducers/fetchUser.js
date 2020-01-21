export default (previousState= [], action) => {
    switch (action.type){
        case 'GET_USER': return [...previousState, action.payload];
        default: return previousState;  
    }
}
