import { useEffect } from 'react';
import { loadColumns, selectColumns, selectDataLoaded, selectIsLoading } from '../../../store/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/createStore';
import SkeletonKanbanBoard from '../../common/SkeletonKanbanBoard';

interface IAppLoaderProps {
  children: React.ReactNode
}

const AppLoader = ({ children }:IAppLoaderProps) => {
  const dispatch = useAppDispatch();
  const dataLoaded = useAppSelector(selectDataLoaded());
  const loadingStatus = useAppSelector(selectIsLoading());

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(loadColumns())
    }
  }, []);

  if (loadingStatus) {
    return <SkeletonKanbanBoard />;
  }

  return <>{children}</>;
};

export default AppLoader;
