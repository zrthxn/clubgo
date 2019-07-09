export const userController = {
  findByLogin: async (login) => {
    let user = await this.findOne({
      username: login,
    })
  
    if (!user) user = await this.findOne({ email: login })
    return user
  }
}

export default userController