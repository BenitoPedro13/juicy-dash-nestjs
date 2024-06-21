/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type AttachmentsCustomizer = CollectionCustomizer<Schema, 'Attachments'>;
export type AttachmentsRecord = TPartialRow<Schema, 'Attachments'>;
export type AttachmentsConditionTree = TConditionTree<Schema, 'Attachments'>;
export type AttachmentsFilter = TPaginatedFilter<Schema, 'Attachments'>;
export type AttachmentsSortClause = TSortClause<Schema, 'Attachments'>;
export type AttachmentsAggregation = TAggregation<Schema, 'Attachments'>;

export type PerformanceCustomizer = CollectionCustomizer<Schema, 'Performance'>;
export type PerformanceRecord = TPartialRow<Schema, 'Performance'>;
export type PerformanceConditionTree = TConditionTree<Schema, 'Performance'>;
export type PerformanceFilter = TPaginatedFilter<Schema, 'Performance'>;
export type PerformanceSortClause = TSortClause<Schema, 'Performance'>;
export type PerformanceAggregation = TAggregation<Schema, 'Performance'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'User'>;
export type UserRecord = TPartialRow<Schema, 'User'>;
export type UserConditionTree = TConditionTree<Schema, 'User'>;
export type UserFilter = TPaginatedFilter<Schema, 'User'>;
export type UserSortClause = TSortClause<Schema, 'User'>;
export type UserAggregation = TAggregation<Schema, 'User'>;

export type _prismaMigrationsCustomizer = CollectionCustomizer<Schema, '_prisma_migrations'>;
export type _prismaMigrationsRecord = TPartialRow<Schema, '_prisma_migrations'>;
export type _prismaMigrationsConditionTree = TConditionTree<Schema, '_prisma_migrations'>;
export type _prismaMigrationsFilter = TPaginatedFilter<Schema, '_prisma_migrations'>;
export type _prismaMigrationsSortClause = TSortClause<Schema, '_prisma_migrations'>;
export type _prismaMigrationsAggregation = TAggregation<Schema, '_prisma_migrations'>;


export type Schema = {
  '_prisma_migrations': {
    plain: {
      'applied_steps_count': number;
      'checksum': string;
      'finished_at': string | null;
      'id': string;
      'logs': string | null;
      'migration_name': string;
      'rolled_back_at': string | null;
      'started_at': string;
    };
    nested: {};
    flat: {};
  };
  'Attachments': {
    plain: {
      'createdAt': string;
      'fileSize': number;
      'id': number;
      'originalFilename': string;
      'uniqueFilename': string;
      'updatedAt': string;
      'userEmail': string;
    };
    nested: {
      'User': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'User:campaignName': string;
      'User:color': string | null;
      'User:createdAt': string;
      'User:email': string;
      'User:estimated_executed_investment': number;
      'User:id': number;
      'User:name': string;
      'User:password': string;
      'User:total_initial_investment': number;
      'User:updatedAt': string;
      'User:url_profile_picture': string | null;
    };
  };
  'Performance': {
    plain: {
      'createdAt': string;
      'fileSize': number;
      'id': number;
      'originalFilename': string;
      'uniqueFilename': string;
      'updatedAt': string;
      'userEmail': string;
    };
    nested: {
      'User': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'User:campaignName': string;
      'User:color': string | null;
      'User:createdAt': string;
      'User:email': string;
      'User:estimated_executed_investment': number;
      'User:id': number;
      'User:name': string;
      'User:password': string;
      'User:total_initial_investment': number;
      'User:updatedAt': string;
      'User:url_profile_picture': string | null;
    };
  };
  'User': {
    plain: {
      'campaignName': string;
      'color': string | null;
      'createdAt': string;
      'email': string;
      'estimated_executed_investment': number;
      'id': number;
      'name': string;
      'password': string;
      'total_initial_investment': number;
      'updatedAt': string;
      'url_profile_picture': string | null;
    };
    nested: {};
    flat: {};
  };
};
