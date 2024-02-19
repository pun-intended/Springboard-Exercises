function createAccount(pin, amount=0) {
    return {
    checkBalance(inputPin) {
        if (inputPin === pin) {
            return `$${amount}`;
        }
        return "Invalid PIN.";
    },

    deposit(inputPin, depositAmount) {
        if (inputPin === pin) {
            amount += depositAmount;
            return `Succesfully deposited $${depositAmount}. Current balance: $${amount}.`;
        }
        return "Invalid PIN.";
    },

    withdraw(inputPin, withdrawAmount) {
        if (inputPin === pin) {
            if (withdrawAmount <= amount) {
                amount -= withdrawAmount;
                return `Succesfully withdrew $${withdrawAmount}. Current balance: $${amount}.`;
            }
            return "Withdrawal amount exceeds account balance. Transaction cancelled.";
        }
        return "Invalid PIN.";
    },

    changePin(oldPin, newPin) {
        if (oldPin === pin) {
            pin = newPin;
            return "PIN successfully changed!";
        }
        return "Invalid PIN.";
    }
}
}

module.exports = { createAccount };
