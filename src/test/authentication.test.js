//Unitest
const sinon = require('sinon')
const { expect } = require('chai')

function testMe(callback) {
    callback()
}

const user = {
    setName: function(name) {
        this.name = name
    }
}

describe('Unit testing for the service POST /authentication', () => {
    it('First test', () => {
        const callbackSpy = sinon.spy()
        testMe(callbackSpy)
        expect(callbackSpy).to.have.been.calledOnce

    })

    it('should be called with name', () => {
        let setNameSpy = sinon.spy(user, 'setName')
        user.setName('Jose Francisco')

        expect(setNameSpy).to.have.been.calledOnce
        expect(setNameSpy).to.have.been.calledWith('Jose Francisco')
    })
})