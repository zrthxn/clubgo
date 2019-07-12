export const venueController = {
  findByName: async (args) => {
    const venue = await this.findOne({
      name: args
    })
  
    return venue
  }
}

export default venueController