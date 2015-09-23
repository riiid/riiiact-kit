exports.REQUEST_POSTS = 'REQUEST_POSTS'
exports.RECEIVE_POSTS = 'RECEIVE_POSTS'

requestPosts = -> type: REQUEST_POSTS

receivePosts = -> type: RECEIVE_POSTS

# async action
exports.fetchPosts = -> (dispatch) -> dispatch receivePosts()
