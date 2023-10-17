import { gql } from 'urql';

// subgraph query
const query = gql`
  query MyQuery($signId: Int!) {
    signContractCreateds(
      orderBy: signId, 
      orderDirection: desc, 
      where: {signId: $signId}
    ) {
      appId
      name
      receipeId
      required
      safeAddress
      signId
      uri
      owners
    }
    changeApproveStatuses(
      orderBy: signId, 
      orderDirection: desc,
      where: {signId: $signId}  
    ) {
      appId
      receipeId
      signId
      approveStatus
    }
    signatureAddeds(
      orderBy: signId, 
      orderDirection: desc,
      where: {signId: $signId}  
    ) {
      appId
      receipeId
      signId
      signature
    }
  } 
`;

export default query;