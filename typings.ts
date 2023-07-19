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
      'userId': number;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'user': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'user:id': number;
      'user:email': string;
      'user:name': string;
      'user:password': string;
      'user:createdAt': string;
      'user:updatedAt': string;
      'user:Campaign:id': number;
      'user:Campaign:total_initial_investment': number;
      'user:Campaign:estimated_executed_investment': number;
      'user:Campaign:name': string;
      'user:Campaign:userId': number;
      'user:Campaign:createdAt': string;
      'user:Campaign:updatedAt': string;
    };
  };
  'Campaign': {
    plain: {
      'id': number;
      'total_initial_investment': number;
      'estimated_executed_investment': number;
      'name': string;
      'userId': number;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'user': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'user:id': number;
      'user:email': string;
      'user:name': string;
      'user:password': string;
      'user:createdAt': string;
      'user:updatedAt': string;
    };
  };
  'Performance': {
    plain: {
      'id': number;
      'uniqueFilename': string;
      'originalFilename': string;
      'fileSize': number;
      'campaignId': number;
      'userId': number;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'campaign': Schema['Campaign']['plain'] & Schema['Campaign']['nested'];
      'user': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'campaign:id': number;
      'campaign:total_initial_investment': number;
      'campaign:estimated_executed_investment': number;
      'campaign:name': string;
      'campaign:userId': number;
      'campaign:createdAt': string;
      'campaign:updatedAt': string;
      'campaign:user:id': number;
      'campaign:user:email': string;
      'campaign:user:name': string;
      'campaign:user:password': string;
      'campaign:user:createdAt': string;
      'campaign:user:updatedAt': string;
      'user:id': number;
      'user:email': string;
      'user:name': string;
      'user:password': string;
      'user:createdAt': string;
      'user:updatedAt': string;
      'user:Campaign:id': number;
      'user:Campaign:total_initial_investment': number;
      'user:Campaign:estimated_executed_investment': number;
      'user:Campaign:name': string;
      'user:Campaign:userId': number;
      'user:Campaign:createdAt': string;
      'user:Campaign:updatedAt': string;
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
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'Campaign': Schema['Campaign']['plain'] & Schema['Campaign']['nested'];
    };
    flat: {
      'Campaign:id': number;
      'Campaign:total_initial_investment': number;
      'Campaign:estimated_executed_investment': number;
      'Campaign:name': string;
      'Campaign:userId': number;
      'Campaign:createdAt': string;
      'Campaign:updatedAt': string;
    };
  };
};
