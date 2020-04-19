const tableName = 'offer'

const schema = ({ offerTitle, offerLink, offerPublished }) =>
    ({ offerTitle, offerLink, offerPublished: offerPublished == undefined ? false : offerPublished })

const saveOffer = db => offer => db.collection(tableName).doc().set(schema(offer))

const editOffer = db => id => offer => db.collection(tableName).doc(id).set(schema(offer))

const deleteOffer = db => id => (db.collection(tableName).doc(id)).delete()

const getOffer = db => (db.collection(tableName).get()).then(e => e.docs.map(doc => ({ id: doc.id, ...doc.data()})))

const findOffer = db => id => (db.collection(tableName).doc(id).get()).then(e => [ e.exists, e ])

export { saveOffer, getOffer, findOffer, editOffer, deleteOffer }