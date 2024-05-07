export const required = (value: any) => {
    // value  то что вводим в инпут
    if (value) {
        return undefined
    }
    return 'field is required'
}

// по аналогии с ThunkCreator maxLengthCreator это функ, кот возвр другую функ
export const maxLengthCreator = (maxLength: number) => (value: any) => {
    if (value.length > maxLength) {
        return `max length is ${maxLength} symbols`
    }
    return undefined
}

