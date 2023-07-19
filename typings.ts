/* eslint-disable */
export type Schema = {
  '_prisma_migrations': {
    plain: {
      'id': string;
      'checksum': string;
      'finished_at': string;
      'migration_name': string;
      'logs': string;
      'rolled_back_at': string;
      'started_at': string;
      'applied_steps_count': number;
    };
    nested: {};
    flat: {};
  };
  'Attachment': {
    plain: {
      'id': number;
      'uniqueFilename': string;
      'originalFilename': string;
      'fileSize': number;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {};
    flat: {};
  };
  'Tabela': {
    plain: {
      'id': number;
      'influencer': string;
      'username': string;
      'city': string;
      'posts': string;
      'impressions': string;
      'interactions': string;
      'clicks': string;
      'videoViews': string;
      'cpe': string;
      'ctr': string;
      'cpc': string;
      'cpv': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {};
    flat: {};
  };
  'User': {
    plain: {
      'id': number;
      'campaign': string;
      'email': string;
      'name': string;
      'password': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {};
    flat: {};
  };
};
