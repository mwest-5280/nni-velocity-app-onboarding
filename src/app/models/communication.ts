export interface Communications {
  communicationSettingId: string;
  loanProgramId: string;
  code: string;
  name: string;
  type: string;
  event: string;
  provider: string;
  dataBlocks: DataBlocks[];
  suppressionTags: string;
  parameters: any[];
  createdDate: Date;
  updatedDate: Date;
  isActive: boolean;
  createdBy: ICreatedBy[];
}
export interface DataBlocks {
  dataBlock: string;
}
export interface ICreatedBy {
  email: string;
  userName: string;
}
