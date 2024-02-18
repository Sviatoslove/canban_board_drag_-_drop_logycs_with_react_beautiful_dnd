import { Flex } from "@chakra-ui/react";
import CircleIcon from "../common/CircleIcon";

const Meetballs = () => {
  return ( 
    <Flex>
      <CircleIcon boxSize={2} mr={'3px'}/>
      <CircleIcon boxSize={2} mr={'3px'}/>
      <CircleIcon boxSize={2}/>
    </Flex>
   );
}
 
export default Meetballs;