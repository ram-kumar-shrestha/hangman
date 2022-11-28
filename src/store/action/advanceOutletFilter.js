import api from '../../api'
import {authHeader} from '../../service'

export const getOutletOrderForAdvanceFilter =
  (date, outletId) => async dispatch => {
    // console.log(date, outletId)
    try {
      const response = await api.get(
        `/OutletOrder/GetOutletOrderForAdvanceFilter`,

        {
          params: {FilterDate: date, OutletId: outletId},
          headers: authHeader(),
        },
      )

      dispatch({
        type: 'GET_SINGLE_OUTLET_SUMMARY_DETAILS',
        payload: response.data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

export const getItemsForAdvanceFilter = date => async dispatch => {
  // console.log(date, outletId)
  try {
    const response = await api.get(
      `/Item/SumOfItemsForAdvanceFilter`,

      {
        params: {FilterDate: date},
        headers: authHeader(),
      },
    )

    dispatch({
      type: 'GET_ITEMS_SUMMARY_DETAILS',
      payload: response.data,
    })
  } catch (error) {
    throw new Error(error)
  }
}
