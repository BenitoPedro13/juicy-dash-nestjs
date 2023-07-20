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
  'Attachments': {
    plain: {
      'id': number;
      'uniqueFilename': string;
      'originalFilename': string;
      'fileSize': number;
      'userEmail': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'User': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'User:id': number;
      'User:email': string;
      'User:name': string;
      'User:password': string;
      'User:campaignName': string;
      'User:estimated_executed_investment': number;
      'User:total_initial_investment': number;
      'User:color': string;
      'User:createdAt': string;
      'User:updatedAt': string;
    };
  };
  'Performance': {
    plain: {
      'id': number;
      'uniqueFilename': string;
      'originalFilename': string;
      'fileSize': number;
      'userEmail': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'User': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'User:id': number;
      'User:email': string;
      'User:name': string;
      'User:password': string;
      'User:campaignName': string;
      'User:estimated_executed_investment': number;
      'User:total_initial_investment': number;
      'User:color': string;
      'User:createdAt': string;
      'User:updatedAt': string;
    };
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
      'email': string;
      'name': string;
      'password': string;
      'campaignName': string;
      'estimated_executed_investment': number;
      'total_initial_investment': number;
      'color': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {};
    flat: {};
  };
};
