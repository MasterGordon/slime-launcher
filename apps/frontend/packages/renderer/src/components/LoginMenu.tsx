import {
  Button,
  Center,
  chakra,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {MdExpandMore, MdManageAccounts} from 'react-icons/md';

const LoginMenu = () => {
  return (
    <Menu>
      <MenuButton
        width="100%"
        leftIcon={
          <chakra.img
            marginRight="1"
            src={
              'https://visage.surgeplay.com/face/32/' +
              (selectedUser ? selectedUser.uuid : 'X-Steve')
            }
          />
        }
        as={Button}
        rightIcon={<Icon as={MdExpandMore} />}
      >
        <Flex>{selectedUser ? selectedUser.name : 'Not loggedin'}</Flex>
      </MenuButton>
      <MenuList>
        {users.map((user, id) => (
          <MenuItem
            key={user.uuid + id}
            onClick={() => api.auth.selectUser({id})}
          >
            <chakra.img
              marginRight="1"
              src={'https://visage.surgeplay.com/face/32/' + (user ? user.uuid : 'X-Steve')}
            />
            {user.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => console.log('DUMMY')}>
          <Center
            width="32px"
            marginRight="1"
          >
            <Icon
              as={MdManageAccounts}
              size="32px"
            />
          </Center>
          {'Manage Accounts'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
