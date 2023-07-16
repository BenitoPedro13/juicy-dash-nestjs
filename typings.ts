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
  'Campaign': {
    plain: {
      'id': number;
      'influencerId': number;
      'userId': number;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'influencer': Schema['Influencer']['plain'] & Schema['Influencer']['nested'];
      'user': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'influencer:id': number;
      'influencer:name': string;
      'influencer:username': string;
      'influencer:city': string;
      'user:id': number;
      'user:username': string;
    };
  };
  'Influencer': {
    plain: {
      'id': number;
      'name': string;
      'username': string;
      'city': string;
    };
    nested: {};
    flat: {};
  };
  'Metric': {
    plain: {
      'id': number;
      'posts': number;
      'impressions': number;
      'interactions': number;
      'clicks': number;
      'videoViews': number;
      'cpe': string;
      'ctr': string;
      'cpc': string;
      'cpv': string;
      'campaignId': number;
      'influencerId': number;
    };
    nested: {
      'campaign': Schema['Campaign']['plain'] & Schema['Campaign']['nested'];
      'influencer': Schema['Influencer']['plain'] & Schema['Influencer']['nested'];
    };
    flat: {
      'campaign:id': number;
      'campaign:influencerId': number;
      'campaign:userId': number;
      'campaign:createdAt': string;
      'campaign:updatedAt': string;
      'campaign:influencer:id': number;
      'campaign:influencer:name': string;
      'campaign:influencer:username': string;
      'campaign:influencer:city': string;
      'campaign:user:id': number;
      'campaign:user:username': string;
      'influencer:id': number;
      'influencer:name': string;
      'influencer:username': string;
      'influencer:city': string;
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
      'username': string;
    };
    nested: {};
    flat: {};
  };
};
