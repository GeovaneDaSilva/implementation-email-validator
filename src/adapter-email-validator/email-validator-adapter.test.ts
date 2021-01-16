import validator from 'email-validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  validate (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator', () => {
  it('Should return false validator', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValueOnce(false)
    const isValid = sut.isValid('email@email.com')
    expect(isValid).toBe(false)
  })

  it('Should return true validator', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('email@email.com')
    expect(isValid).toBe(true)
  })

  it('Should return format correct email of the validator', () => {
    const sut = new EmailValidatorAdapter()
    const isValidSpyOn = jest.spyOn(validator, 'validate')
    sut.isValid('email@email.com')
    expect(isValidSpyOn).toHaveBeenCalledWith('email@email.com')
  })
})
