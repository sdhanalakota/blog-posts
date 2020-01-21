import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceHolder.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }
//Non Memoized function ****************************************************************************
    // export const fetchUser = (id) => async dispatch => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: 'GET_USER', payload: response.data})
// }
//Memoized version*************************************************************************
// const _fetchUser = _.memoize(async (id, dispatch)=>{
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: 'GET_USER', payload: response.data})
// })
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch)
// }

//Memoizes version 2-***********************************************


export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'GET_USER', payload: response.data})
}
export const fetchPostsAndUsers = () => async(dispatch, getState) => {
    //understand dispatch important 
    await dispatch(fetchPosts());
    // let arr= []
    // getState().posts.map(post => {if(!arr.includes(post.userId)) {arr.push(post.userId)}});
    
    
    //lodash version****************************
    // const userIds= _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach((el) => dispatch(fetchUser(el)));
    //chain method lodash***************************
    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((el)=> { dispatch(fetchUser(el)) })
    .value();
}


