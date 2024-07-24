import React, {useState} from 'react';
import styles from '../Paginator/Paginator.module.css'
import cn from 'classnames'


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number // кол-во юзеров, кот отобр на странице за раз
    currentPage: number
    portionSize: number // кол-во страниц отобр в пагинации
    onPageChanged: (pageNumber: number) => void
}

const Paginator = (props: PaginatorPropsType) => {


    //высчит кол-во страниц для пагинации и созд массив 1 2 3 4 5 ...
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / props.portionSize) // кол-во "порций" пагинации для отображения
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1 // получ номер первого элем в "порции" пагинации
    const rightPortionPageNumber = portionNumber * props.portionSize // получ номер последнего элем в "порции" пагинации

    return (
        <div className={styles.paginationLine}>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p =>
                    <span key={p} className={cn(styles.page, {[styles.selectedPage]: props.currentPage === p})}
                          onClick={() => props.onPageChanged(p)}>{p}</span>)}
            {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>
    );
};

export default Paginator;