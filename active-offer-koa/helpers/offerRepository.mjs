const tableName = 'offer'

const schema = ({ offerTitle, offerLink, offerPublished }) =>
    ({ title: offerTitle, link: offerLink, published: offerPublished == undefined ? false : offerPublished })

const saveOffer = db => offer => db.collection(tableName).doc().set(schema(offer))

const getOffer = db => (db.collection(tableName).get()).then(e => e.docs.map(doc => ({ id: doc.id, ...doc.data()})))

export { saveOffer, getOffer }