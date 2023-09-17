import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMainMutation } from "../../../../hooks/main";
import { useInstance } from "../../InstanceProvider";

const Mods: React.FC = () => {
  const instance = useInstance();
  const fetchMods = useMainMutation("fetchInstanceMods");

  useEffect(() => {
    fetchMods.mutate(instance.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance.path]);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Mod</Th>
            <Th>Version</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {instance.mods.map((mod) => (
            <Tr key={mod.fileName}>
              <Th>{mod.title || mod.fileName}</Th>
              <Th>{mod.version}</Th>
              <Th></Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Mods;
