import config from './config'
import { Role, Selector } from 'testcafe'

fixture`Offer`
    .page`${config.baseUrl}/adm/offer`

const regularAccUser = Role(`${config.baseUrl}/so`, async t => {
    const loginBtn = Selector('button').withAttribute('type', 'submit')
    await t
        .typeText('#soEmail', 'contact@yanncarlen.com')
        .typeText('#soPassword', '_admin')
        .click(loginBtn.nth(0))
})

test('Adm Dashboard', async t => {
    await t
        .useRole(regularAccUser)
        .expect(Selector('title').innerText).eql('Gestion de vos offres commerciales - Adm')
})

test('Offer Dashboard', async t => {
    await t
        .useRole(regularAccUser)
        .navigateTo(`${config.baseUrl}/adm/offer`)
        .expect(Selector('title').innerText).eql('Gestion de vos offres commerciales - Listes des offres')
})

test('Add Offer Button', async t => {
    const addBtn = Selector('a').withAttribute('href', '/adm/offer/add')
    await t
        .useRole(regularAccUser)
        .expect(addBtn.count).eql(1)
        .expect(addBtn.nth(0).exists).ok()
})

test('Add Action', async t => {
    const addBtn = Selector('a').withAttribute('href', '/adm/offer/add').nth(0)

    await t
        .useRole(regularAccUser)
        .click(addBtn)
        .expect(Selector('title').innerText).contains('Ajouter')
})

test('Add Form', async t => {
    const addActionBtn = Selector('a').withAttribute('href', '/adm/offer/add')
    const addBtn = Selector('button').withAttribute('type', 'submit')
    const titleBtn = Selector('input#offerTitle')
    const urlBtn = Selector('input#offerLink')

    await t
        .useRole(regularAccUser)
        .click(addActionBtn)
        .expect(addBtn.count).eql(1)
        .expect(addBtn.nth(0).exists).ok()
        .expect(titleBtn.exists).ok()
        .expect(urlBtn.exists).ok()
})

test('Add Form Error Messages', async t => {
    const addActionBtn = Selector('a').withAttribute('href', '/adm/offer/add')
    const addBtn = Selector('button').withAttribute('type', 'submit')
    const titleBtn = Selector('input#offerTitle')
    const urlBtn = Selector('input#offerLink')
    const errorToast = Selector('.bg-danger > .card-body')

    await t
        .useRole(regularAccUser)
        .click(addActionBtn)
        .typeText(titleBtn, 'a')
        .typeText(urlBtn, 'https://zenicheck.com')
        .click(addBtn)
        .expect(errorToast.count).eql(1)
        .expect(errorToast.nth(0).textContent).contains('4 et 255 charactères')
})

test('Add Form Success', async t => {
    const addActionBtn = Selector('a').withAttribute('href', '/adm/offer/add')
    const addBtn = Selector('button').withAttribute('type', 'submit')
    const titleBtn = Selector('input#offerTitle')
    const urlBtn = Selector('input#offerLink')

    await t
        .useRole(regularAccUser)
        .click(addActionBtn)
        .typeText(titleBtn, 'TestCafe')
        .typeText(urlBtn, 'https://zenicheck.com')
        .click(addBtn)
        .expect(Selector('title').innerText).eql('Gestion de vos offres commerciales - Listes des offres')
})

test('Add Form Table Success', async t => {
    const offerBtn = Selector('a').withAttribute('href', '/adm/offer')
    const offerTable = Selector('table#offerTable tr')
    await t
        .useRole(regularAccUser)
        .click(offerBtn)
        .expect(offerTable.nth(-1).exists).ok()
        .expect(offerTable.nth(-1).find('td').nth(0).exists).ok()
        .expect(offerTable.nth(-1).find('td').nth(0).textContent).contains('TestCafe')
})

test('Delete Form', async t => {
    const offerBtn = Selector('a').withAttribute('href', '/adm/offer')
    const offerTable = Selector('table#offerTable tr')
    await t
        .useRole(regularAccUser)
        .click(offerBtn)
        .expect(offerTable.nth(-1).exists).ok()
        .expect(offerTable.nth(-1).find('td').nth(3).find('a').nth(2).textContent).contains('Supprimer')
        .click(offerTable.nth(-1).find('td').nth(3).find('a').nth(2))
        .expect(Selector('title').innerText).contains('Editer')
})

test('Delete Form Confirm', async t => {
    const offerBtn = Selector('a').withAttribute('href', '/adm/offer')
    const offerTable = Selector('table#offerTable tr')
    const deleteBtn = Selector('button').withAttribute('type', 'submit')
    await t
        .useRole(regularAccUser)
        .click(offerBtn)
        .expect(offerTable.nth(-1).exists).ok()
        .expect(offerTable.nth(-1).find('td').nth(3).find('a').nth(2).textContent).contains('Supprimer')
        .click(offerTable.nth(-1).find('td').nth(3).find('a').nth(2))
        .expect(deleteBtn.nth(0).exists).ok()
        .expect(deleteBtn.nth(0).textContent).contains('Supprimer')
        .click(deleteBtn.nth(0))
        .expect(Selector('.flash').count).eql(1)
        .expect(Selector('.flash').textContent).contains('Offre supprimée')
})