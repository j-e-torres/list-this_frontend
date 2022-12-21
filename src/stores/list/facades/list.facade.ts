import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectList,
  selectListError,
  selectListLoading,
  selectLists,
} from '../selectors/list.selectors';
import { actions } from '../slice/list.slice';
import { ListTypes, ErrorTypes } from '../../../types';

export const ListFacadeService = () => {
  const dispatch = useDispatch();

  const list: ListTypes.List | null = useSelector(selectList);
  const listError: ErrorTypes.AllErrors | null = useSelector(selectListError);
  const listLoading: boolean = useSelector(selectListLoading);
  const lists: ListTypes.List[] | null = useSelector(selectLists);

  const createListDispatch = (payload: ListTypes.CreateListPayload): void => {
    dispatch(actions.createList(payload));
  };

  const clearList = (): void => {
    dispatch(actions.clearList(null));
  };

  const fetchLists = (fetchListsPayload: ListTypes.FetchListsPayload) => {
    dispatch(actions.fetchLists(fetchListsPayload));
  };

  const updateList = (updateListPayload: ListTypes.UpdateListPayload) => {
    dispatch(actions.updateList(updateListPayload));
  };

  return {
    createListDispatch,
    clearList,
    fetchLists,
    updateList,
    list,
    listError,
    listLoading,
    lists,
  };
};
