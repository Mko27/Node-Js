module.exports = (User, sequelize) => {
  User.findById = (id) => {
    const query = {
      where: {
        id
      },
      raw: true
    }

    return User.findOne(query)
  }

  User.getUsers = () => {
    return User.findAll()
  }

  User.registration = (user) => {
    return User.create(user)
  }

  User.findByEmail = (email) => {
    const query = {
      where: {
        email
      },
      raw: false
    }

    return User.findOne(query)
  }

  return User
}
