const initialState = {
    color_options : [],
    pixels : [],
    image_size : [], 
    button_styles : [],
    score : 0, 
    percentage : 0,
    chosen_place : 0
  }
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case 'ADD_VIDEO':
    //     return({
    //       ...state,
    //       view: action.view,
    //       updatedTitle: ''
    //     })

      default:
        return (state)
    }
  }
  
  export default rootReducer
  