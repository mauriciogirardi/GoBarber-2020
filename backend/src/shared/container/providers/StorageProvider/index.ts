import { container } from "tsyringe";

import uploadConfig from '@config/upload';

import DiskStorageProvider from "./implementations/DiskStorageProvider";
import S3StorageProviders from "./implementations/S3StorageProvider";
import IStorageProvader from "./models/IStorageProvider";

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProviders,
};

container.registerSingleton<IStorageProvader>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
