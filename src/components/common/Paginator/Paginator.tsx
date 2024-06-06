import React from 'react';
import styles from '../Paginator/Paginator.module.css'


type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator = (props: PaginatorPropsType) => {


    //высчит кол-во страниц для пагинации
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map(p =>
                <span key={p} className={props.currentPage === p ? styles.selectedPage : ''}
                      onClick={(event) => props.onPageChanged(p)}>{p}</span>)}
        </div>
    );
};

export default Paginator;