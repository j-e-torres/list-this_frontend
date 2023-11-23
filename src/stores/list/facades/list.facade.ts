import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectList,
  selectListError,
  selectListLoading,
  selectLists,
  selectSortedTasks,
  selectListUsers,
} from '../selectors/list.selectors';
import { actions } from '../slice/list.slice';
import { ListTypes, ErrorTypes, TaskTypes, UserTypes } from '../../../types';

export const ListFacadeService = () => {
  const dispatch = useDispatch();

  const list: ListTypes.List | null = useSelector(selectList);
  const listError: ErrorTypes.AllErrors | null = useSelector(selectListError);
  const listLoading: boolean = useSelector(selectListLoading);
  const lists: ListTypes.List[] | null = useSelector(selectLists);
  const sortedTasks: TaskTypes.Task[] | null | undefined =
    useSelector(selectSortedTasks);
  const listUsers: UserTypes.User[] | null = useSelector(selectListUsers);

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

  const fetchList = (payload: ListTypes.FetchListPayload) => {
    dispatch(actions.fetchList(payload));
  };

  const fetchListUsers = (payload: ListTypes.FetchListPayload) => {
    dispatch(actions.fetchListUsers(payload));
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
    fetchList,
    sortedTasks,
    fetchListUsers,
    listUsers,
  };
};
