export default interface IStorageProvader {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
