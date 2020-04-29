'use strict'

class StoreHour {

  get rules() {
    return {
      hourDay: 'required|min:2|max:25',
      hourOpen: 'required|boolean',
      hourMorningOpen: 'required|boolean',
      hourAfternoonOpen: 'required|boolean',
      hourBreakFastOpening: 'required|boolean',
      hourOpeningMorning: 'date_format:H:i',
      hourClosingMorning: 'date_format:H:i',
      hourOpeningAfternoon: 'date_format:H:i',
      hourClosingAfternoon: 'date_format:H:i',
    }
  }

  get messages() {
    return {
      'hourDay.required': 'Veuillez entrer un nom de plage horraire.',
      'hourDay.min': 'Veullez entrer un nom de plage horraire de minimum 2 lettres.',
      'hourDay.max': 'Veullez entrer un nom de plage horraire de maximun 25 lettres.',
      'hourOpen.required': 'Veuillez indiquer si le magasin globalement ouvert',
      'hourOpen.boolean': 'Veuillez indiquer si le magasin globalement ouvert',
      'hourBreakFastOpening.required': 'Veuillez indiquer si le magasin est ouvert entre midi et deux',
      'hourBreakFastOpening.boolean': 'Veuillez indiquer si le magasin est ouvert entre midi et deux',
      'hourMorningOpen.required': 'Veuillez indiquer si le magasin globalement ouvert le matin',
      'hourMorningOpen.boolean': 'Veuillez indiquer si le magasin globalement ouvert le matin',
      'hourAfternoonOpen.required': 'Veuillez indiquer si le magasin globalement ouvert l\'après-midi',
      'hourAfternoonOpen.boolean': 'Veuillez indiquer si le magasin globalement ouvert l\'après-midi',
      'hourOpeningMorning.date_format': 'Le format des horraires est le suivant HH:MM',
      'hourClosingMorning.date_format': 'Le format des horraires est le suivant HH:MM',
      'hourOpeningAfternoon.date_format': 'Le format des horraires est le suivant HH:MM',
      'hourClosingAfternoon.date_format': 'Le format des horraires est le suivant HH:MM'
    }
  }

  get validateAll() {
    return true
  }

  async fails(error) {
    console.log(error)
    this.ctx.session.withErrors(error)
      .flashAll()
    return this.ctx.response.redirect('back')
  }

}

module.exports = StoreHour
