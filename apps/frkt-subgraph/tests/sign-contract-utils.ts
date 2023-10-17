import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ChangeApproveStatus,
  SignContractCreated,
  SignatureAdded
} from "../generated/SignContract/SignContract"

export function createChangeApproveStatusEvent(
  appId: string,
  receipeId: string,
  signId: BigInt,
  approveStatus: boolean
): ChangeApproveStatus {
  let changeApproveStatusEvent = changetype<ChangeApproveStatus>(newMockEvent())

  changeApproveStatusEvent.parameters = new Array()

  changeApproveStatusEvent.parameters.push(
    new ethereum.EventParam("appId", ethereum.Value.fromString(appId))
  )
  changeApproveStatusEvent.parameters.push(
    new ethereum.EventParam("receipeId", ethereum.Value.fromString(receipeId))
  )
  changeApproveStatusEvent.parameters.push(
    new ethereum.EventParam("signId", ethereum.Value.fromUnsignedBigInt(signId))
  )
  changeApproveStatusEvent.parameters.push(
    new ethereum.EventParam(
      "approveStatus",
      ethereum.Value.fromBoolean(approveStatus)
    )
  )

  return changeApproveStatusEvent
}

export function createSignContractCreatedEvent(
  appId: string,
  receipeId: string,
  signId: BigInt,
  name: string,
  required: BigInt,
  uri: string,
  owners: Array<Address>,
  safeAddress: Address
): SignContractCreated {
  let signContractCreatedEvent = changetype<SignContractCreated>(newMockEvent())

  signContractCreatedEvent.parameters = new Array()

  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam("appId", ethereum.Value.fromString(appId))
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam("receipeId", ethereum.Value.fromString(receipeId))
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam("signId", ethereum.Value.fromUnsignedBigInt(signId))
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "required",
      ethereum.Value.fromUnsignedBigInt(required)
    )
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam("owners", ethereum.Value.fromAddressArray(owners))
  )
  signContractCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "safeAddress",
      ethereum.Value.fromAddress(safeAddress)
    )
  )

  return signContractCreatedEvent
}

export function createSignatureAddedEvent(
  appId: string,
  receipeId: string,
  signId: BigInt,
  signature: string
): SignatureAdded {
  let signatureAddedEvent = changetype<SignatureAdded>(newMockEvent())

  signatureAddedEvent.parameters = new Array()

  signatureAddedEvent.parameters.push(
    new ethereum.EventParam("appId", ethereum.Value.fromString(appId))
  )
  signatureAddedEvent.parameters.push(
    new ethereum.EventParam("receipeId", ethereum.Value.fromString(receipeId))
  )
  signatureAddedEvent.parameters.push(
    new ethereum.EventParam("signId", ethereum.Value.fromUnsignedBigInt(signId))
  )
  signatureAddedEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromString(signature))
  )

  return signatureAddedEvent
}
