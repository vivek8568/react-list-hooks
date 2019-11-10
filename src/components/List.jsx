import React, {Children, Fragment, cloneElement, useContext, isValidElement, useState, createContext, useEffect} from "react";
import {MemoizedComponent} from "./MemoizedComponent";

export const ListContext = createContext({list: [], updateList: null});

export const List = MemoizedComponent(({children, customClass, clearList, disableClass, onListUpdate, initialState}) => {
    const [list, setList] = useState(initialState ? initialState : []);
    const updateList = (id, skipAdd = false) => {
        let i = list.indexOf(id);
        if(i !== -1){
            setList([...list.slice(0,i), ...list.slice(i+1)])
        }else if(!skipAdd){
            setList([...list, id]);
        }
    };

    useEffect(() => {
        if(onListUpdate && {}.toString.call(onListUpdate) === '[object Function]'){
            onListUpdate(list)
        }
    }, [list]);

    useEffect(() => {
        if(clearList) {
            setList([]);
        }
    }, [clearList]);

    return (
        <div className={`${customClass} ${disableClass}`}>
            <ListContext.Provider value={{list, updateList}}>
                {Children.map(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        return (
                            <Fragment key={index}>{child}</Fragment>
                        )
                    }
                })}
            </ListContext.Provider>
        </div>
    )
}, 'List');

export const ListItem = MemoizedComponent(({children, id, disableClass}) => {
    const {list} = useContext(ListContext);
    const isSelected = list.indexOf(id) !== -1;

    return (
        <Fragment>
            {isValidElement(children) ? cloneElement(children, {isSelected, id, disableClass}) : null}
        </Fragment>
    )
}, 'ListItem');

export const ToggleSubList = MemoizedComponent(({children, whenActive, disableClass}) => {
    const {list: parentList} = useContext(ListContext);
    const [disableList, setDisableList] = useState(true);

    useEffect(() => {
        setDisableList(parentList.indexOf(whenActive) === -1)
    }, [parentList]);

    return (
        <Fragment>
            {isValidElement(children) ? cloneElement(children, {disableClass: disableList ? disableClass : '', clearList: disableList}) : null}
        </Fragment>
    )
}, 'ToggleSubList');

export const ToggleListItem = MemoizedComponent(({children, id, whenActive, disableClass}) => {
    const {list, updateList} = useContext(ListContext);
    const [disableItem, setDisableItem] = useState(false);

    useEffect(() => {
        let isDisabled = whenActive && list.indexOf(whenActive) === -1;
        setDisableItem(isDisabled);
        if(isDisabled){
            updateList(id, true);
        }
    }, [list]);

    return (
        <Fragment>
            {isValidElement(children) ? cloneElement(children, {disableClass: disableItem ? disableClass : ''}) : null}
        </Fragment>
    )
}, 'ToggleListItem');