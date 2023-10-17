// type for result of subgraph query
export type SignContractInfos = {
  changeApproveStatuses: ChangeApproveStatuse[],
  signContractCreateds: SignContractCreated[]
  signatureAddeds: SignatureAdded[]
}

type ChangeApproveStatuse = {
  appId: string,
  receipeId: string,
  signId: number,
  approveStatus: boolean
}

type SignContractCreated = {
  appId: string,
  name: string,
  receipeId: string,
  required: number,
  safeAddress: string,
  signId: number,
  uri: string
  owners: string[]
}

type SignatureAdded = {
  appId: string,
  receipeId: string,
  signId: number,
  signature: string
}