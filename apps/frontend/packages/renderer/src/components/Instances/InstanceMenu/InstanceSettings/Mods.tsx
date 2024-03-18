import type { BoxProps } from "@chakra-ui/react";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td as ChakraTd,
  Th as ChakraTh,
  Thead,
  Tooltip,
} from "@chakra-ui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { filter } from "../../../../utils/filter";
import { useMainMutation } from "../../../../hooks/main";
import { useInstance } from "../../InstanceProvider";

const Td: React.FC<BoxProps> = (props) => <ChakraTd as="div" {...props} />;
const Th: React.FC<BoxProps> = (props) => <ChakraTh as="div" {...props} />;

const Mods: React.FC = () => {
  const instance = useInstance();
  const fetchMods = useMainMutation("fetchInstanceMods");
  const enableMod = useMainMutation("enableMod");
  const disableMod = useMainMutation("disableMod");
  const [keyword, setKeyword] = useState("");
  const [filteredMods, setFilteredMods] = useState(instance.mods);
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setFilteredMods(filter(instance.mods, keyword, "title", "fileName"));
    }, 200);
  }, [instance.mods, keyword]);

  useEffect(() => {
    fetchMods.mutate(instance.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance.path]);

  return (
    <>
      <Flex pos="sticky" top="0" p="4" background="gray.700" zIndex="1" gap="4">
        <Input
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button paddingX="8">Check Updates</Button>
        <Button paddingX="8">Add Mods</Button>
      </Flex>
      <TableContainer whiteSpace="normal">
        <Table as="div">
          <Thead display="grid" gridTemplateColumns="5fr 3fr 120px" as="div">
            <Th>Mod</Th>
            <Th>Version</Th>
            <Th>Actions</Th>
          </Thead>
          <Tbody display="grid" gridTemplateColumns="5fr 3fr 120px" as="div">
            {filteredMods.map((mod) => (
              <Fragment key={mod.fileName}>
                <Td display="flex" alignItems="start">
                  <Tooltip
                    label={mod.fileName}
                    shouldWrapChildren={false}
                    isOpen={mod.title ? undefined : false}
                  >
                    <>
                      <Checkbox
                        defaultChecked={mod.fileName.endsWith(".jar")}
                        marginRight="2"
                        onChange={(e) => {
                          if (e.target.checked) {
                            enableMod.mutate({
                              instancePath: instance.path,
                              fileName: mod.fileName,
                            });
                          } else {
                            disableMod.mutate({
                              instancePath: instance.path,
                              fileName: mod.fileName,
                            });
                          }
                        }}
                      ></Checkbox>
                      {mod.title ?? mod.fileName}
                    </>
                  </Tooltip>
                </Td>
                <Td wordBreak="break-all">{mod.version}</Td>
                <Td></Td>
              </Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Mods;
