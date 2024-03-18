import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { FormsProvider } from './app/context/useForms';
import KanbanBoard from './app/components/ui/KanbanBoard';
import FormsLayout from './app/layouts/FormsLayout';
import { useAppSelector } from './app/store/createStore';
import { selectColumns } from './app/store/columnsSlice';
import { theme } from './app/chakra/initialThemes';
import localStorageService from './app/services/localStorage.service';
import AppLoader from './app/components/ui/hoc/AppLoader';

const App = () => {
  const storeColumns = useAppSelector(selectColumns());
  const userColumns = Object.values(storeColumns);

  useEffect(() => {
    if (userColumns.length && !localStorageService.getColumns()) localStorageService.setColumns(storeColumns);
  }, [storeColumns]);

  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'bottom-right' } }}
      theme={theme}
    >
      <AppLoader>
        <FormsProvider>
          <KanbanBoard/>
          <FormsLayout />
        </FormsProvider>
      </AppLoader>
    </ChakraProvider>
  );
};

export default App;
