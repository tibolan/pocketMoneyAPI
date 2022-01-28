const ErrorHandler = function (error) {
  if (error) {
    console.log(error)
  }
}


module.exports = async function (model) {
  const Amends = await model.find().exec()
  for (let Amend of Amends) {
    Amend.set('fee', Number(Amend.fee), {strict: false})
    Amend.set('type', undefined, {strict: false})
    Amend.set('name', undefined, {strict: false})
    // Amend.set('type', undefined, {strict: false})
    await Amend.save(ErrorHandler)
  }
}
