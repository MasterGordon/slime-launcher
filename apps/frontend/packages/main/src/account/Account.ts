export interface Account {
  access_token: string;
  client_token?: string;
  uuid: string;
  name?: string;
  meta?: {
    type: 'mojang' | 'msa' | 'legacy';
    xuid?: string;
    demo?: boolean;
  };
  user_properties?: Partial<any>;
}
