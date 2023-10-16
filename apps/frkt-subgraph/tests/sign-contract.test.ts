import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ChangeApproveStatus } from "../generated/schema"
import { ChangeApproveStatus as ChangeApproveStatusEvent } from "../generated/SignContract/SignContract"
import { handleChangeApproveStatus } from "../src/sign-contract"
import { createChangeApproveStatusEvent } from "./sign-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let appId = "Example string value"
    let receipeId = "Example string value"
    let signId = BigInt.fromI32(234)
    let approveStatus = "boolean Not implemented"
    let newChangeApproveStatusEvent = createChangeApproveStatusEvent(
      appId,
      receipeId,
      signId,
      approveStatus
    )
    handleChangeApproveStatus(newChangeApproveStatusEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChangeApproveStatus created and stored", () => {
    assert.entityCount("ChangeApproveStatus", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChangeApproveStatus",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "appId",
      "Example string value"
    )
    assert.fieldEquals(
      "ChangeApproveStatus",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receipeId",
      "Example string value"
    )
    assert.fieldEquals(
      "ChangeApproveStatus",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "signId",
      "234"
    )
    assert.fieldEquals(
      "ChangeApproveStatus",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "approveStatus",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
