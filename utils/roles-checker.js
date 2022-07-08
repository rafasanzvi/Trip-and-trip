const rolesChecker = user => {

    return {
        isCHAMAN: user?.role === 'CHAMAN',
        isHIEROPHANT: user?.role === 'HIEROPHANT',
    }

}

module.exports = { rolesChecker }