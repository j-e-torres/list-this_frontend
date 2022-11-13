import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectList,
  selectListError,
  selectListLoading,
} from '../selectors/list.selectors';
import { actions } from '../slice/list.slice';
import { ListTypes, ErrorTypes } from '../../../types';

export const ListFacadeService = () => {
  const dispatch = useDispatch();

  const list: ListTypes.List | null = useSelector(selectList);
  const listError: ErrorTypes.AllErrors | null = useSelector(selectListError);
  const listLoading: boolean = useSelector(selectListLoading);

  const createListDispatch = (payload: ListTypes.CreateListPayload): void => {
    dispatch(actions.createList(payload));
  };

  const clearList = (): void => {
    dispatch(actions.clearList(null));
  };

  return { createListDispatch, clearList, list, listError, listLoading };
};
