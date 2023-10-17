import { Bytes } from '@graphprotocol/graph-ts'
import {
  ChangeApproveStatus as ChangeApproveStatusEvent,
  SignContractCreated as SignContractCreatedEvent,
  SignatureAdded as SignatureAddedEvent,
} from '../generated/SignContract/SignContract'
import {
  ChangeApproveStatus,
  SignContractCreated,
  SignatureAdded,
} from '../generated/schema'

export function handleChangeApproveStatus(
  event: ChangeApproveStatusEvent
): void {
  let entity = new ChangeApproveStatus(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.appId = event.params.appId
  entity.receipeId = event.params.receipeId
  entity.signId = event.params.signId
  entity.approveStatus = event.params.approveStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSignContractCreated(
  event: SignContractCreatedEvent
): void {
  let entity = new SignContractCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.appId = event.params.appId
  entity.receipeId = event.params.receipeId
  entity.signId = event.params.signId
  entity.name = event.params.name
  entity.required = event.params.required
  entity.uri = event.params.uri
  entity.owners = changetype<Bytes[]>(event.params.owners)
  entity.safeAddress = event.params.safeAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSignatureAdded(event: SignatureAddedEvent): void {
  let entity = new SignatureAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.appId = event.params.appId
  entity.receipeId = event.params.receipeId
  entity.signId = event.params.signId
  entity.signature = event.params.signature

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
