const actions = {
  openLoginForm: () => {
    return {
      type: 'open',
      state: 'open',
      form: 'login'
    }
  },
  openRegisterForm: () => {
    return {
      type: 'open',
      state: 'open',
      form: 'register'
    }
  },
  closeLoginForm: () => {
    return {
      type: 'close',
      state: 'closed',
      form: 'login'
    }
  },
  closeRegisterForm: () => {
    return {
      type: 'close',
      state: 'closed',
      form: 'register'
    }
  }
}

export default actions;
