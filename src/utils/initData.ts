import { removeLocal, setLocal } from './storage'

const urlParams = new URLSearchParams(window.location.search)

const inviteCode = urlParams.get('invite')

if (inviteCode) {
  setLocal('inviteCode', inviteCode)
}
