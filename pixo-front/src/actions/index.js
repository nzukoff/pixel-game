import axios from 'axios';

export const doInitialFetch = (load_type, host, num_colors) => {
    return async (dispatch) => {
        const url = `${host}load/${load_type}`
        const response = await axios.get(url)
        const pixels = response.data.pixel_values
        const image_size = response.data.image_size
        // const button_styles = []
        // const score = 0
        // const percentage = 0
        // const chosen_place = 0
        dispatch(doInitialFetchSuccess(pixels, image_size))
    }
}
    
export const doInitialFetchSuccess = (pixels, image_size) => ({
    type: 'DO_INITIAL_FETCH_SUCCESS', 
    pixels, 
    image_size
})

//     axios
//         .get(url)
//         .then(response => {
//             this.setState((prevState, props) => ({
//                 pixels: response.data.pixel_values, 
//                 image_size: response.data.image_size, 
//                 button_styles : [],
//                 score: 0, 
//                 percentage: 0,
//                 chosen_place: 0
//             }))
//             this.getColorOptions(num_colors, this.props.host)
//         })
// }
