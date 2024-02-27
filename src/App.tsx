import { ChakraProvider } from '@chakra-ui/react';
import { FormsProvider } from './app/context/useForms';
import KanbanBoard from './app/components/ui/KanbanBoard';
import FormsLayout from './app/layouts/FormsLayout';
import { useAppSelector } from './app/store/createStore';
import { selectColumns } from './app/store/columnsSlice';
import { theme } from './app/chakra/initialThemes';
console.log('theme:', theme)

const App = () => {
  const storeColumns = useAppSelector(selectColumns());
  const userColumns = Object.values(storeColumns);
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'bottom-right' } }}
      theme={theme}
    >
      <FormsProvider>
        <KanbanBoard userColumns={userColumns} />
        <FormsLayout/>
      </FormsProvider>
    </ChakraProvider>
  );
};

export default App;
