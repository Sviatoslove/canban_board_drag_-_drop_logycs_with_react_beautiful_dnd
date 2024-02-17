import { ChakraProvider } from '@chakra-ui/react'
import KanbanBoard from './components/ui/KanbanBoard';

const App = () => {
  return (
    <ChakraProvider>
      <KanbanBoard />
    </ChakraProvider>
  );
};

export default App;
