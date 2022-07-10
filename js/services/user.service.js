import { storageService } from './storage.service.js'

const USER_KEY = 'loggedInUser'

export const userService = {
  getLoggedinUser,
  addActivity,
  save,
}

function addActivity(activity) {
  const user = getLoggedinUser()
  user.activities.push(activity)
  storageService.store(USER_KEY, user)
}

function save(user) {
  storageService.store(USER_KEY, user)
}

function getLoggedinUser() {
  const user = storageService.load(USER_KEY)
  if (user) return user

  _login()
  return storageService.load(USER_KEY)
}

function _login() {
  storageService.store(USER_KEY, {
    fullname: 'Puki Ben David',
    prefs: {
      color: '#ffffff',
      bgColor: '#0b7285',
    },
    activities: [
      { txt: 'Added a new Todo', at: 1523873242735 },
      { txt: 'Added a new Todo', at: 1657354690272 },
      { txt: 'Updated a Todo', at: 1657354745868 },
    ],
  })
}
