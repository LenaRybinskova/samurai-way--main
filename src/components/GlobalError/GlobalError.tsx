import React, {useEffect} from 'react';
import {Toaster, toast} from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {setAppError} from '../../redux/app-reducer';


export const GlobalError = () => {

    const errorMessage = useSelector<AppRootSTateType, null | string>(state => state.app.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(setAppError(null))//зануляем сообщение
        }
    }, [errorMessage])

    return (
        <Toaster
            position="top-center"
            reverseOrder={false}

        />
    )
}
export default GlobalError;