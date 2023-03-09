import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCompleteTaskPayload,
  selectTask,
  selectTaskError,
  selectTaskLoading,
} from '../selectors/task.selectors';
import { actions } from '../slice/task.slice';
import { ErrorTypes, TaskTypes } from '../../../types';

export const TaskFacadeService = () => {
  const dispatch = useDispatch();
  const task: TaskTypes.Task | null = useSelector(selectTask);
  const taskError: ErrorTypes.AllErrors | null = useSelector(selectTaskError);
  const taskLoading: boolean = useSelector(selectTaskLoading);
  const completeTaskPayload: TaskTypes.CompleteTaskPayload | null = useSelector(
    selectCompleteTaskPayload,
  );

  const completeTask = (payload: TaskTypes.CompleteTaskPayload) => {
    dispatch(actions.completeTask(payload));
  };

  return {
    task,
    taskError,
    taskLoading,
    completeTask,
    completeTaskPayload,
  };
};
