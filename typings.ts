/* eslint-disable */
export type Schema = {
  'Category': {
    plain: {
      'id': number;
      'name': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {};
    flat: {};
  };
  'Product': {
    plain: {
      'id': number;
      'name': string;
      'price': number;
      'categoryId': number;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'category': Schema['Category']['plain'] & Schema['Category']['nested'];
    };
    flat: {
      'category:id': number;
      'category:name': string;
      'category:createdAt': string;
      'category:updatedAt': string;
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
};
