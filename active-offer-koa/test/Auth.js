import config from './config'
import { Selector } from 'testcafe'

fixture`Login`
    .page`${config.baseUrl}/adm`

test('Logout', async t => {
    await t
        .navigateTo(`${config.baseUrl}/so/logout`)
})

test('Redirect Check title', async t => {
    await t
        .expect(Selector('title').innerText).eql('Gestion de vos offres commerciales - Se connecter')
})

test('Login Form', async t => {
    const loginBtn = Selector('button').withAttribute('type', 'submit')
    const form = Selector('form')
    await t
        .expect(form.count).eql(1)
        .expect(loginBtn.count).eql(1)
        .expect(loginBtn.nth(0).textContent).contains('Se connecter')
})

test('Login Fields', async t => {
    const emailField = Selector('input#soEmail')
    const passwordField = Selector('input#soPassword')
    await t
        .expect(emailField.exists).ok()
        .expect(passwordField.exists).ok()
})

test('Login Error Message', async t => {
    const emailField = Selector('input#soEmail')
    const passwordField = Selector('input#soPassword')
    const loginBtn = Selector('button').withAttribute('type', 'submit').nth(0)
    const errorToast = Selector('.bg-danger > .card-body')
    await t
        .typeText(emailField, 'contact@yanncarlen.com')
        .typeText(passwordField, '1234')
        .expect(emailField.exists).ok()
        .expect(passwordField.exists).ok()
        .click(loginBtn)
        .expect(errorToast.count).eql(1)
        .expect(errorToast.nth(0).textContent).contains('Email ou Mot de Passe invalide')
})

test('Login Success', async t => {
    const emailField = Selector('input#soEmail')
    const passwordField = Selector('input#soPassword')
    const loginBtn = Selector('button').withAttribute('type', 'submit').nth(0)
    await t
        .typeText(emailField, 'contact@yanncarlen.com')
        .typeText(passwordField, '_admin')
        .expect(emailField.exists).ok()
        .expect(passwordField.exists).ok()
        .click(loginBtn)
        .expect(Selector('title').innerText).eql('Gestion de vos offres commerciales - Adm')
})
