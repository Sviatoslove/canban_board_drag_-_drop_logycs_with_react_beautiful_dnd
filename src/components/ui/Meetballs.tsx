import { Flex } from "@chakra-ui/react";
import CircleIcon from "../common/CircleIcon";

const Meetballs = () => {
  return ( 
    <Flex>
      <CircleIcon boxSize={8}/>
      <CircleIcon boxSize={8}/>
      <CircleIcon boxSize={8}/>
    </Flex>
   );
}
 
export default Meetballs;