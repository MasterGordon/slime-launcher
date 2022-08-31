import {Box, Button, Input, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useMainMutation, useMainQuery} from './hooks/main';

export const Acc = () => {
  const {data: accounts} = useMainQuery('getAccounts', undefined);
  const addAccount = useMainMutation('addAccount', qc => {
    qc.invalidateQueries(['getAccounts']);
  });
  const removeAccount = useMainMutation('removeAccount', qc => {
    qc.invalidateQueries(['getAccounts']);
  });
  const [name, setName] = useState('');

  return (
    <Box>
      <VStack>
        {(accounts || []).map(account => (
          <Box key={account.uuid}>
            {account.name} ({account.uuid})
            <Button onClick={() => removeAccount.mutate(account.uuid)}>Remove</Button>
          </Box>
        ))}
        <form
          onSubmit={async e => {
            e.preventDefault();
            addAccount.mutate({
              name,
              uuid: Math.random().toString(36).substring(7),
              access_token: 'abv',
            });
          }}
        >
          <Input
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </VStack>
    </Box>
  );
};
