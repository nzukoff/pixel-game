const initialState = {
    color_options : [],
    pixels : [],
    image_size : [], 
    button_styles : [],
    score : 0, 
    percentage : 0,
    chosen_place : 0,
    button_styles : [],
    percentage: 0
}
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DO_INITIAL_FETCH_SUCCESS':
        return({
          ...state,
          pixels: action.pixels,
          image_size: action.image_size
        })

      default:
        return (state)
    }
  }
  
  export default rootReducer
  