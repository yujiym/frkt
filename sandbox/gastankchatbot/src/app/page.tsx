import { Account } from '../components/Account'
import { Connect } from '../components/Connect'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { ReadContract } from '../components/ReadContract'

export default function Page() {
  return (
    <div>
      <h1>GasTankChatBot</h1>
      <Connect />
      <Connected>
        <hr />
        <h2>Network</h2>
        <NetworkSwitcher />
        <br />
        <hr />
        <h2>Account</h2>
        <Account />
        <br />
        <hr />
        <h2>GasTank balance</h2>
        <ReadContract />
        <br />
      </Connected>
    </div>
  )
}
